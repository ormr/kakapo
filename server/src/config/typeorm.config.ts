import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import Comment from '../comments/entities/comment.entity';
import Like from '../likes/entities/like.entity';
import LocalFile from '../localFiles/entities/localFile.entity';
import Post from '../posts/entities/post.entity';
import User from '../users/entities/user.entity';
import { CreatedAllEntities1681650046713 } from '../migrations/1681650046713-CreatedAllEntities';
import { AddedCommentsAndLocationAndDegreeAndPositionFieldsToUserEntity1684838462189 } from '../migrations/1684838462189-AddedCommentsAndLocationAndDegreeAndPositionFieldsToUserEntity';


config({ path: path.join(__dirname, '..', '..', '..', '.env') });

export default new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: process.env.TYPEORM_SSL === 'true',
  entities: [Comment, Like, LocalFile, Post, User],
  migrations: [CreatedAllEntities1681650046713, AddedCommentsAndLocationAndDegreeAndPositionFieldsToUserEntity1684838462189],
});
