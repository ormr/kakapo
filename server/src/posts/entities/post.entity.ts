import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../../users/entities/user.entity';
import LocalFile from '../../localFiles/entities/localFile.entity';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @JoinColumn({ name: 'imageId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public image?: LocalFile

  @Column({ nullable: true })
  public imageId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;
