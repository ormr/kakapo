import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from './entities/comment.entity';
import CommentsController from './controllers/comments.controller';
import CommentsService from './services/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
