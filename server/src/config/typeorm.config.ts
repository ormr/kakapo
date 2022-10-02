import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import User from '../users/entities/user.entity';
import Post from '../posts/entities/post.entity';
import { migrations1664096717354 } from '../migrations/1664096717354-migrations';
import { migrations1664702608623 } from '../migrations/1664702608623-migrations';

config();

// const configService = new ConfigService({ env: '../../../.env' });

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '123456',
  database: 'blog-db',
  entities: [Post, User],
  migrations: [migrations1664096717354, migrations1664702608623],
});

// export default new DataSource({
//   type: 'postgres',
//   host: configService.get<string>('TYPEORM_HOST'),
//   port: configService.get<number>('TYPEORM_PORT'),
//   username: configService.get<string>('TYPEORM_USERNAME'),
//   password: configService.get<string>('TYPEORM_PASSWORD'),
//   database: configService.get<string>('TYPEORM_DATABASE'),
//   entities: [Post, User],
// });
