import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, senha: string): Promise<UserEntity> {
    const user = await this.prisma.perfis.findFirst({
      where: { email, senha },
      include: { enderecos: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    // se eu quiser add jwt futuramente
    return new UserEntity({
      ...user,
      enderecos: user.enderecos ?? [],
    });
  }
}
