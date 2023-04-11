import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from '../entities/comment.entity';
import User from '../../users/entities/user.entity';
import { LikeDto } from 'src/likes/dto/like.dto';
import PostService from 'src/posts/services/posts.service';
import Post from 'src/posts/entities/post.entity';

@Injectable()
class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService
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
    try {
      const comment = await this.commentRepository.save({
        ...commentDto,
        author,
      });

      if (!comment) {
        throw new HttpException('Comment was not found', 201);
      }

      const post = await this.postService.getOnePost(commentDto.post.id);

      return post;
    } catch (error) {
      throw new Error('comment');
    }
  }
}

export default CommentsService;
