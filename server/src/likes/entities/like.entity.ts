import User from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from '../../posts/entities/post.entity';

@Entity()
class Like {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Post, (post: Post) => post.likes)
  public post: Post;

  @OneToOne(() => User)
  public user: User;
}

export default Like;
