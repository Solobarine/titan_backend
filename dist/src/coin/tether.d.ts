import Ethereum from './ethereum';
export default class Tether extends Ethereum {
    sendUSDT(privateKey: string, senderAddress: string, receiverAddress: string, amount: number): Promise<import("web3").TransactionReceipt>;
    checkTransactionStatus(transactionHash: string): Promise<{
        transactionHash: string;
        confirmations: string;
        blockHeight: string;
    }>;
}
