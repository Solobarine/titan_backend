import { WalletAddressService } from './wallet_address.service';
import { CreateWalletAddressDto } from './dto/create-wallet_address.dto';
import { TransactionDto, VerifyTransactionDto } from './dto/transaction.dto';
export declare class WalletAddressController {
    private readonly walletAddressService;
    constructor(walletAddressService: WalletAddressService);
    create(createWalletAddressDto: CreateWalletAddressDto): Promise<import("./entities/wallet_address.entity").WalletAddress>;
    findAll(id: number): Promise<import("./entities/wallet_address.entity").WalletAddress[]>;
    findOne(id: number): Promise<import("./entities/wallet_address.entity").WalletAddress>;
    createTransaction(transactionDto: TransactionDto): Promise<void | {
        status: string;
    }>;
    verifyTransaction(verifyTransactionDto: VerifyTransactionDto): Promise<{
        transactionId: string;
        blockHeight: string;
        confirmations: string;
    } | {
        error: string;
    } | {
        transactionHash: string;
        confirmations: string;
        blockHeight: string;
    } | {
        transactionId: string;
        status: string;
        blockHeight: string;
        error?: string;
    } | {
        transactionId: string;
        status: string;
        blockTime: string;
    } | "Unsupported Currency">;
}
