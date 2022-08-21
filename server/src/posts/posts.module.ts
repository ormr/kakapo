import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostResolver } from './resolvers/post/post.resolver';
import { PostService } from './services/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostResolver, PostService]
})
export class PostsModule {}
