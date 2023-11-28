import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => ID)
  questionId: number;

  @Field(() => ID)
  optionId: number;

  @Field()
  userId: string;
}

@InputType()
export class UpdateAnswerInput {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  optionId: number;
}