import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../users/entities/user.entity';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validateUser(email: string, senha: string): Promise<UserEntity>;
}
