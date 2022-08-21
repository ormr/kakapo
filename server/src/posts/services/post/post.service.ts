import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(createPostInput: CreatePostInput): Promise<PostEntity> {
    return await this.postRepository.save({ ...createPostInput });
  }

  async getOnePost(id: string): Promise<PostEntity> {
    return await this.postRepository.findOne({ where: { id } });
  }

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async removePost(id: string): Promise<string> {
    await this.postRepository.delete({ id });
    return id;
  }

  async updatePost(updatePostInput: UpdatePostInput): Promise<PostEntity> {
    await this.postRepository.update({
      id: updatePostInput.id
    }, { ...updatePostInput });
    return await this.getOnePost(updatePostInput.id);
  }
}
