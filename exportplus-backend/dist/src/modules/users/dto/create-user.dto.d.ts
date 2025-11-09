import { CreateAddressDto } from './create-address.dto';
export declare class CreateUserDto {
    cpf: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    enderecos: CreateAddressDto[];
}
