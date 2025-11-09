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
exports.UserEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const address_entity_1 = require("./address.entity");
class UserEntity {
    id;
    cpf;
    nome;
    email;
    telefone;
    senha;
    enderecos;
    constructor(partial) {
        Object.assign(this, {
            ...partial,
            email: partial.email ?? undefined,
            telefone: partial.telefone ?? undefined,
            senha: partial.senha ?? undefined,
        });
    }
}
exports.UserEntity = UserEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a8f5f167-3b5c-4d8f-bc17-5c9c0e46e7b4' }),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345678909' }),
    __metadata("design:type", String)
], UserEntity.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João da Silva' }),
    __metadata("design:type", String)
], UserEntity.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@teste.com', required: false }),
    __metadata("design:type", Object)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '(11)99999-9999', required: false }),
    __metadata("design:type", Object)
], UserEntity.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Teste@123', required: false }),
    __metadata("design:type", Object)
], UserEntity.prototype, "senha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [address_entity_1.AddressEntity], required: false }),
    __metadata("design:type", Array)
], UserEntity.prototype, "enderecos", void 0);
//# sourceMappingURL=user.entity.js.map