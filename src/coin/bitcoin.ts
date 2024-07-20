import { Payment, networks, payments, Psbt } from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import Currency from 'src/utils/currency';
import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';
import axios from 'axios';

export default class Bitcoin extends Currency {
  async generateWalletAddress(): Promise<{
    privateKey: string;
    publicKey?: string;
    walletAddress: string | Payment;
  }> {
    const bip32 = BIP32Factory(ecc);

    // Generate Mnemonic
    const mnemonic = bip39.generateMnemonic();

    // Generate Seed
    const seed = await bip39.mnemonicToSeed(mnemonic);

    const network = networks.testnet;
    const root = bip32.fromSeed(seed, network);
    const child = root.derivePath("m/44'/2'/0'/0/0");
    const address = payments.p2pkh({ pubkey: child.publicKey, network });

    const addressCredentials = {
      privateKey: child.toWIF(),
      publicKey: child.publicKey.toString('hex'),
      walletAddress: address,
    };

    return addressCredentials;
  }

  async checkTransactionStatus(transactionId: string): Promise<
    | {
        transactionId: string;
        blockHeight: string;
        confirmations: string;
      }
    | { error: string }
  > {
    const url = `https://blockchain.info/rawtx/${transactionId}`;
    const { data, status } = await axios.get(url);
    if (status === 200) {
      return {
        transactionId,
        blockHeight: data.block_height,
        confirmations: data.confirmations,
      };
    } else {
      return { error: 'Unable to get Transaction Information' };
    }
  }

  async sendBitcoin(
    senderAddress: string,
    privateKey: string,
    receiverAddress: string,
    amount: number,
  ) {
    const amountInSatoshis = amount * 1e8;

    const rawTx = await this.createTransaction(
      senderAddress,
      receiverAddress,
      amountInSatoshis,
      privateKey,
    );
    console.log('Raw Transaction Hex:', rawTx);

    const broadcastUrl =
      'https://blockchair.com/api/v2/push/transaction/litecoin';
    const response = await axios.post(broadcastUrl, { data: rawTx });
    console.log('Transaction broadcast response:', response.data);
  }

  /** Get Unspent UTXOs **/
  private async getUTXOs(address: string) {
    const url = `https://blockchair.com/api/v2/address/utxo/litecoin/${address}`;
    const response = await axios.get(url);
    return response.data.data[address].utxo;
  }

  /**
   * Get Transaction Fee Rate
   * */
  private async getTransactionFeeRate() {
    try {
      const response = await axios.get(
        'https://api.blockchair.com/litecoin/stats',
      );
      const feeRate = response.data.data.suggested_transaction_fee_per_byte_sat;
      return feeRate;
    } catch (error) {
      console.error('Error fetching transaction fee rate:', error);
      throw error;
    }
  }

  /**
   * Create and Sign a Litecoin Transaction
   * */
  private async createTransaction(
    senderAddress: string,
    receiverAddress: string,
    amount: number,
    privateKeyWIF: any,
  ) {
    const utxos = await this.getUTXOs(senderAddress);
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(privateKeyWIF, networks.bitcoin);

    const psbt = new Psbt({ network: networks.bitcoin });
    let inputSum = 0;
    let byteCount = 0;

    // Add inputs
    utxos.forEach(
      (utxo: {
        index: number;
        transaction_hash: string;
        value: number;
        raw_hex: string;
      }) => {
        inputSum += utxo.value;
        psbt.addInput({
          hash: utxo.transaction_hash,
          index: utxo.index,
          nonWitnessUtxo: Buffer.from(utxo.raw_hex, 'hex'),
        });
        byteCount += 180; // Rough estimate for input byte size
      },
    );

    // Add output
    psbt.addOutput({
      address: receiverAddress,
      value: amount,
    });
    byteCount += 34; // Rough estimate for output byte size

    // Add change output if necessary
    const feeRate = await this.getTransactionFeeRate(); // Get current fee rate in satoshis per byte
    const fee = feeRate * byteCount; // Total fee in satoshis
    const change = inputSum - amount - fee;
    if (change > 0) {
      psbt.addOutput({
        address: senderAddress,
        value: change,
      });
    }

    // Sign each input
    utxos.forEach((__: any, index: number) => {
      psbt.signInput(index, keyPair);
    });

    // Finalize the transaction
    psbt.finalizeAllInputs();

    // Get the raw transaction hex
    const rawTx = psbt.extractTransaction().toHex();
    return rawTx;
  }
}
