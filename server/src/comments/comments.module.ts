import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './controllers/comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [],
  controllers: [CommentsController],
})
export class CommentsModule { }
