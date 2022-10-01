import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const { userId, ...comment } = createCommentDto;
    const author = await this.usersService.getById(userId);

    return this.commentsService.createComment(comment, author);
  }
}
