import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletAddressService } from './wallet_address.service';
import { CreateWalletAddressDto } from './dto/create-wallet_address.dto';
import { TransactionDto, VerifyTransactionDto } from './dto/transaction.dto';
@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  /** Create a Wallet Address **/
  @Post()
  create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
    return this.walletAddressService.create(createWalletAddressDto);
  }

  /** Get all Wallet Adresses for a single User **/
  @Get('user/:id')
  findAll(@Param('user_id') id: number) {
    return this.walletAddressService.findAll(id);
  }

  /** Get a Single Wallet Address **/
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.walletAddressService.findOne(id);
  }

  /** Create a Transaction **/
  @Post()
  async createTransaction(@Body() transactionDto: TransactionDto) {
    const walletAddress = await this.findOne(transactionDto.walletAddressId);
    if (!walletAddress) {
      return { status: 'Address Does not Exist' };
    }
    return this.walletAddressService.createTransaction(
      transactionDto.currencyName,
      walletAddress.privateKey,
      walletAddress.address,
      transactionDto.receiverAddress,
      transactionDto.amount,
    );
  }

  /** Check Transaction Status **/
  @Post('/transaction/:transactionId')
  async verifyTransaction(@Body() verifyTransactionDto: VerifyTransactionDto) {
    return this.walletAddressService.verifyTransaction(
      verifyTransactionDto.currencyName,
      verifyTransactionDto.transactionId,
    );
  }
}
