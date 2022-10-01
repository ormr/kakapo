import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';
import User from '../users/entities/user.entity';
import Post from './entities/post.entity';
import { PostService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostService, UsersService],
  controllers: [PostsController],
})
export class PostsModule {}
