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
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @JoinColumn({ name: 'fileIds' })
  @OneToMany(() => LocalFile, (file: LocalFile) => file.id, { nullable: true })
  public files?: LocalFile[];

  @Column('text', { nullable: true, array: true, default: [] })
  public fileIds?: string[];

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  public comments: Comment[];

  @OneToMany(() => Like, (like: Like) => like.post)
  public likes: Like[];

  @Column({ default: 0 })
  public likeCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;
