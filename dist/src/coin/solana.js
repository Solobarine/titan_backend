"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const axios_1 = require("axios");
const currency_1 = require("../utils/currency");
class Solana extends currency_1.default {
    generateWalletAddress() {
        const keyPair = web3_js_1.Keypair.generate();
        const publicKey = keyPair.publicKey.toString();
        const privateKey = keyPair.secretKey;
        const walletCredentials = {
            privateKey: Buffer.from(privateKey).toString('hex'),
            publicKey,
            walletAddress: publicKey,
        };
        return walletCredentials;
    }
    async transferSol(privateKey, senderAddress, receiverAddress, amount) {
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('testnet'), 'confirmed');
        const keyPair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(privateKey));
        const { blockhash } = await connection.getLatestBlockhash();
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
            fromPubkey: senderAddress,
            toPubkey: receiverAddress,
            lamports: web3_js_1.LAMPORTS_PER_SOL * amount,
        }));
        try {
            transaction.recentBlockhash = blockhash;
            transaction.sign(keyPair);
            const signature = await connection.sendTransaction(transaction, [
                keyPair,
            ]);
            await connection.confirmTransaction(signature);
            return {
                status: 'success',
                amount: amount,
                senderAddress: senderAddress,
                receiverAddress: receiverAddress,
            };
        }
        catch (error) {
            return {
                status: error,
                error: error,
            };
        }
    }
    async checkTransactionStatus(transactionId) {
        if (!transactionId)
            ({ status: 'Invalid Transaction Id' });
        const url = `https://api.solscan.io/transaction/${transactionId}`;
        try {
            const response = await axios_1.default.get(url);
            return {
                transactionId: response.data.transaction_id,
                blockTime: response.data.result.blockTime,
                status: response.data.result.meta.status,
            };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Solana;
//# sourceMappingURL=solana.js.map