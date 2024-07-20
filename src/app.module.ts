import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddressModule } from './wallet_address/wallet_address.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    WalletAddressModule,
    CurrenciesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigModule global
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
