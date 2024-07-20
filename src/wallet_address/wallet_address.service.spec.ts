import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressService } from './wallet_address.service';

describe('WalletAddressService', () => {
  let service: WalletAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletAddressService],
    }).compile();

    service = module.get<WalletAddressService>(WalletAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
