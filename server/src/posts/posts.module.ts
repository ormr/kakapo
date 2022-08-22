import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserResolver } from 'src/users/resolvers/user/user.resolver';
import { UserService } from 'src/users/services/user/user.service';
import { PostEntity } from './entities/post.entity';
import { PostResolver } from './resolvers/post/post.resolver';
import { PostService } from './services/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  providers: [PostResolver, PostService, UserResolver, UserService]
})
export class PostsModule { }
