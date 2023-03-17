import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Like from './entities/like.entity';
import { LikeService } from './services/likes.service';
import LikesController from './controllers/like.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeService],
  controllers: [LikesController],
})
export class LikesModule {}
