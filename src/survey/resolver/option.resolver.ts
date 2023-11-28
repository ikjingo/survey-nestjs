import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { Option } from '../entities/option.entity'
import { OptionService } from '../service/option.service'
import { CreateOptionInput, UpdateOptionInput } from '../dto/option.input';

@Resolver(() => Option)
export class OptionResolver {
  constructor(private optionService: OptionService) {}

  @Mutation(() => Option)
  async createOption(@Args('createOptionInput') createOptionInput: CreateOptionInput): Promise<Option> {
    return this.optionService.create(createOptionInput);
  }

  @Mutation(() => Option)
  async updateOption(@Args('updateOptionInput') updateOptionInput: UpdateOptionInput): Promise<Option> {
    return this.optionService.update(updateOptionInput);
  }

  @Mutation(() => Boolean)
  async removeOption(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.optionService.remove(id)
  }

  @Query(() => [Option])
  async optionsByQuestion(@Args('questionId', { type: () => ID }) questionId: number): Promise<Option[]> {
    return this.optionService.findByQuestionyId(questionId);
  }
}