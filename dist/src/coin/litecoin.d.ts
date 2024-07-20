import { Payment } from 'bitcoinjs-lib';
import Currency from 'src/utils/currency';
export default class Litecoin extends Currency {
    generateWalletAddress(): Promise<{
        privateKey: string;
        publicKey?: string;
        walletAddress: string | Payment;
    }>;
    sendLiteCoin(privateKey: string, senderAddress: string, receiverAddress: string, amount: number): Promise<void>;
    checkTransactionStatus(transactionId: string): Promise<{
        transactionId: string;
        status: string;
        blockHeight: string;
        error?: string;
    }>;
    private getUTXOs;
    private getTransactionFeeRate;
    private createTransaction;
}
