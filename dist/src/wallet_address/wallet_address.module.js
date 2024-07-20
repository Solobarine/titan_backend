"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAddressModule = void 0;
const common_1 = require("@nestjs/common");
const wallet_address_service_1 = require("./wallet_address.service");
const wallet_address_controller_1 = require("./wallet_address.controller");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_address_entity_1 = require("./entities/wallet_address.entity");
let WalletAddressModule = class WalletAddressModule {
};
exports.WalletAddressModule = WalletAddressModule;
exports.WalletAddressModule = WalletAddressModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wallet_address_entity_1.WalletAddress])],
        controllers: [wallet_address_controller_1.WalletAddressController],
        providers: [wallet_address_service_1.WalletAddressService],
    })
], WalletAddressModule);
//# sourceMappingURL=wallet_address.module.js.map