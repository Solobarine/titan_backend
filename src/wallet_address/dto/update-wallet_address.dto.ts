import { PartialType } from '@nestjs/swagger';
import { CreateWalletAddressDto } from './create-wallet_address.dto';

export class UpdateWalletAddressDto extends PartialType(CreateWalletAddressDto) {}
