import axios from 'axios';
import Wallet from 'ethereumjs-wallet';
import Currency from 'src/utils/currency';
import Web3 from 'web3';

export default class Ethereum extends Currency {
  generateWalletAddress(): {
    privateKey: string;
    publicKey?: string;
    walletAddress: string;
  } {
    const ethWallet = Wallet.generate();
    const ethPrivateKey = ethWallet.getPrivateKeyString();
    const ethPublicKey = ethWallet.getPublicKeyString();
    const ethAddress = ethWallet.getAddressString();

    return {
      privateKey: ethPrivateKey,
      publicKey: ethPublicKey,
      walletAddress: ethAddress,
    };
  }

  async sendEthers(
    privateKey: string,
    senderAddress: string,
    receiverAddress: string,
    amount: number,
  ) {
    const web3 = new Web3(
      `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    );

    const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');
    const gasPrice = await web3.eth.getGasPrice();

    const transaction = {
      toAddress: receiverAddress,
      value: web3.utils.toWei(amount, 'ether'),
      nonce,
      gas: 2000000,
      gasPrice,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      privateKey,
    );

    const receipts = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction,
    );

    return receipts;
  }

  async checkTransactionStatus(transactionHash: string): Promise<{
    transactionHash: string;
    confirmations: string;
    blockHeight: string;
  }> {
    const etherscanApiKey = process.env.ETHERSCAN_PRIVATE_KEY;
    const url = `https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${transactionHash}&apikey=${etherscanApiKey}`;
    try {
      const { data } = await axios.get(url);
      return {
        transactionHash: transactionHash,
        blockHeight: data.result.blockNumber,
        confirmations: data.result.confirmations,
      };
    } catch (error) {
      throw error;
    }
  }
}
