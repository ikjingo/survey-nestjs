import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { CompletedSurvey } from '../entities/completed-survey.entity';
import { CompletedSurveyService } from '../service/completed-survey.service';
import { CreateCompletedSurveyInput } from '../dto/completed-survey.input';

@Resolver(() => CompletedSurvey)
export class CompletedSurveyResolver {
  constructor(private readonly completedSurveyService: CompletedSurveyService) {}

  @Mutation(() => CompletedSurvey)
  async createCompletedSurvey(@Args('createCompletedSurveyInput') createCompletedSurveyInput: CreateCompletedSurveyInput): Promise<CompletedSurvey> {
    return this.completedSurveyService.createCompletedSurvey(createCompletedSurveyInput);
  }

  @Query(() => [CompletedSurvey])
  async completedSurveys(@Args('userId', { type: () => String }) userId: string): Promise<CompletedSurvey[]> {
    return this.completedSurveyService.completedSurveys(userId);
  }
}