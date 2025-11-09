import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário com endereços' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de criação de usuário',
        value: {
          nome: 'João Silva',
          email: 'joao.silva@email.com',
          cpf: '12345678900',
          telefone: "(11)99999-9999",
          senha: 'senhaSegura123@',
          enderecos: [
            {
              cep: '01001-000',
              logradouro: 'Praça da Sé',
              numero: '100',
              complemento: 'Apto 101',
              bairro: 'Centro',
              cidade: 'São Paulo',
              estado: 'SP'
            }
          ]
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: UserEntity })
  @ApiResponse({ status: 400, description: 'Validação falhou ou CPF duplicado' })
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários', type: [UserEntity] })
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário e seus endereços' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }


  @Post(':id/address')
  @ApiOperation({ summary: 'Adiciona um novo endereço a um usuário existente' })
  @ApiBody({
    schema: {
      example: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        numero: '100',
        complemento: 'Apto 101',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Endereço adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Endereço duplicado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async addAddress(@Param('id') id: string, @Body() endereco: any) {
    return this.usersService.addEndereco(id, endereco);
  }
}
