import { CreateWalletAddressDto } from './dto/create-wallet_address.dto';
import { Repository } from 'typeorm';
import { WalletAddress } from './entities/wallet_address.entity';
import { PublicKey } from '@solana/web3.js';
export declare class WalletAddressService {
    private walletAddressRepository;
    private bitcoinRepository;
    private tetherRepository;
    private litecoinRepository;
    private ethereumRepository;
    private solanaRepository;
    constructor(walletAddressRepository: Repository<WalletAddress>);
    createAddress(currencyName: string): void;
    createTransaction(currencyName: string, privateKey: string | ArrayBufferLike, walletAddress: string | PublicKey, receiverAddress: string | PublicKey, amount: number): void;
    verifyTransaction(currenyName: string, transactionId: string): Promise<{
        transactionId: string;
        blockHeight: string;
        confirmations: string;
    } | {
        error: string;
    }> | Promise<{
        transactionHash: string;
        confirmations: string;
        blockHeight: string;
    }> | Promise<{
        transactionId: string;
        status: string;
        blockHeight: string;
        error?: string;
    }> | Promise<{
        transactionId: string;
        status: string;
        blockTime: string;
    }> | "Unsupported Currency";
    create(createWalletAddressDto: CreateWalletAddressDto): Promise<WalletAddress>;
    findAll(walletId: number): Promise<WalletAddress[]>;
    findOne(id: number): Promise<WalletAddress>;
}
