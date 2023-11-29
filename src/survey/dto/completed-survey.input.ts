import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class CreateCompletedSurveyInput {
  @Field()
  userId: string;

  @Field(() => ID)
  surveyId: number;
}