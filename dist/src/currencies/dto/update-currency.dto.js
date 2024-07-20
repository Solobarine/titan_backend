"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCurrencyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_currency_dto_1 = require("./create-currency.dto");
class UpdateCurrencyDto extends (0, swagger_1.PartialType)(create_currency_dto_1.CreateCurrencyDto) {
}
exports.UpdateCurrencyDto = UpdateCurrencyDto;
//# sourceMappingURL=update-currency.dto.js.map