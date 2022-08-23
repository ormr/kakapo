import { Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { PostService } from 'src/posts/services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getOnePost(@Param('id') id: string) {
    return this.postsService.getOnePost(id);
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
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
