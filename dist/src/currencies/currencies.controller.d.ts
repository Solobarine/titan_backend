import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
export declare class CurrenciesController {
    private readonly currenciesService;
    constructor(currenciesService: CurrenciesService);
    create(createCurrencyDto: CreateCurrencyDto): import("./entities/currency.entity").Currency;
    findAll(): Promise<import("./entities/currency.entity").Currency[]>;
    findOne(id: string): Promise<import("./entities/currency.entity").Currency>;
    update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("./entities/currency.entity").Currency>;
}
