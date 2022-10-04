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
  ) { }

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getOnePost(@Param('id') id: string) {
    return this.postsService.getOnePost(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto) {
    const { userId, ...postInput } = post;
    const user = await this.userService.getById(userId);

    return this.postsService.createPost(postInput, user);
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
  async addImage(
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
