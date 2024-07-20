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
exports.WalletAddressController = void 0;
const common_1 = require("@nestjs/common");
const wallet_address_service_1 = require("./wallet_address.service");
const create_wallet_address_dto_1 = require("./dto/create-wallet_address.dto");
const transaction_dto_1 = require("./dto/transaction.dto");
let WalletAddressController = class WalletAddressController {
    constructor(walletAddressService) {
        this.walletAddressService = walletAddressService;
    }
    create(createWalletAddressDto) {
        return this.walletAddressService.create(createWalletAddressDto);
    }
    findAll(id) {
        return this.walletAddressService.findAll(id);
    }
    findOne(id) {
        return this.walletAddressService.findOne(id);
    }
    async createTransaction(transactionDto) {
        const walletAddress = await this.findOne(transactionDto.walletAddressId);
        if (!walletAddress) {
            return { status: 'Address Does not Exist' };
        }
        return this.walletAddressService.createTransaction(transactionDto.currencyName, walletAddress.privateKey, walletAddress.address, transactionDto.receiverAddress, transactionDto.amount);
    }
    async verifyTransaction(verifyTransactionDto) {
        return this.walletAddressService.verifyTransaction(verifyTransactionDto.currencyName, verifyTransactionDto.transactionId);
    }
};
exports.WalletAddressController = WalletAddressController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_address_dto_1.CreateWalletAddressDto]),
    __metadata("design:returntype", void 0)
], WalletAddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletAddressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WalletAddressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.TransactionDto]),
    __metadata("design:returntype", Promise)
], WalletAddressController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Post)('/transaction/:transactionId'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.VerifyTransactionDto]),
    __metadata("design:returntype", Promise)
], WalletAddressController.prototype, "verifyTransaction", null);
exports.WalletAddressController = WalletAddressController = __decorate([
    (0, common_1.Controller)('wallet-address'),
    __metadata("design:paramtypes", [wallet_address_service_1.WalletAddressService])
], WalletAddressController);
//# sourceMappingURL=wallet_address.controller.js.map