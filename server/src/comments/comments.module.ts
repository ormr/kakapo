import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from 'src/comments/entities/comment.entity';
import User from '../users/entities/user.entity';
import CommentsController from './controllers/comments.controller';
import CommentsService from './services/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
