import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { Question } from '../entities/question.entity'
import { QuestionService } from '../service/question.service'

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query(() => [Question])
  async questions(): Promise<Question[]> {
    return this.questionService.findAll()
  }
}