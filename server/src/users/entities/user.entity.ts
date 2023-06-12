import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import LocalFile from '../../localFiles/entities/localFile.entity';
import Post from '../../posts/entities/post.entity';
import Like from '../../likes/entities/like.entity';
import Comment from '../../comments/entities/comment.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public avatar?: LocalFile;

  @Column({ nullable: true })
  public avatarId?: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts?: Post[];

  @OneToMany(() => Like, (like: Like) => like.user)
  likes?: Like[];

  @OneToMany(() => Comment, (comment: Comment) => comment.author)
  comments?: Comment[];
}

export default User;
