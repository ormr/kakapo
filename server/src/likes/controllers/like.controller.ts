import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { RequestWithUser } from 'src/authentication/interfaces/requestWithUser.interface';
import { LikeDto } from '../dto/like.dto';
import { LikeService } from '../services/likes.service';

@Controller('likes')
class LikesController {
  constructor(private readonly likesService: LikeService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async like(@Req() request: RequestWithUser, @Body() post: LikeDto) {
    return this.likesService.put(post, request.user);
  }

  @Delete()
  @UseGuards(JwtAuthenticationGuard)
  async unlike(@Req() request: RequestWithUser, @Body() post: LikeDto) {
    return this.likesService.remove(post.post.id, request.user.id);
  }
}

export default LikesController;
