import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from '@solana/web3.js';
import axios from 'axios';
import Currency from 'src/utils/currency';

export default class Solana extends Currency {
  generateWalletAddress(): {
    privateKey: string;
    publicKey?: string;
    walletAddress: string;
  } {
    const keyPair = Keypair.generate();

    const publicKey = keyPair.publicKey.toString();
    const privateKey = keyPair.secretKey;

    const walletCredentials = {
      privateKey: Buffer.from(privateKey).toString('hex'),
      publicKey,
      walletAddress: publicKey,
    };

    return walletCredentials;
  }

  async transferSol(
    privateKey: ArrayBufferLike,
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: number,
  ): Promise<any> {
    const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

    const keyPair = Keypair.fromSecretKey(new Uint8Array(privateKey));

    // Get Block Hash
    const { blockhash } = await connection.getLatestBlockhash();

    // Create Transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderAddress,
        toPubkey: receiverAddress,
        lamports: LAMPORTS_PER_SOL * amount,
      }),
    );
    try {
      // Set Block Hash
      transaction.recentBlockhash = blockhash;

      // Sign Transaction
      transaction.sign(keyPair);

      // Send Transaction
      const signature = await connection.sendTransaction(transaction, [
        keyPair,
      ]);

      // Confirm transaction
      await connection.confirmTransaction(signature);

      return {
        status: 'success',
        amount: amount,
        senderAddress: senderAddress,
        receiverAddress: receiverAddress,
      };
    } catch (error) {
      return {
        status: error,
        error: error,
      };
    }
  }

  async checkTransactionStatus(transactionId: string): Promise<{
    transactionId: string;
    status: string;
    blockTime: string;
  }> {
    if (!transactionId) ({ status: 'Invalid Transaction Id' });
    const url = `https://api.solscan.io/transaction/${transactionId}`;
    try {
      const response = await axios.get(url);
      return {
        transactionId: response.data.transaction_id,
        blockTime: response.data.result.blockTime,
        status: response.data.result.meta.status,
      };
    } catch (error) {
      throw error;
    }
  }
}
