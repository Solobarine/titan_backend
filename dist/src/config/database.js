"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
exports.dataSourceOptions = {
    type: 'postgres',
    username: 'postgres',
    database: 'titan_development',
    password: 'postgres',
    applicationName: 'Titan',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
};
exports.default = new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=database.js.map