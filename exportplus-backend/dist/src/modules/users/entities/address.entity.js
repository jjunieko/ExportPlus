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
exports.AddressEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddressEntity {
    id;
    cep;
    logradouro;
    numero;
    complemento;
    bairro;
    cidade;
    estado;
    constructor(partial) {
        Object.assign(this, {
            ...partial,
            complemento: partial.complemento ?? undefined,
        });
    }
}
exports.AddressEntity = AddressEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'b3a1f167-3b5c-4d8f-bc17-5c9c0e46e7b4' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '01001-000' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "cep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Praça da Sé' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "logradouro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "numero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Apto 101', required: false }),
    __metadata("design:type", Object)
], AddressEntity.prototype, "complemento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Centro' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "bairro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'São Paulo' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SP' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "estado", void 0);
//# sourceMappingURL=address.entity.js.map