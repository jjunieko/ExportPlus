import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AddressEntity } from '../entities/address.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.prisma.perfis.findUnique({
      where: { cpf: dto.cpf },
    });

    if (userExists) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    const enderecos = dto.enderecos;
    const enderecoDuplicado = this.temEnderecoDuplicado(enderecos);
    if (enderecoDuplicado) {
      throw new BadRequestException(
        `Endereço duplicado detectado: ${enderecoDuplicado.cep}, ${enderecoDuplicado.logradouro} ${enderecoDuplicado.numero}`,
      );
    }

    const created = await this.prisma.perfis.create({
      data: {
        cpf: dto.cpf,
        nome: dto.nome,
        email: dto.email,
        telefone: dto.telefone,
        senha: dto.senha,
        enderecos: {
          create: dto.enderecos.map((e) => ({
            cep: e.cep,
            logradouro: e.logradouro,
            numero: e.numero,
            complemento: e.complemento,
            bairro: e.bairro,
            cidade: e.cidade,
            estado: e.estado,
          })),
        },
      },
      include: { enderecos: true },
    });

    return new UserEntity({
      ...created,
      enderecos: created.enderecos?.map((e) => new AddressEntity(e)),
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const existing = await this.prisma.perfis.findUnique({
      where: { id },
      include: { enderecos: true },
    });

    if (!existing) throw new NotFoundException('Usuário não encontrado.');

    const changes: Record<string, { from: any; to: any }> = {};
    for (const key in dto) {
      if (dto[key] && dto[key] !== existing[key]) {
        changes[key] = { from: existing[key], to: dto[key] };
      }
    }

    const updated = await this.prisma.perfis.update({
      where: { id },
      data: {
        ...dto,
        enderecos: dto.enderecos
          ? {
              deleteMany: {},
              create: dto.enderecos.map((e) => ({
                cep: e.cep,
                logradouro: e.logradouro,
                numero: e.numero,
                complemento: e.complemento,
                bairro: e.bairro,
                cidade: e.cidade,
                estado: e.estado,
              })),
            }
          : undefined,
      },
      include: { enderecos: true },
    });

    // Bônus: grava log de alterações
    if (Object.keys(changes).length > 0) {
      await this.registrarLogAlteracao(id, changes);
    }

    return new UserEntity({
      ...updated,
      enderecos: updated.enderecos?.map((e) => new AddressEntity(e)),
    });
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.perfis.findMany({
      include: { enderecos: true },
    });

    return users.map((u) => new UserEntity({
      ...u,
      enderecos: u.enderecos?.map((e) => new AddressEntity(e)),
    }));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.perfis.findUnique({
      where: { id },
      include: { enderecos: true },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return new UserEntity({
      ...user,
      enderecos: user.enderecos?.map((e) => new AddressEntity(e)),
    });
  }

  async remove(id: string): Promise<void> {
    const existing = await this.prisma.perfis.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Usuário não encontrado.');
    await this.prisma.enderecos.deleteMany({ where: { usuario_id: id } });
    await this.prisma.perfis.delete({ where: { id } });
  }

  async addEndereco(usuarioId: string, endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  }) {
    const existente = await this.prisma.enderecos.findFirst({
      where: {
        usuario_id: usuarioId,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
      },
    });
    if (existente) {
      throw new BadRequestException('Endereço já cadastrado para este usuário.');
    }

    return this.prisma.enderecos.create({
      data: { ...endereco, usuario_id: usuarioId },
    });
  }

  private temEnderecoDuplicado(enderecos: any[]): any | null {
    const vistos = new Set();
    for (const e of enderecos) {
      const chave = `${e.cep}-${e.logradouro}-${e.numero}`;
      if (vistos.has(chave)) return e;
      vistos.add(chave);
    }
    return null;
  }

  private async registrarLogAlteracao(
    userId: string,
    changes: Record<string, { from: any; to: any }>,
  ) {
    await this.prisma.user_logs.create({
      data: {
        usuario_id: userId,
        alteracoes: changes,
      },
    });
  }
}
