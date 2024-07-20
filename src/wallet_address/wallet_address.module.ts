import { Module } from '@nestjs/common';
import { WalletAddressService } from './wallet_address.service';
import { WalletAddressController } from './wallet_address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddress } from './entities/wallet_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAddress])],
  controllers: [WalletAddressController],
  providers: [WalletAddressService],
})
export class WalletAddressModule {}
