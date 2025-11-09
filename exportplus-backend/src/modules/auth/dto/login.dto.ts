import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve conter ao menos 8 caracteres' })
  password: string;
}
