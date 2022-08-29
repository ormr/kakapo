import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
// import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepsitory: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { userId, ...commentDto } = createCommentDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const comment = {
      ...commentDto,
      author: user,
    }

    return await this.commentRepsitory.save(comment);
  }

}
