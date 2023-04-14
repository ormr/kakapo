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
  Query,
  Put,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { RequestWithUser } from 'src/authentication/interfaces/requestWithUser.interface';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import LocalFilesInterceptor from 'src/localFiles/mixins/localFiles.interceptor';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import PostService from 'src/posts/services/posts.service';
import { UsersService } from 'src/users/services/users.service';
import { PaginationParams } from 'src/utils/types/paginationParams';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostService,
    private readonly userService: UsersService
  ) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getPosts(
    @Req() request: RequestWithUser,
    @Query() { offset, limit, startId }: PaginationParams
  ) {
    return this.postsService.getPosts(
      offset,
      limit,
      startId,
      {},
      request.user.id
    );
  }

  @Get('/user/:id')
  async getPostsByUserId(
    @Param('id') userId: string,
    @Query() { offset, limit, startId }: PaginationParams
  ) {
    return this.postsService.getPosts(offset, limit, startId, {}, userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  async getOnePost(@Req() _request: RequestWithUser, @Param('id') id: number) {
    return this.postsService.getOnePost(id);
  }

  @Post('/like')
  @UseGuards(JwtAuthenticationGuard)
  async likePost(
    @Req() request: RequestWithUser,
    @Body() body: { postId: number }
  ) {
    return this.postsService.likePost(body.postId, request.user);
  }

  @Post('/unlike')
  @UseGuards(JwtAuthenticationGuard)
  async unlikePost(
    @Req() request: RequestWithUser,
    @Body() post: { id: number }
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
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    this.postsService.addFile(id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  async removePost(@Param('id') id: number) {
    return this.postsService.removePost(id);
  }
}
