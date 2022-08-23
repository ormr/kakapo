import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { PostService } from 'src/posts/services/post/post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(() => Post)
  async createPost(
    @Args('createPost') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return await this.postService.createPost(createPostInput);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('updatePost') updatePostInput: UpdatePostInput,): Promise<Post> {
    return await this.postService.updatePost(updatePostInput);
  }

  @Mutation(() => String)
  async removePost(
    @Args('id') id: string
  ): Promise<string> {
    return await this.postService.removePost(id);
  }

  @Query(() => Post)
  async getOnePost(@Args('id') id: string): Promise<Post> {
    return await this.postService.getOnePost(id);
  }

  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    return await this.postService.getAllPosts();
  }
}
