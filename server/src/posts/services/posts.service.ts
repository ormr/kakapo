import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalFileDto } from 'src/localFiles/dto/localFile.dto';
import LocalFilesService from 'src/localFiles/services/localFiles.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import Post from 'src/posts/entities/post.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

type WithMetrics = {
  likesCount: number;
  commentsCount: number;
};

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

  async getOnePost(id: string) {
    const { likesCount, commentsCount, isLikedByCurrentUser } =
      await this.getPostMetrics(id);
    const post = await this.postRepository.findOne({
      where: { id },
      relations: {
        comments: {
          author: true,
        },
        likes: {
          user: true,
        },
        author: true,
      },
      select: {
        comments: {
          id: true,
          content: true,
          author: {
            id: true,
            avatarId: true,
            name: true,
          },
        },
        likes: {
          id: true,
          user: {
            id: true,
          },
        },
        author: {
          id: true,
          name: true,
          avatarId: true,
        },
      },
    });

    return {
      ...post,
      likesCount,
      commentsCount,
    };
  }

  async getPostMetrics(postId: string) {
    const [post] = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: postId })
      .innerJoinAndSelect('post.isLiked', 'likes', 'like.userId = :userId')
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .getMany();

    const { likesCount, commentsCount } = post as Post & {
      likesCount: number;
      commentsCount: number;
    };

    return { likesCount, commentsCount, isLiked };
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .getMany();
  }

  async getPostsByUserId(id: string): Promise<Post[]> {
    return this.postRepository.find({
      where: {
        author: {
          id,
        },
      },
      relations: ['author'],
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
