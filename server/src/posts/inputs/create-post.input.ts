import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  userId: string;
  // TODO: Создать связь с User
  // createdBy: User

  // TODO: Создать связь с Comments
  // comments: [Comment]
}
