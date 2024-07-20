import { Injectable } from '@nestjs/common';
import { CreateWalletAddressDto } from './dto/create-wallet_address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Bitcoin from 'src/coin/bitcoin';
import { Repository } from 'typeorm';
import Tether from 'src/coin/tether';
import Litecoin from 'src/coin/litecoin';
import Ethereum from 'src/coin/ethereum';
import Solana from 'src/coin/solana';
import { WalletAddress } from './entities/wallet_address.entity';
import { PublicKey } from '@solana/web3.js';

@Injectable()
export class WalletAddressService {
  private bitcoinRepository: Bitcoin;
  private tetherRepository: Tether;
  private litecoinRepository: Litecoin;
  private ethereumRepository: Ethereum;
  private solanaRepository: Solana;

  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
  ) {
    this.bitcoinRepository = new Bitcoin();
    this.tetherRepository = new Tether();
    this.litecoinRepository = new Litecoin();
    this.ethereumRepository = new Ethereum();
    this.solanaRepository = new Solana();
  }

  createAddress(currencyName: string) {
    switch (currencyName) {
      case 'bitcoin':
        this.bitcoinRepository.generateWalletAddress();
        break;
      case 'ethereum':
        this.ethereumRepository.generateWalletAddress();
        break;
      case 'litecoin':
        this.litecoinRepository.generateWalletAddress();
        break;
      case 'tether':
        this.tetherRepository.generateWalletAddress();
        break;
      case 'solana':
        this.solanaRepository.generateWalletAddress();
        break;
      default:
        new Error('Unsupported Currency Name');
        break;
    }
  }

  createTransaction(
    currencyName: string,
    privateKey: string | ArrayBufferLike,
    walletAddress: string | PublicKey,
    receiverAddress: string | PublicKey,
    amount: number,
  ) {
    switch (currencyName) {
      case 'bitcoin':
        this.bitcoinRepository.sendBitcoin(
          walletAddress as string,
          privateKey as string,
          receiverAddress as string,
          amount,
        );
        break;
      case 'ethereum':
        this.ethereumRepository.sendEthers(
          privateKey as string,
          walletAddress as string,
          receiverAddress as string,
          amount,
        );
        break;
      case 'litecoin':
        this.litecoinRepository.sendLiteCoin(
          privateKey as string,
          walletAddress as string,
          receiverAddress as string,
          amount,
        );
        break;
      case 'tether':
        this.tetherRepository.sendUSDT(
          privateKey as string,
          walletAddress as string,
          receiverAddress as string,
          amount,
        );
        break;
      case 'solana':
        this.solanaRepository.transferSol(
          privateKey as ArrayBufferLike,
          walletAddress as PublicKey,
          receiverAddress as PublicKey,
          amount,
        );
        break;
      default:
        new Error('Unsupported Currency Name');
        break;
    }
  }

  /**
   * Get Status of a Transaction.
   * - Replace TransactionId with transactionHash for Ethereum and Tether
   */
  verifyTransaction(currenyName: string, transactionId: string) {
    switch (currenyName) {
      case 'bitcoin':
        return this.bitcoinRepository.checkTransactionStatus(transactionId);
      case 'litecoin':
        return this.litecoinRepository.checkTransactionStatus(transactionId);
      case 'ethereum':
        return this.ethereumRepository.checkTransactionStatus(transactionId);
      case 'solana':
        return this.solanaRepository.checkTransactionStatus(transactionId);
      case 'tether':
        return this.tetherRepository.checkTransactionStatus(transactionId);
      default:
        return 'Unsupported Currency';
    }
  }

  create(createWalletAddressDto: CreateWalletAddressDto) {
    const wallet = this.walletAddressRepository.create(createWalletAddressDto);

    return this.walletAddressRepository.save(wallet);
  }

  findAll(walletId: number) {
    return this.walletAddressRepository.findBy({ walletId });
  }

  findOne(id: number) {
    return this.walletAddressRepository.findOneBy({ id });
  }
}
