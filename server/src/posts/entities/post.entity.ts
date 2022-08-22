import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';

@ObjectType()
@Entity('posts')
export class PostEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
};
