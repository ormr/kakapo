import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column(() => User)
  author: User;
}
