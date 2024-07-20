import { Payment } from 'bitcoinjs-lib';
import Currency from 'src/utils/currency';
export default class Bitcoin extends Currency {
    generateWalletAddress(): Promise<{
        privateKey: string;
        publicKey?: string;
        walletAddress: string | Payment;
    }>;
    checkTransactionStatus(transactionId: string): Promise<{
        transactionId: string;
        blockHeight: string;
        confirmations: string;
    } | {
        error: string;
    }>;
    sendBitcoin(senderAddress: string, privateKey: string, receiverAddress: string, amount: number): Promise<void>;
    private getUTXOs;
    private getTransactionFeeRate;
    private createTransaction;
}
