import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}
  create(createCurrencyDto: CreateCurrencyDto) {
    return this.currencyRepository.create(createCurrencyDto);
  }

  findAll() {
    return this.currencyRepository.find();
  }

  findOne(id: number) {
    return this.currencyRepository.findOneBy({ id });
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyRepository.update({ id }, updateCurrencyDto);
  }

  async remove(id: number) {
    const currency = await this.findOne(id);
    return this.currencyRepository.remove(currency);
  }
}
