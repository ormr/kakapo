import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  async getPostComments() {

  }

  @Post()
  async createComment(@Body() comment: CreateCommentDto) {
    return this.commentsService.createComment(comment);
  }
}
