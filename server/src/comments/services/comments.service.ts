import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async createComment(commentDto: CreateCommentDto, author: User): Promise<Comment> {
    const comment = {
      ...commentDto,
      author,
    }

    return await this.commentRepository.save(comment);
  }

}
