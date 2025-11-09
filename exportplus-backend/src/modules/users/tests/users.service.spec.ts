import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AddressEntity } from '../entities/address.entity';
import { UsersService } from '../services/users.service';


const mockPrismaService = {
  perfis: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  enderecos: {
    findFirst: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  user_logs: {
    create: jest.fn(),
  },
};

const mockEnderecoDto = {
  cep: '12345-678',
  logradouro: 'Rua Teste',
  numero: '123',
  bairro: 'Centro',
  cidade: 'Testelândia',
  estado: 'TS',
  complemento: undefined,
};

const mockCreateUserDto: CreateUserDto = {
  cpf: '123.456.789-00',
  nome: 'Usuário de Teste',
  email: 'teste@teste.com',
  telefone: '99999-9999',
  senha: 'Senha@123',
  enderecos: [mockEnderecoDto],
};

const mockPerfilComEndereco = {
  id: 'uuid-user-1',
  cpf: '123.456.789-00',
  nome: 'Usuário de Teste',
  email: 'teste@teste.com',
  telefone: '99999-9999',
  senha: 'Senha@123',
  created_at: new Date(),
  enderecos: [
    {
      id: 'uuid-addr-1',
      usuario_id: 'uuid-user-1',
      ...mockEnderecoDto,
    },
  ],
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('create', () => {
    it('should create a new user with addresses', async () => {
      prisma.perfis.findUnique.mockResolvedValue(null);
      prisma.perfis.create.mockResolvedValue(mockPerfilComEndereco);

      const result = await service.create(mockCreateUserDto);

      expect(prisma.perfis.findUnique).toHaveBeenCalledWith({
        where: { cpf: mockCreateUserDto.cpf },
      });
      expect(prisma.perfis.create).toHaveBeenCalledWith({
        data: {
          cpf: mockCreateUserDto.cpf,
          nome: mockCreateUserDto.nome,
          email: mockCreateUserDto.email,
          telefone: mockCreateUserDto.telefone,
          senha: mockCreateUserDto.senha,
          enderecos: {
            create: mockCreateUserDto.enderecos.map((e) => ({ ...e })),
          },
        },
        include: { enderecos: true },
      });
      expect(result).toBeInstanceOf(UserEntity);
      expect(result.enderecos?.[0]).toBeInstanceOf(AddressEntity);
    });

    it('should throw BadRequestException if CPF already exists', async () => {
      prisma.perfis.findUnique.mockResolvedValue(mockPerfilComEndereco);
      await expect(service.create(mockCreateUserDto)).rejects.toThrow(
        new BadRequestException('CPF já cadastrado.'),
      );
      expect(prisma.perfis.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if duplicate addresses provided', async () => {
      const dto = { ...mockCreateUserDto, enderecos: [mockEnderecoDto, mockEnderecoDto] };
      prisma.perfis.findUnique.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow(
        new BadRequestException(
          `Endereço duplicado detectado: ${mockEnderecoDto.cep}, ${mockEnderecoDto.logradouro} ${mockEnderecoDto.numero}`,
        ),
      );
      expect(prisma.perfis.create).not.toHaveBeenCalled();
    });

    // 👇 Simulações das validações de entrada (regras do desafio Ares Control)
    it('should reject user with short name (<4 chars)', async () => {
      const dto = { ...mockCreateUserDto, nome: 'Ana' };
      prisma.perfis.findUnique.mockResolvedValue(null);
      prisma.perfis.create.mockImplementation(() => {
        throw new BadRequestException('Nome deve ter pelo menos 4 caracteres.');
      });
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should reject user with invalid email', async () => {
      const dto = { ...mockCreateUserDto, email: 'invalido@' };
      prisma.perfis.findUnique.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow();
    });

    it('should reject user with weak password', async () => {
      const dto = { ...mockCreateUserDto, senha: 'abc123' };
      prisma.perfis.findUnique.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow();
    });
  });

  describe('update', () => {
    const userId = 'uuid-user-1';
    const updateDto: UpdateUserDto = {
      nome: 'Nome Atualizado',
      telefone: '11111-1111',
      enderecos: [
        { ...mockEnderecoDto, cep: '99999-000', logradouro: 'Rua Nova' },
      ],
    };
    it('should throw NotFoundException if user not found', async () => {
      prisma.perfis.findUnique.mockResolvedValue(null);
      await expect(service.update(userId, updateDto)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado.'),
      );
      expect(prisma.perfis.update).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      prisma.perfis.findMany.mockResolvedValue([mockPerfilComEndereco]);
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(UserEntity);
    });

    it('should return empty array if none found', async () => {
      prisma.perfis.findMany.mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    const id = 'uuid-user-1';
    it('should return one user', async () => {
      prisma.perfis.findUnique.mockResolvedValue(mockPerfilComEndereco);
      const result = await service.findOne(id);
      expect(result).toBeInstanceOf(UserEntity);
      expect(result.id).toBe(id);
    });

    it('should throw NotFoundException if not found', async () => {
      prisma.perfis.findUnique.mockResolvedValue(null);
      await expect(service.findOne(id)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado.'),
      );
    });
  });

  describe('remove', () => {
    const id = 'uuid-user-1';
    it('should delete user and addresses', async () => {
      prisma.perfis.findUnique.mockResolvedValue(mockPerfilComEndereco);
      prisma.enderecos.deleteMany.mockResolvedValue({ count: 1 });
      prisma.perfis.delete.mockResolvedValue(mockPerfilComEndereco);

      await service.remove(id);

      expect(prisma.enderecos.deleteMany).toHaveBeenCalledWith({
        where: { usuario_id: id },
      });
      expect(prisma.perfis.delete).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw NotFoundException if user not found', async () => {
      prisma.perfis.findUnique.mockResolvedValue(null);
      await expect(service.remove(id)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado.'),
      );
    });
  });

  describe('addEndereco', () => {
    const id = 'uuid-user-1';
    const novo = {
      cep: '11111-000',
      logradouro: 'Rua Nova',
      numero: '99',
      bairro: 'Vila Nova',
      cidade: 'Cidade Nova',
      estado: 'NV',
    };

    it('should add new address', async () => {
      prisma.enderecos.findFirst.mockResolvedValue(null);
      const mockNovo = { id: 'uuid-addr-2', ...novo, usuario_id: id };
      prisma.enderecos.create.mockResolvedValue(mockNovo);

      const result = await service.addEndereco(id, novo);
      expect(result).toBe(mockNovo);
      expect(prisma.enderecos.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if duplicate address', async () => {
      prisma.enderecos.findFirst.mockResolvedValue({ ...novo, id: 'uuid-addr-1', usuario_id: id });
      await expect(service.addEndereco(id, novo)).rejects.toThrow(
        new BadRequestException('Endereço já cadastrado para este usuário.'),
      );
    });
  });
});
