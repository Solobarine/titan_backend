import { Payment } from 'bitcoinjs-lib';
export default class Currency {
    constructor();
    generateWalletAddress(): Promise<{
        privateKey: string;
        publicKey?: string;
        walletAddress: string | Payment;
    }> | {
        privateKey: string;
        publicKey?: string;
        walletAddress: string | Payment;
    };
    sendCurrency(): Promise<any>;
    checkTransactionStatus(transactionId: string): void;
}
