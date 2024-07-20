import { Payment, networks, payments } from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import Currency from 'src/utils/currency';
import axios from 'axios';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';

export default class Litecoin extends Currency {
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

  async sendLiteCoin(
    privateKey: string,
    senderAddress: string,
    receiverAddress: string,
    amount: number,
  ) {
    const litecoinNetwork = {
      messagePrefix: '\x19Litecoin Signed Message:\n',
      bech32: 'ltc',
      bip32: {
        public: 0x019da462,
        private: 0x019d9cfe,
      },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0,
    };
    try {
      // Amounts are in satoshis (1 LTC = 100,000,000 satoshis)
      const amountInSatoshis = amount * 1e8;

      const rawTx = await this.createTransaction(
        senderAddress,
        receiverAddress,
        amountInSatoshis,
        privateKey,
        litecoinNetwork,
      );
      console.log('Raw Transaction Hex:', rawTx);

      // Broadcast the transaction (you'll need an API for broadcasting, such as BlockCypher, Blockchair, etc.)
      const broadcastUrl =
        'https://blockchair.com/api/v2/push/transaction/litecoin';
      const response = await axios.post(broadcastUrl, { data: rawTx });
      console.log('Transaction broadcast response:', response.data);
    } catch (error) {
      console.error('Error transferring Litecoin:', error);
    }
  }

  async checkTransactionStatus(transactionId: string): Promise<{
    transactionId: string;
    status: string;
    blockHeight: string;
    error?: string;
  }> {
    if (!transactionId) ({ status: 'Invalid Transaction Id' });
    const url = `https://api.blockchair.com/litecoin/dashboards/transaction/${transactionId}`;
    const response = await axios.get(url);
    const { data } = response;

    try {
      return {
        transactionId: transactionId,
        status: data.transaction_id.status,
        blockHeight: data.transaction_id.block_id,
      };
    } catch (error) {
      throw error;
    }
  }

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
    litecoinNetwork: any,
  ) {
    const utxos = await this.getUTXOs(senderAddress);
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(privateKeyWIF, litecoinNetwork);

    const psbt = new bitcoin.Psbt({ network: litecoinNetwork });
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
