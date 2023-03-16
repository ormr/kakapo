import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalFileDto } from 'src/localFiles/dto/localFile.dto';
import LocalFilesService from 'src/localFiles/services/localFiles.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import Post from 'src/posts/entities/post.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private localFilesService: LocalFilesService
  ) {}

  async createPost(post: CreatePostDto, user: User): Promise<Post> {
    return this.postRepository.save({ ...post, author: user });
  }

  async getOnePost(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['author'] });
  }

  async getPostsByUserId(id: string): Promise<Post[]> {
    return this.postRepository.find({
      where: {
        author: {
          id,
        },
      },
    });
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
      { ...updatePostInput }
    );

    return this.getOnePost(updatePostInput.id);
  }

  async addImage(userId: string, fileData: LocalFileDto) {
    const image = await this.localFilesService.saveLocalFileData(fileData);
    await this.postRepository.update(userId, {
      imageId: image.id,
    });
  }
}
