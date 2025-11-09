import { AddressEntity } from './address.entity';
export declare class UserEntity {
    id: string;
    cpf: string;
    nome: string;
    email?: string | null;
    telefone?: string | null;
    senha?: string | null;
    enderecos?: AddressEntity[];
    constructor(partial: Partial<UserEntity>);
}
