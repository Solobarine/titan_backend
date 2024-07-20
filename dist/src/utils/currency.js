"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Currency {
    constructor() { }
    generateWalletAddress() {
        return Promise.resolve({
            privateKey: 'Private Key',
            publicKey: 'Public Key',
            walletAddress: 'walletAddress',
        });
    }
    async sendCurrency() { }
    checkTransactionStatus(transactionId) { }
}
exports.default = Currency;
//# sourceMappingURL=currency.js.map