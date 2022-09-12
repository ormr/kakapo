import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import User from '../users/entities/user.entity';
import Post from '../posts/entities/post.entity';
import { config } from 'dotenv';
import { CreatePost1662979231566 } from '../migrations/1662979231566-CreatePost';

config();

// const configService = new ConfigService({ env: '../../../.env' });

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '123456',
  database: 'blog-db',
  entities: [Post, User, Comment],
  migrations: [CreatePost1662979231566]
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
