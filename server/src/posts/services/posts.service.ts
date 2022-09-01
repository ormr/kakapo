import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

  async createPost(post: CreatePostDto, user: User): Promise<Post> {
    const newPost = {
      ...post,
      user,
    };

    return await this.postRepository.save(newPost);
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

  async updatePost(id: string, updatePostInput: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(
      {
        id,
      },
      { ...updatePostInput },
    );

    return await this.getOnePost(updatePostInput.id);
  }
}
