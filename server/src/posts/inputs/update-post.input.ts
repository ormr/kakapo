import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  updatedBy: string; 
}