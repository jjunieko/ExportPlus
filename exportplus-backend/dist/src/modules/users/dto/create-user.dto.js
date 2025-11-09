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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_address_dto_1 = require("./create-address.dto");
class CreateUserDto {
    cpf;
    nome;
    email;
    telefone;
    senha;
    enderecos;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos numéricos' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: 'Nome deve possuir no mínimo 4 caracteres' }),
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ú\s]+$/, { message: 'Nome deve conter apenas letras e espaços' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/, { message: 'Telefone inválido (ex: (11)99999-9999)' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: 'Senha deve conter letras maiúsculas, minúsculas e caracteres especiais',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_address_dto_1.CreateAddressDto),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "enderecos", void 0);
//# sourceMappingURL=create-user.dto.js.map