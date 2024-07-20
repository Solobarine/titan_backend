import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: 'postgres',
  database: 'titan_development',
  password: 'postgres',
  applicationName: 'Titan',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

export default new DataSource(dataSourceOptions);
