import { ApiProperty } from '@nestjs/swagger';

export class AddressEntity {
  @ApiProperty({ example: 'b3a1f167-3b5c-4d8f-bc17-5c9c0e46e7b4' })
  id: string;
  @ApiProperty({ example: '01001-000' })
  cep: string;

  @ApiProperty({ example: 'Praça da Sé' })
  logradouro: string;

  @ApiProperty({ example: '100' })
  numero: string;

  @ApiProperty({ example: 'Apto 101', required: false })
  complemento?: string | null;

  @ApiProperty({ example: 'Centro' })
  bairro: string;

  @ApiProperty({ example: 'São Paulo' })
  cidade: string;

  @ApiProperty({ example: 'SP' })
  estado: string;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, {
      ...partial,
      complemento: partial.complemento ?? undefined,
    });
  }
}
