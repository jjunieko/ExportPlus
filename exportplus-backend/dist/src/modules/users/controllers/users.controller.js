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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../services/users.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const user_entity_1 = require("../entities/user.entity");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(dto) {
        return this.usersService.create(dto);
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async update(id, dto) {
        return this.usersService.update(id, dto);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
    async addAddress(id, endereco) {
        return this.usersService.addEndereco(id, endereco);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo usuário com endereços' }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        examples: {
            exemplo: {
                summary: 'Exemplo de criação de usuário',
                value: {
                    nome: 'João Silva',
                    email: 'joao.silva@email.com',
                    cpf: '12345678900',
                    telefone: "(11)99999-9999",
                    senha: 'senhaSegura123@',
                    enderecos: [
                        {
                            cep: '01001-000',
                            logradouro: 'Praça da Sé',
                            numero: '100',
                            complemento: 'Apto 101',
                            bairro: 'Centro',
                            cidade: 'São Paulo',
                            estado: 'SP'
                        }
                    ]
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuário criado com sucesso', type: user_entity_1.UserEntity }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validação falhou ou CPF duplicado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os usuários' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuários', type: [user_entity_1.UserEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtém um usuário pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário encontrado', type: user_entity_1.UserEntity }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de um usuário' }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário atualizado com sucesso', type: user_entity_1.UserEntity }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove um usuário e seus endereços' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Usuário removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/address'),
    (0, swagger_1.ApiOperation)({ summary: 'Adiciona um novo endereço a um usuário existente' }),
    (0, swagger_1.ApiBody)({
        schema: {
            example: {
                cep: '01001-000',
                logradouro: 'Praça da Sé',
                numero: '100',
                complemento: 'Apto 101',
                bairro: 'Centro',
                cidade: 'São Paulo',
                estado: 'SP',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Endereço adicionado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Endereço duplicado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addAddress", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map