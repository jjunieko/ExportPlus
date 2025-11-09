import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: 'uuid-123',
    cpf: '12345678909',
    nome: 'João da Silva',
    email: 'joao@teste.com',
    telefone: '(11)99999-9999',
    senha: 'Teste@123',
    enderecos: [
      {
        id: 'addr-1',
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        numero: '100',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    ],
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, nome: 'João Atualizado' }),
    remove: jest.fn().mockResolvedValue(undefined),
    addEndereco: jest.fn().mockResolvedValue(mockUser.enderecos[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());


  it('deve criar usuário com sucesso', async () => {
    const dto: CreateUserDto = {
      cpf: mockUser.cpf,
      nome: mockUser.nome,
      email: mockUser.email,
      telefone: mockUser.telefone,
      senha: mockUser.senha,
      enderecos: mockUser.enderecos,
    };

    const result = await controller.create(dto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve lançar erro se o service falhar ao criar', async () => {
    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());
    await expect(controller.create({} as any)).rejects.toThrow(BadRequestException);
  });


  it('deve retornar todos os usuários', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('deve retornar um usuário pelo ID', async () => {
    const result = await controller.findOne('uuid-123');
    expect(result).toEqual(mockUser);
  });

  it('deve lançar erro 404 se não encontrado', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
    await expect(controller.findOne('nope')).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um usuário existente', async () => {
    const dto: UpdateUserDto = { nome: 'João Atualizado' };
    const result = await controller.update('uuid-123', dto);
    expect(result.nome).toBe('João Atualizado');
    expect(service.update).toHaveBeenCalledWith('uuid-123', dto);
  });

  it('deve remover usuário', async () => {
    await controller.remove('uuid-123');
    expect(service.remove).toHaveBeenCalledWith('uuid-123');
  });


  it('deve adicionar novo endereço ao usuário', async () => {
    const endereco = mockUser.enderecos[0];
    const result = await controller.addAddress('uuid-123', endereco);
    expect(result).toEqual(endereco);
    expect(service.addEndereco).toHaveBeenCalledWith('uuid-123', endereco);
  });
});
