import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from '../../posts/entities/post.entity';
import User from '../../users/entities/user.entity';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Post, (post: Post) => post.comments, {
    onDelete: 'CASCADE',
  })
  public post: Post;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Comment;
