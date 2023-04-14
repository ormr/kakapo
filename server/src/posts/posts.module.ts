import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { LocalFilesModule } from 'src/localFiles/localFile.module';
import { LikesModule } from 'src/likes/likes.module';
import { LikeService } from 'src/likes/services/likes.service';
import Like from 'src/likes/entities/like.entity';
import User from '../users/entities/user.entity';
import Post from './entities/post.entity';
import PostService from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { CommentsModule } from 'src/comments/comments.module';
import Comment from 'src/comments/entities/comment.entity';
import CommentsService from 'src/comments/services/comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Like, Comment]),
    UsersModule,
    LikesModule,
    CommentsModule,
    LocalFilesModule,
  ],
  providers: [PostService, LikeService, CommentsService],
  controllers: [PostsController],
})
export class PostsModule {}
