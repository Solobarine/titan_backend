import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressController } from './wallet_address.controller';
import { WalletAddressService } from './wallet_address.service';

describe('WalletAddressController', () => {
  let controller: WalletAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAddressController],
      providers: [WalletAddressService],
    }).compile();

    controller = module.get<WalletAddressController>(WalletAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
