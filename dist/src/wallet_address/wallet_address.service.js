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
exports.WalletAddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bitcoin_1 = require("../coin/bitcoin");
const typeorm_2 = require("typeorm");
const tether_1 = require("../coin/tether");
const litecoin_1 = require("../coin/litecoin");
const ethereum_1 = require("../coin/ethereum");
const solana_1 = require("../coin/solana");
const wallet_address_entity_1 = require("./entities/wallet_address.entity");
let WalletAddressService = class WalletAddressService {
    constructor(walletAddressRepository) {
        this.walletAddressRepository = walletAddressRepository;
        this.bitcoinRepository = new bitcoin_1.default();
        this.tetherRepository = new tether_1.default();
        this.litecoinRepository = new litecoin_1.default();
        this.ethereumRepository = new ethereum_1.default();
        this.solanaRepository = new solana_1.default();
    }
    createAddress(currencyName) {
        switch (currencyName) {
            case 'bitcoin':
                this.bitcoinRepository.generateWalletAddress();
                break;
            case 'ethereum':
                this.ethereumRepository.generateWalletAddress();
                break;
            case 'litecoin':
                this.litecoinRepository.generateWalletAddress();
                break;
            case 'tether':
                this.tetherRepository.generateWalletAddress();
                break;
            case 'solana':
                this.solanaRepository.generateWalletAddress();
                break;
            default:
                new Error('Unsupported Currency Name');
                break;
        }
    }
    createTransaction(currencyName, privateKey, walletAddress, receiverAddress, amount) {
        switch (currencyName) {
            case 'bitcoin':
                this.bitcoinRepository.sendBitcoin(walletAddress, privateKey, receiverAddress, amount);
                break;
            case 'ethereum':
                this.ethereumRepository.sendEthers(privateKey, walletAddress, receiverAddress, amount);
                break;
            case 'litecoin':
                this.litecoinRepository.sendLiteCoin(privateKey, walletAddress, receiverAddress, amount);
                break;
            case 'tether':
                this.tetherRepository.sendUSDT(privateKey, walletAddress, receiverAddress, amount);
                break;
            case 'solana':
                this.solanaRepository.transferSol(privateKey, walletAddress, receiverAddress, amount);
                break;
            default:
                new Error('Unsupported Currency Name');
                break;
        }
    }
    verifyTransaction(currenyName, transactionId) {
        switch (currenyName) {
            case 'bitcoin':
                return this.bitcoinRepository.checkTransactionStatus(transactionId);
            case 'litecoin':
                return this.litecoinRepository.checkTransactionStatus(transactionId);
            case 'ethereum':
                return this.ethereumRepository.checkTransactionStatus(transactionId);
            case 'solana':
                return this.solanaRepository.checkTransactionStatus(transactionId);
            case 'tether':
                return this.tetherRepository.checkTransactionStatus(transactionId);
            default:
                return 'Unsupported Currency';
        }
    }
    create(createWalletAddressDto) {
        const wallet = this.walletAddressRepository.create(createWalletAddressDto);
        return this.walletAddressRepository.save(wallet);
    }
    findAll(walletId) {
        return this.walletAddressRepository.findBy({ walletId });
    }
    findOne(id) {
        return this.walletAddressRepository.findOneBy({ id });
    }
};
exports.WalletAddressService = WalletAddressService;
exports.WalletAddressService = WalletAddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_address_entity_1.WalletAddress)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WalletAddressService);
//# sourceMappingURL=wallet_address.service.js.map