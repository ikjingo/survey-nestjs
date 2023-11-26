import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateOptionInput {
  @Field(() => ID)
  questionId: number;

  @Field()
  text: string;

  @Field()
  score: number;
}