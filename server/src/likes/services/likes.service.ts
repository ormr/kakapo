import { Injectable } from '@nestjs/common';
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
    private readonly likeRepository: Repository<Like>,
  ) {}

  async put(likeDto: LikeDto, user: User): Promise<Like> {
    return await this.likeRepository.save({
      ...likeDto,
      user,
    });
  }

  async remove(likeDto: LikeDto, user: User): Promise<string> {
    const like = await this.likeRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!like) return;

    const deleted = await this.likeRepository.delete({ id: likeDto.post.id });

    return likeDto.post.id;
  }
}

