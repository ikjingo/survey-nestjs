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

@InputType()
export class UpdateQuestionInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  order?: number;
}