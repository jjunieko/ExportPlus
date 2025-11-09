import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos numéricos' })
  cpf: string;

  @IsString()
  @MinLength(4, { message: 'Nome deve possuir no mínimo 4 caracteres' })
  @Matches(/^[A-Za-zÀ-ú\s]+$/, { message: 'Nome deve conter apenas letras e espaços' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/, { message: 'Telefone inválido (ex: (11)99999-9999)' })
  telefone: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Senha deve conter letras maiúsculas, minúsculas e caracteres especiais',
  })
  senha: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  enderecos: CreateAddressDto[];
}


