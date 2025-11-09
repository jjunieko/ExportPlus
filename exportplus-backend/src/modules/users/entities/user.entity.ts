import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from './address.entity';

export class UserEntity {
  @ApiProperty({ example: 'a8f5f167-3b5c-4d8f-bc17-5c9c0e46e7b4' })
  id: string;

  @ApiProperty({ example: '12345678909' })
  cpf: string;

  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @ApiProperty({ example: 'joao@teste.com', required: false })
  email?: string | null;

  @ApiProperty({ example: '(11)99999-9999', required: false })
  telefone?: string | null;

  @ApiProperty({ example: 'Teste@123', required: false })
  senha?: string | null;

  @ApiProperty({ type: [AddressEntity], required: false })
  enderecos?: AddressEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, {
      ...partial,
      email: partial.email ?? undefined,
      telefone: partial.telefone ?? undefined,
      senha: partial.senha ?? undefined,
    });
  }
}


