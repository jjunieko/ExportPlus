"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const user_entity_1 = require("../entities/user.entity");
const address_entity_1 = require("../entities/address.entity");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const userExists = await this.prisma.perfis.findUnique({
            where: { cpf: dto.cpf },
        });
        if (userExists) {
            throw new common_1.BadRequestException('CPF já cadastrado.');
        }
        const enderecos = dto.enderecos;
        const enderecoDuplicado = this.temEnderecoDuplicado(enderecos);
        if (enderecoDuplicado) {
            throw new common_1.BadRequestException(`Endereço duplicado detectado: ${enderecoDuplicado.cep}, ${enderecoDuplicado.logradouro} ${enderecoDuplicado.numero}`);
        }
        const created = await this.prisma.perfis.create({
            data: {
                cpf: dto.cpf,
                nome: dto.nome,
                email: dto.email,
                telefone: dto.telefone,
                senha: dto.senha,
                enderecos: {
                    create: dto.enderecos.map((e) => ({
                        cep: e.cep,
                        logradouro: e.logradouro,
                        numero: e.numero,
                        complemento: e.complemento,
                        bairro: e.bairro,
                        cidade: e.cidade,
                        estado: e.estado,
                    })),
                },
            },
            include: { enderecos: true },
        });
        return new user_entity_1.UserEntity({
            ...created,
            enderecos: created.enderecos?.map((e) => new address_entity_1.AddressEntity(e)),
        });
    }
    async update(id, dto) {
        const existing = await this.prisma.perfis.findUnique({
            where: { id },
            include: { enderecos: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Usuário não encontrado.');
        const changes = {};
        for (const key in dto) {
            if (dto[key] && dto[key] !== existing[key]) {
                changes[key] = { from: existing[key], to: dto[key] };
            }
        }
        const updated = await this.prisma.perfis.update({
            where: { id },
            data: {
                ...dto,
                enderecos: dto.enderecos
                    ? {
                        deleteMany: {},
                        create: dto.enderecos.map((e) => ({
                            cep: e.cep,
                            logradouro: e.logradouro,
                            numero: e.numero,
                            complemento: e.complemento,
                            bairro: e.bairro,
                            cidade: e.cidade,
                            estado: e.estado,
                        })),
                    }
                    : undefined,
            },
            include: { enderecos: true },
        });
        if (Object.keys(changes).length > 0) {
            await this.registrarLogAlteracao(id, changes);
        }
        return new user_entity_1.UserEntity({
            ...updated,
            enderecos: updated.enderecos?.map((e) => new address_entity_1.AddressEntity(e)),
        });
    }
    async findAll() {
        const users = await this.prisma.perfis.findMany({
            include: { enderecos: true },
        });
        return users.map((u) => new user_entity_1.UserEntity({
            ...u,
            enderecos: u.enderecos?.map((e) => new address_entity_1.AddressEntity(e)),
        }));
    }
    async findOne(id) {
        const user = await this.prisma.perfis.findUnique({
            where: { id },
            include: { enderecos: true },
        });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado.');
        return new user_entity_1.UserEntity({
            ...user,
            enderecos: user.enderecos?.map((e) => new address_entity_1.AddressEntity(e)),
        });
    }
    async remove(id) {
        const existing = await this.prisma.perfis.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Usuário não encontrado.');
        await this.prisma.enderecos.deleteMany({ where: { usuario_id: id } });
        await this.prisma.perfis.delete({ where: { id } });
    }
    async addEndereco(usuarioId, endereco) {
        const existente = await this.prisma.enderecos.findFirst({
            where: {
                usuario_id: usuarioId,
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                numero: endereco.numero,
            },
        });
        if (existente) {
            throw new common_1.BadRequestException('Endereço já cadastrado para este usuário.');
        }
        return this.prisma.enderecos.create({
            data: { ...endereco, usuario_id: usuarioId },
        });
    }
    temEnderecoDuplicado(enderecos) {
        const vistos = new Set();
        for (const e of enderecos) {
            const chave = `${e.cep}-${e.logradouro}-${e.numero}`;
            if (vistos.has(chave))
                return e;
            vistos.add(chave);
        }
        return null;
    }
    async registrarLogAlteracao(userId, changes) {
        await this.prisma.user_logs.create({
            data: {
                usuario_id: userId,
                alteracoes: changes,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map