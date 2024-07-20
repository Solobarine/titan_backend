"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Titan API Doc')
    .setDescription('An Documentation of the Titan Crypto API')
    .setVersion('1.0.0')
    .build();
exports.default = swaggerConfig;
//# sourceMappingURL=swagger.js.map