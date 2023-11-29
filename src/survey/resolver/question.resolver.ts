import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { Question } from '../entities/question.entity'
import { QuestionService } from '../service/question.service'
import { CreateQuestionInput, UpdateQuestionInput } from '../dto/question.input'

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Mutation(() => Question)
  async createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionInput): Promise<Question> {
    return this.questionService.create(createQuestionInput)
  }

  @Mutation(() => Question)
  async updateQuestion(@Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput): Promise<Question> {
    return this.questionService.update(updateQuestionInput);
  }

  @Mutation(() => Boolean)
  async removeQuestion(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.questionService.remove(id)
  }

  @Query(() => [Question])
  async questionsBySurvey(@Args('surveyId', { type: () => ID }) surveyId: number): Promise<Question[]> {
    return this.questionService.findBySurveyId(surveyId);
  }
}