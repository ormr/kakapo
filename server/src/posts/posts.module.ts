import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserResolver } from 'src/users/resolvers/user/user.resolver';
import { UserService } from 'src/users/services/user/user.service';
import { Post } from './entities/post.entity';
import { PostResolver } from './resolvers/post/post.resolver';
import { PostService } from './services/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostResolver, PostService, UserResolver, UserService]
})
export class PostsModule { }
