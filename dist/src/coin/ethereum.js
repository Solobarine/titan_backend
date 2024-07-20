"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
const currency_1 = require("../utils/currency");
const web3_1 = require("web3");
class Ethereum extends currency_1.default {
    generateWalletAddress() {
        const ethWallet = ethereumjs_wallet_1.default.generate();
        const ethPrivateKey = ethWallet.getPrivateKeyString();
        const ethPublicKey = ethWallet.getPublicKeyString();
        const ethAddress = ethWallet.getAddressString();
        return {
            privateKey: ethPrivateKey,
            publicKey: ethPublicKey,
            walletAddress: ethAddress,
        };
    }
    async sendEthers(privateKey, senderAddress, receiverAddress, amount) {
        const web3 = new web3_1.default(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
        const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');
        const gasPrice = await web3.eth.getGasPrice();
        const transaction = {
            toAddress: receiverAddress,
            value: web3.utils.toWei(amount, 'ether'),
            nonce,
            gas: 2000000,
            gasPrice,
        };
        const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
        const receipts = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        return receipts;
    }
    async checkTransactionStatus(transactionHash) {
        const etherscanApiKey = process.env.ETHERSCAN_PRIVATE_KEY;
        const url = `https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${transactionHash}&apikey=${etherscanApiKey}`;
        try {
            const { data } = await axios_1.default.get(url);
            return {
                transactionHash: transactionHash,
                blockHeight: data.result.blockNumber,
                confirmations: data.result.confirmations,
            };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Ethereum;
//# sourceMappingURL=ethereum.js.map