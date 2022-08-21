import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { PostService } from 'src/posts/services/post/post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostEntity)
  async createPost(
    @Args('createPost') createPostInput: CreatePostInput,
  ): Promise<PostEntity> {
    return await this.postService.createPost(createPostInput);
  }

  @Mutation(() => PostEntity)
  async updatePost(
    @Args('updatePost') updatePostInput: UpdatePostInput,): Promise<PostEntity> {
    return await this.postService.updatePost(updatePostInput);
  }

  @Mutation(() => String)
  async removePost(
    @Args('id') id: string
  ): Promise<string> {
    return await this.postService.removePost(id);
  }

  @Query(() => PostEntity)
  async getOnePost(@Args('id') id: string): Promise<PostEntity> {
    return await this.postService.getOnePost(id);
  }

  @Query(() => [PostEntity])
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postService.getAllPosts();
  }
}
