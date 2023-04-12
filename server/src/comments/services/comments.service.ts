import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from '../entities/comment.entity';
import User from '../../users/entities/user.entity';
import { LikeDto } from 'src/likes/dto/like.dto';

@Injectable()
class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['post'] });
  }

  async getCommentsByPostId(id: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        post: {
          id,
        },
      },
    });
  }

  async createComment(commentDto: LikeDto, author: User): Promise<any> {
    const comment = this.commentRepository.save({
      ...commentDto,
      author,
    });

    return comment;
  }
}

export default CommentsService;
