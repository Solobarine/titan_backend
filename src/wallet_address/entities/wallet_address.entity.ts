import { Column, PrimaryGeneratedColumn, RelationId } from 'typeorm';

export class WalletAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId('User')
  userId: number;

  @RelationId('Currency')
  currencyId: number;

  @RelationId('Wallet')
  walletId: number;

  @Column()
  privateKey: string;

  @Column()
  publicKey: string;

  @Column()
  address: string;
}
