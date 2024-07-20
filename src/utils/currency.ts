import { Payment } from 'bitcoinjs-lib';

export default class Currency {
  constructor() {}

  generateWalletAddress():
    | Promise<{
        privateKey: string;
        publicKey?: string;
        walletAddress: string | Payment;
      }>
    | {
        privateKey: string;
        publicKey?: string;
        walletAddress: string | Payment;
      } {
    return Promise.resolve({
      privateKey: 'Private Key',
      publicKey: 'Public Key',
      walletAddress: 'walletAddress',
    });
  }

  async sendCurrency(): Promise<any> {}

  // Check the Status of Crypto Transaction
  checkTransactionStatus(transactionId: string) {}
}
