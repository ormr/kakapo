import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const { userId, ...postInput } = createPostInput;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const post = {
      ...postInput,
      user,
    }

    return await this.postRepository.save(post);
  }

  async getOnePost(id: string): Promise<Post> {
    return await this.postRepository.findOne({ where: { id } });
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async removePost(id: string): Promise<string> {
    await this.postRepository.delete({ id });
    return id;
  }

  async updatePost(updatePostInput: UpdatePostInput): Promise<Post> {
    await this.postRepository.update(
      {
        id: updatePostInput.id,
      },
      { ...updatePostInput },
    );
    return await this.getOnePost(updatePostInput.id);
  }
}
