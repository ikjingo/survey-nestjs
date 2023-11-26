import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class CreateQuestionInput {
  @Field(() => ID)
  surveyId: number;

  @Field()
  text: string;

  @Field() 
  order: number;
}