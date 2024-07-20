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
exports.WalletAddress = void 0;
const typeorm_1 = require("typeorm");
class WalletAddress {
}
exports.WalletAddress = WalletAddress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WalletAddress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.RelationId)('User'),
    __metadata("design:type", Number)
], WalletAddress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.RelationId)('Currency'),
    __metadata("design:type", Number)
], WalletAddress.prototype, "currencyId", void 0);
__decorate([
    (0, typeorm_1.RelationId)('Wallet'),
    __metadata("design:type", Number)
], WalletAddress.prototype, "walletId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletAddress.prototype, "privateKey", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletAddress.prototype, "publicKey", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletAddress.prototype, "address", void 0);
//# sourceMappingURL=wallet_address.entity.js.map