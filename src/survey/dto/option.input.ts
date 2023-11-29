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

@InputType()
export class UpdateOptionInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  score?: number;
}