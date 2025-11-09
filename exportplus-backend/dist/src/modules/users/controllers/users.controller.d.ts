import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, dto: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<void>;
    addAddress(id: string, endereco: any): Promise<{
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
}
