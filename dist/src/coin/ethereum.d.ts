import Currency from 'src/utils/currency';
export default class Ethereum extends Currency {
    generateWalletAddress(): {
        privateKey: string;
        publicKey?: string;
        walletAddress: string;
    };
    sendEthers(privateKey: string, senderAddress: string, receiverAddress: string, amount: number): Promise<import("web3").TransactionReceipt>;
    checkTransactionStatus(transactionHash: string): Promise<{
        transactionHash: string;
        confirmations: string;
        blockHeight: string;
    }>;
}
