import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { RequestWithUser } from 'src/authentication/interfaces/requestWithUser.interface';
import { CreateCommentDto } from '../dto/create-comment.dto';
import CommentsService from '../services/comments.service';

@Controller('comments')
class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: RequestWithUser
  ) {
    return this.commentsService.createComment(createCommentDto, req.user);
  }
}

export default CommentsController;
