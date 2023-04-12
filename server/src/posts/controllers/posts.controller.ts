import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { RequestWithUser } from 'src/authentication/interfaces/requestWithUser.interface';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import LocalFilesInterceptor from 'src/localFiles/mixins/localFiles.interceptor';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import PostService from 'src/posts/services/posts.service';
import { UsersService } from 'src/users/services/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostService,
    private readonly userService: UsersService
  ) {}

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  async getOnePost(@Req() _request: RequestWithUser, @Param('id') id: string) {
    // return this.postsService.checkLikeForUser(id, request.user.id);
    return this.postsService.getOnePost(id);
  }

  @Get('/user/:id')
  async getPostsByUserId(@Param('id') userId: string) {
    return this.postsService.getPostsByUserId(userId);
  }

  @Post('/like')
  @UseGuards(JwtAuthenticationGuard)
  async likePost(
    @Req() request: RequestWithUser,
    @Body() post: { id: string }
  ) {
    return this.postsService.likePost(post.id, request.user);
  }

  @Post('/unlike')
  @UseGuards(JwtAuthenticationGuard)
  async unlikePost(
    @Req() request: RequestWithUser,
    @Body() post: { id: string }
  ) {
    return this.postsService.unlikePost(post.id, request.user.id);
  }

  @Post('/add-comment')
  @UseGuards(JwtAuthenticationGuard)
  async addComment(
    @Req() request: RequestWithUser,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.postsService.addComment(createCommentDto, request.user);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(
    @Req() request: RequestWithUser,
    @Body() post: CreatePostDto
  ) {
    const user = await this.userService.getById(request.user.id);

    return this.postsService.createPost(post, user);
  }

  @Post(':id/add-file')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/postImages',
      fileFilter: (_request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false
          );
        }

        return callback(null, true);
      },
      limits: {
        fileSize: 1024 ** 2, // 1MB
      },
    })
  )
  async addFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    this.postsService.addFile(id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  // @Put(':id')
  // async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
  //   return this.postsService.updatePost(id, post);
  // }

  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return this.postsService.removePost(id);
  }
}
