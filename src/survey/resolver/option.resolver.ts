import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { Option } from '../entities/option.entity'
import { OptionService } from '../service/option.service'
import { CreateOptionInput } from '../dto/option.input';

@Resolver(() => Option)
export class OptionResolver {
  constructor(private optionService: OptionService) {}

  @Mutation(() => Option)
  async createOption(@Args('createOptionInput') createOptionInput: CreateOptionInput): Promise<Option> {
    return this.optionService.create(createOptionInput);
  }

  @Query(() => [Option])
  async optionsByQuestion(@Args('questionId', { type: () => ID }) questionId: number): Promise<Option[]> {
    return this.optionService.findByQuestionyId(questionId);
  }
}