"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const bip39 = require("bip39");
const currency_1 = require("../utils/currency");
const axios_1 = require("axios");
const bip32_1 = require("bip32");
const ecc = require("tiny-secp256k1");
const bitcoin = require("bitcoinjs-lib");
const ecpair_1 = require("ecpair");
class Litecoin extends currency_1.default {
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
    async sendLiteCoin(privateKey, senderAddress, receiverAddress, amount) {
        const litecoinNetwork = {
            messagePrefix: '\x19Litecoin Signed Message:\n',
            bech32: 'ltc',
            bip32: {
                public: 0x019da462,
                private: 0x019d9cfe,
            },
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            wif: 0xb0,
        };
        try {
            const amountInSatoshis = amount * 1e8;
            const rawTx = await this.createTransaction(senderAddress, receiverAddress, amountInSatoshis, privateKey, litecoinNetwork);
            console.log('Raw Transaction Hex:', rawTx);
            const broadcastUrl = 'https://blockchair.com/api/v2/push/transaction/litecoin';
            const response = await axios_1.default.post(broadcastUrl, { data: rawTx });
            console.log('Transaction broadcast response:', response.data);
        }
        catch (error) {
            console.error('Error transferring Litecoin:', error);
        }
    }
    async checkTransactionStatus(transactionId) {
        if (!transactionId)
            ({ status: 'Invalid Transaction Id' });
        const url = `https://api.blockchair.com/litecoin/dashboards/transaction/${transactionId}`;
        const response = await axios_1.default.get(url);
        const { data } = response;
        try {
            return {
                transactionId: transactionId,
                status: data.transaction_id.status,
                blockHeight: data.transaction_id.block_id,
            };
        }
        catch (error) {
            throw error;
        }
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
    async createTransaction(senderAddress, receiverAddress, amount, privateKeyWIF, litecoinNetwork) {
        const utxos = await this.getUTXOs(senderAddress);
        const ECPair = (0, ecpair_1.default)(ecc);
        const keyPair = ECPair.fromWIF(privateKeyWIF, litecoinNetwork);
        const psbt = new bitcoin.Psbt({ network: litecoinNetwork });
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
exports.default = Litecoin;
//# sourceMappingURL=litecoin.js.map