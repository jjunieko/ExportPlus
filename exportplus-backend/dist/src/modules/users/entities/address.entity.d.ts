export declare class AddressEntity {
    id: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    constructor(partial: Partial<AddressEntity>);
}
