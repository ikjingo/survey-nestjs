import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Option } from '../entities/Option.entity'
import { CreateOptionInput } from '../dto/option.input';
import { Question } from '../entities/question.entity';
import { ResourceNotFoundException } from 'src/common/exceptions/resource-not-found.exception';
import { Constants } from 'src/common/constants';

@Injectable()
export class OptionService {
    constructor(
        @InjectRepository(Option)
        private optionRepository: Repository<Option>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) {}

    async create(createOptionInput: CreateOptionInput): Promise<Option> {
        const { questionId, ...optionData } = createOptionInput;

        // questionId 유효성 검사
        const question = await this.questionRepository.findOne({ where: { id: questionId } });
        if (!question) {
            throw new ResourceNotFoundException(Constants.RESOURCE_QUESTION, questionId)
        }

        const option = this.optionRepository.create({
            ...optionData,
            question,
            });

        return this.optionRepository.save(option);
    }

    async findByQuestionyId(questionId: number): Promise<Option[]> {
        return this.optionRepository.find({
          where: { question: { id: questionId} }
        });
    }
}