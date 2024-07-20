import Web3 from 'web3';
import Ethereum from './ethereum';
import { Injectable } from '@nestjs/common';
// Supported Tether is Tether(TRC20)
@Injectable()
export default class Tether extends Ethereum {
  async sendUSDT(
    privateKey: string,
    senderAddress: string,
    receiverAddress: string,
    amount: number,
  ) {
    const web3 = new Web3(
      `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    );

    const tetherContractAddress = process.env.TETHER_CONTRACT_ADDRESS;

    const abi = [
      {
        constant: false,
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
      },
    ];

    const contract = new web3.eth.Contract(abi, tetherContractAddress);

    const amountInMWei = web3.utils.toWei(amount, 'mwei');

    const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');

    const trasactionData = contract.methods
      .transfer(receiverAddress, amountInMWei)
      .encodeABI();

    const transactionObject = {
      from: senderAddress,
      to: tetherContractAddress,
      gas: 100000,
      gasPrice: await web3.eth.getGasPrice(),
      nonce: nonce,
      data: trasactionData,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionObject,
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
    const url = `https://mainnet.infura.io/v3/${etherscanApiKey}`;
    const web3 = new Web3(url);
    const transaction = await web3.eth.getTransaction(transactionHash);

    return {
      transactionHash,
      blockHeight: transaction.blockNumber,
      confirmations: transaction.data,
    };
  }
}
