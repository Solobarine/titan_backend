"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = require("web3");
const ethereum_1 = require("./ethereum");
const common_1 = require("@nestjs/common");
let Tether = class Tether extends ethereum_1.default {
    async sendUSDT(privateKey, senderAddress, receiverAddress, amount) {
        const web3 = new web3_1.default(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
        const tetherContractAddress = process.env.TETHER_CONTRACT_ADDRESS;
        const abi = [
            {
                constant: false,
                inputs: [
                    { name: '_to', type: 'address' },
                    { name: '_value', type: 'uint256' },
                ],
                name: 'transfer',
                outputs: [{ name: '', type: 'bool' }],
                type: 'function',
            },
        ];
        const contract = new web3.eth.Contract(abi, tetherContractAddress);
        const amountInMWei = web3.utils.toWei(amount, 'mwei');
        const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');
        const trasactionData = contract.methods
            .transfer(receiverAddress, amountInMWei)
            .encodeABI();
        const transactionObject = {
            from: senderAddress,
            to: tetherContractAddress,
            gas: 100000,
            gasPrice: await web3.eth.getGasPrice(),
            nonce: nonce,
            data: trasactionData,
        };
        const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
        const receipts = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        return receipts;
    }
    async checkTransactionStatus(transactionHash) {
        const etherscanApiKey = process.env.ETHERSCAN_PRIVATE_KEY;
        const url = `https://mainnet.infura.io/v3/${etherscanApiKey}`;
        const web3 = new web3_1.default(url);
        const transaction = await web3.eth.getTransaction(transactionHash);
        return {
            transactionHash,
            blockHeight: transaction.blockNumber,
            confirmations: transaction.data,
        };
    }
};
Tether = __decorate([
    (0, common_1.Injectable)()
], Tether);
exports.default = Tether;
//# sourceMappingURL=tether.js.map