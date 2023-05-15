import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from '../../posts/entities/post.entity';
import User from '../../users/entities/user.entity';

@Entity()
class Like {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Post, (post: Post) => post.likes)
  public post: Post;

  @ManyToOne(() => User, (user: User) => user.likes, {
    eager: true,
  })
  @JoinColumn()
  public user: User;
}

export default Like;
