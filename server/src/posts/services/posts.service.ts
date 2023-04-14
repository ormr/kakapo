import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import CommentsService from 'src/comments/services/comments.service';
import { LikeService } from 'src/likes/services/likes.service';
import { LocalFileDto } from 'src/localFiles/dto/localFile.dto';
import LocalFilesService from 'src/localFiles/services/localFiles.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import Post from 'src/posts/entities/post.entity';
import User from 'src/users/entities/user.entity';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';

@Injectable()
class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private likeService: LikeService,
    private commentsService: CommentsService,
    private localFilesService: LocalFilesService
  ) {}

  async createPost(post: CreatePostDto, user: User): Promise<Post> {
    return this.postRepository.save({ ...post, author: user });
  }

  async likePost(postId: number, user: User) {
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

    const { likesCount } = await this.getPostMetrics(postId);

    await this.likeService.put({ post: { id: postId } }, user);
    await this.postRepository.update(
      { id: postId },
      { likeCount: likesCount + 1 }
    );

    return 'Post has been liked';
  }

  async unlikePost(postId: number, userId: string) {
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
      throw new HttpException('Post has not been liked', HttpStatus.FORBIDDEN);
    }

    const { likesCount } = await this.getPostMetrics(postId);

    await this.likeService.remove(postId, userId);

    await this.postRepository.update(
      { id: postId },
      { likeCount: likesCount - 1 }
    );

    return await this.getOnePost(postId);
  }

  async getOnePost(id: number) {
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

  async getPostMetrics(postId: number) {
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

  async getPosts(
    offset?: number,
    limit?: number,
    startId?: number,
    options?: FindManyOptions<Post>
  ) {
    // return this.postRepository
    //   .createQueryBuilder('post')
    //   .leftJoinAndSelect('post.author', 'author')
    //   .loadRelationCountAndMap('post.commentsCount', 'post.comments')
    //   .loadRelationCountAndMap('post.likesCount', 'post.likes')
    //   .getMany();

    const where: FindManyOptions<Post>['where'] = {};
    let separateCount = 0;

    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.postRepository.count();
    }

    const [items, count] = await this.postRepository.findAndCount({
      where: {
        ...where,
        ...options?.where,
      },
      relations: ['author'],
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      ...options,
    });

    return {
      items,
      count: startId ? separateCount : count,
    };
  }

  async removePost(id: number): Promise<number> {
    await this.postRepository.delete({ id });
    return id;
  }

  async updatePost(id: number, updatePostInput: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(
      {
        id,
      },
      { ...updatePostInput }
    );

    return this.getOnePost(updatePostInput.id);
  }

  async addFile(postId: number, fileData: LocalFileDto) {
    const file = await this.localFilesService.saveLocalFileData(fileData);

    const post = await this.postRepository.findOne({ where: { id: postId } });

    await this.postRepository.update(postId, {
      fileIds: [...post.fileIds, file.id],
    });
  }

  async addComment(commentDto: CreateCommentDto, author: User) {
    try {
      const comment = await this.commentsService.createComment(
        commentDto,
        author
      );

      if (!comment) {
        throw new HttpException('Comment did not created', HttpStatus.CONFLICT);
      }

      const post = await this.getOnePost(commentDto.post.id);

      return post;
    } catch (error) {
      throw new HttpException('Comment did not created', HttpStatus.CONFLICT);
    }
  }
}

export default PostService;
