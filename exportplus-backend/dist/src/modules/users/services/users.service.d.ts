import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<UserEntity>;
    update(id: string, dto: UpdateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    remove(id: string): Promise<void>;
    addEndereco(usuarioId: string, endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
    }): Promise<{
        cep: string;
        logradouro: string;
        numero: string;
        complemento: string | null;
        bairro: string;
        cidade: string;
        estado: string;
        id: string;
        usuario_id: string;
    }>;
    private temEnderecoDuplicado;
    private registrarLogAlteracao;
}
