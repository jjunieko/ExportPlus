import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  logradouro: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
