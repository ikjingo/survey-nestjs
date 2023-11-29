import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { AnswerService } from '../service/answer.service'
import { CreateAnswerInput, UpdateAnswerInput } from '../dto/answer.input';
import { Answer } from '../entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Mutation(() => Answer)
  async createAnswer(@Args('createAnswerInput') createAnswerInput: CreateAnswerInput): Promise<Answer> {
    return this.answerService.createOrUpdateAnswer(createAnswerInput);
  }

  @Mutation(() => Answer)
  async updateAnswer(@Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput): Promise<Answer> {
    return this.answerService.update(updateAnswerInput);
  }

  @Mutation(() => Boolean)
  async removeAnswer(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.answerService.remove(id)
  }

  @Query(() => [Answer])
  async answers(
    @Args('userId', { type: () => String }) userId: string,
    @Args('surveyId', { type: () => ID }) surveyId: number,
    @Args('questionId', { type: () => ID, nullable: true }) questionId?: number
  ): Promise<Answer[]> {
    if (surveyId && questionId) {
      // surveyId와 questionId 둘 다 제공된 경우
      return this.answerService.findByUserIdAndQuestionId(userId, questionId);
    }
    // surveyId만 제공된 경우
    return this.answerService.findAllAnswersBySurveyId(userId, surveyId);
  }
}