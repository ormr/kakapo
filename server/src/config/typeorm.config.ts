import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import User from '../users/entities/user.entity';
import Post from '../posts/entities/post.entity';
import LocalFile from '../localFiles/entities/localFile.entity';
import {
  RemovedPostTitle1678907507513
} from '../migrations/1678907507513-RemovedPostTitle';

config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '123456',
  database: 'blog-db',
  entities: [Post, User, LocalFile],
  migrations: [
    RemovedPostTitle1678907507513
  ],
});
