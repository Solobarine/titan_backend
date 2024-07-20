"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const bip32_1 = require("bip32");
const currency_1 = require("../utils/currency");
const bip39 = require("bip39");
const ecc = require("tiny-secp256k1");
const ecpair_1 = require("ecpair");
const axios_1 = require("axios");
class Bitcoin extends currency_1.default {
    async generateWalletAddress() {
        const bip32 = (0, bip32_1.default)(ecc);
        const mnemonic = bip39.generateMnemonic();
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const network = bitcoinjs_lib_1.networks.testnet;
        const root = bip32.fromSeed(seed, network);
        const child = root.derivePath("m/44'/2'/0'/0/0");
        const address = bitcoinjs_lib_1.payments.p2pkh({ pubkey: child.publicKey, network });
        const addressCredentials = {
            privateKey: child.toWIF(),
            publicKey: child.publicKey.toString('hex'),
            walletAddress: address,
        };
        return addressCredentials;
    }
    async checkTransactionStatus(transactionId) {
        const url = `https://blockchain.info/rawtx/${transactionId}`;
        const { data, status } = await axios_1.default.get(url);
        if (status === 200) {
            return {
                transactionId,
                blockHeight: data.block_height,
                confirmations: data.confirmations,
            };
        }
        else {
            return { error: 'Unable to get Transaction Information' };
        }
    }
    async sendBitcoin(senderAddress, privateKey, receiverAddress, amount) {
        const amountInSatoshis = amount * 1e8;
        const rawTx = await this.createTransaction(senderAddress, receiverAddress, amountInSatoshis, privateKey);
        console.log('Raw Transaction Hex:', rawTx);
        const broadcastUrl = 'https://blockchair.com/api/v2/push/transaction/litecoin';
        const response = await axios_1.default.post(broadcastUrl, { data: rawTx });
        console.log('Transaction broadcast response:', response.data);
    }
    async getUTXOs(address) {
        const url = `https://blockchair.com/api/v2/address/utxo/litecoin/${address}`;
        const response = await axios_1.default.get(url);
        return response.data.data[address].utxo;
    }
    async getTransactionFeeRate() {
        try {
            const response = await axios_1.default.get('https://api.blockchair.com/litecoin/stats');
            const feeRate = response.data.data.suggested_transaction_fee_per_byte_sat;
            return feeRate;
        }
        catch (error) {
            console.error('Error fetching transaction fee rate:', error);
            throw error;
        }
    }
    async createTransaction(senderAddress, receiverAddress, amount, privateKeyWIF) {
        const utxos = await this.getUTXOs(senderAddress);
        const ECPair = (0, ecpair_1.default)(ecc);
        const keyPair = ECPair.fromWIF(privateKeyWIF, bitcoinjs_lib_1.networks.bitcoin);
        const psbt = new bitcoinjs_lib_1.Psbt({ network: bitcoinjs_lib_1.networks.bitcoin });
        let inputSum = 0;
        let byteCount = 0;
        utxos.forEach((utxo) => {
            inputSum += utxo.value;
            psbt.addInput({
                hash: utxo.transaction_hash,
                index: utxo.index,
                nonWitnessUtxo: Buffer.from(utxo.raw_hex, 'hex'),
            });
            byteCount += 180;
        });
        psbt.addOutput({
            address: receiverAddress,
            value: amount,
        });
        byteCount += 34;
        const feeRate = await this.getTransactionFeeRate();
        const fee = feeRate * byteCount;
        const change = inputSum - amount - fee;
        if (change > 0) {
            psbt.addOutput({
                address: senderAddress,
                value: change,
            });
        }
        utxos.forEach((__, index) => {
            psbt.signInput(index, keyPair);
        });
        psbt.finalizeAllInputs();
        const rawTx = psbt.extractTransaction().toHex();
        return rawTx;
    }
}
exports.default = Bitcoin;
//# sourceMappingURL=bitcoin.js.map