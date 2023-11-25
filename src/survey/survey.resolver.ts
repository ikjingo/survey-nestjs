import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/survey.input';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Mutation(() => Survey)
  async createSurvey(@Args('createSurveyInput') createSurveyInput: CreateSurveyInput): Promise<Survey> {
    return this.surveyService.create(createSurveyInput);
  }

  @Query(() => [Survey])
  async surveys(): Promise<Survey[]> {
    return this.surveyService.findAll();
  }
}