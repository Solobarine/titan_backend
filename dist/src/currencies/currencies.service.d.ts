import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
export declare class CurrenciesService {
    private currencyRepository;
    constructor(currencyRepository: Repository<Currency>);
    create(createCurrencyDto: CreateCurrencyDto): Currency;
    findAll(): Promise<Currency[]>;
    findOne(id: number): Promise<Currency>;
    update(id: number, updateCurrencyDto: UpdateCurrencyDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Currency>;
}
