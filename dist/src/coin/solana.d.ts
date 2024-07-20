import { PublicKey } from '@solana/web3.js';
import Currency from 'src/utils/currency';
export default class Solana extends Currency {
    generateWalletAddress(): {
        privateKey: string;
        publicKey?: string;
        walletAddress: string;
    };
    transferSol(privateKey: ArrayBufferLike, senderAddress: PublicKey, receiverAddress: PublicKey, amount: number): Promise<any>;
    checkTransactionStatus(transactionId: string): Promise<{
        transactionId: string;
        status: string;
        blockTime: string;
    }>;
}
