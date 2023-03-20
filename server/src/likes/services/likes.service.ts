import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import Like from '../entities/like.entity';
import { LikeDto } from '../dto/like.dto';
import Post from 'src/posts/entities/post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async put(likeDto: LikeDto, user: User): Promise<Like> {
    return await this.likeRepository.save({
      ...likeDto,
      user,
    });
  }

  async remove(postId: string, userId: string): Promise<string> {
    const like = await this.likeRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!like) {
      throw new HttpException('Like is not found', HttpStatus.NOT_FOUND)
    };

    const deleted = await this.likeRepository.delete({ id: like.id });

    return postId;
  }
}
