import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Currency {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public symbol: string;
}
