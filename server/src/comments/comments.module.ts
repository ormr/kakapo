import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import CommentsService from './services/comments.service';
import Comment from './entities/comment.entity';
import CommentsController from './controllers/comments.controller';
import Post from 'src/posts/entities/post.entity';
import PostService from 'src/posts/services/posts.service';
import { LikeService } from 'src/likes/services/likes.service';
import { LikesModule } from 'src/likes/likes.module';
import { LocalFilesModule } from 'src/localFiles/localFile.module';
import Like from 'src/likes/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, Like]),
    PostsModule,
    LikesModule,
    LocalFilesModule,
  ],
  providers: [CommentsService, PostService, LikeService],
  controllers: [CommentsController],
})
export class CommentsModule {}
