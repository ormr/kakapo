import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Like from 'src/likes/entities/like.entity';
import { LikeService } from 'src/likes/services/likes.service';
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
    private likeService: LikeService,
    private localFilesService: LocalFilesService,
  ) { }

  async createPost(post: CreatePostDto, user: User): Promise<Post> {
    return this.postRepository.save({ ...post, author: user });
  }

  async likePost(postId: string, user: User) {
    const results = await this.postRepository.find({
      relations: ['likes'],
      where: {
        id: postId,
        likes: {
          user: {
            id: user.id,
          },
        },
      },
    });

    const isAlreadyLiked = !!results.length;

    if (isAlreadyLiked) {
      throw new HttpException(
        'Post has been already liked',
        HttpStatus.FORBIDDEN
      );
    }

    await this.likeService.put({ post: { id: postId } }, user);

    const post = await this.postRepository.findOne({
      where: {
        id: postId
      }
    })

    await this.postRepository.update({ id: postId }, { likesCount: post.likesCount + 1 });

    return 'Post has been liked'
  }

  async unlikePost(postId: string, userId: string) {
    const results = await this.postRepository.find({
      relations: ['likes'],
      where: {
        id: postId,
        likes: {
          user: {
            id: userId,
          },
        },
      },
    });

    const isNotLiked = !!results.length;

    if (!isNotLiked) {
      throw new HttpException(
        'Post has not been liked',
        HttpStatus.FORBIDDEN
      );
    }

    await this.likeService.remove(postId, userId);
  }


  async getOnePost(id: string) {
    const { likesCount, commentsCount } = await this.getPostMetrics(id);

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
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .getMany();

    const { likesCount, commentsCount } = post as Post & {
      likesCount: number;
      commentsCount: number;
    };

    return { likesCount, commentsCount };
  }

  async getAllPosts(userId: string): Promise<Post[]> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.user', 'user')
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    posts.forEach((post: any) => {
      post.isLiked = false;
      post.likes.forEach((like: any) => {
        if (like.user.id === userId) {
          post.isLiked = true;
        }
      });
    });

    return posts.map((post) => ({
      ...post,
      likes: undefined,
      isLiked: post.likes.some((like) => like.user.id === userId),
    }));
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
