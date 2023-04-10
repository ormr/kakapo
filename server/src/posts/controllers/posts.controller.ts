import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { RequestWithUser } from 'src/authentication/interfaces/requestWithUser.interface';
import LocalFilesInterceptor from 'src/localFiles/mixins/localFiles.interceptor';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { PostService } from 'src/posts/services/posts.service';
import { UsersService } from 'src/users/services/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostService,
    private readonly userService: UsersService
  ) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getAllPosts(@Req() request: RequestWithUser) {
    return this.postsService.getAllPosts(request.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  async getOnePost(@Req() request: RequestWithUser, @Param('id') id: string) {
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
    @Body() body: { postId: string }
  ) {
    return this.postsService.likePost(body.postId, request.user);
  }

  @Post('/unlike')
  @UseGuards(JwtAuthenticationGuard)
  async unlikePost(
    @Req() request: RequestWithUser,
    @Body() post: { id: string }
  ) {
    return this.postsService.unlikePost(post.id, request.user.id);
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

  @Post(':id')
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
  /*
   * TODO:
   * Дoбавить возможность загрузки нескольких фотографий
   * */
  @Post('image')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/posts',
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
    this.postsService.addImage(id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return this.postsService.removePost(id);
  }
}
