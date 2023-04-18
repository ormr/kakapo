import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { CreatedAllEntities1681650046713 } from '../migrations/1681650046713-CreatedAllEntities';

config({ path: path.join(__dirname, '..', '..', '.env') });

export default new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: process.env.TYPEORM_SSL === 'true',
  entities: [path.join(__dirname, '..', '/dist/**/*.entity{.ts,.js}')],
  migrations: [CreatedAllEntities1681650046713],
});
