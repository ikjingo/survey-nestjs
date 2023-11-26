import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { SurveyService } from './survey.service'
import { Survey } from './entities/survey.entity'
import { CreateSurveyInput, UpdateSurveyInput } from './dto/survey.input'

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Mutation(() => Survey)
  async createSurvey(@Args('createSurveyInput') createSurveyInput: CreateSurveyInput): Promise<Survey> {
    return this.surveyService.create(createSurveyInput)
  }

  @Mutation(() => Survey)
  async updateSurvey(@Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,): Promise<Survey> {
    return this.surveyService.update(updateSurveyInput)
  }

  @Mutation(() => Boolean)
  async removeSurvey(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.surveyService.remove(id)
  }

  @Query(() => [Survey])
  async surveys(): Promise<Survey[]> {
    return this.surveyService.findAll()
  }
}