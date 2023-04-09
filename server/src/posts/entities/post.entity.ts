import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../../users/entities/user.entity';
import Comment from '../../comments/entities/comment.entity';
import Like from '../../likes/entities/like.entity';
import LocalFile from '../../localFiles/entities/localFile.entity';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public content: string;

  @JoinColumn({ name: 'imageId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public image?: LocalFile;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  public comments: Comment[];

  @OneToMany(() => Like, (like: Like) => like.post)
  public likes: Like[];

  @Column({ nullable: true })
  public imageId?: string;

  @Column({ default: 0 })
  public likesCount: number;

  @Column({ default: 0 })
  public commentsCount: number;

  @Column({ default: false })
  public isLiked: boolean;


  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;
