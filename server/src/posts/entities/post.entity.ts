import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../users/entities/user.entity';
import LocalFile from '../../localFiles/entities/localFile.entity';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

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

  @OneToOne(() => User)
  user: User;
}

export default Post;
