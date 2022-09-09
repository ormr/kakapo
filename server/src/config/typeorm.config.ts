import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Post } from 'src/posts/entities/post.entity';

const config = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: config.get<string>('TYPEORM_HOST'),
  port: config.get<number>('TYPEORM_PORT'),
  username: config.get<string>('TYPEORM_USERNAME'),
  password: config.get<string>('TYPEORM_PASSWORD'),
  database: config.get<string>('TYPEORM_DATABASE'),
  entities: [Post],
});
