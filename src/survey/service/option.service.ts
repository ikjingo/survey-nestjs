import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Option } from '../entities/option.entity'
import { CreateOptionInput, UpdateOptionInput } from '../dto/option.input';
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

    async update(updateOptionInput: UpdateOptionInput): Promise<Option> {
        const { id, ...updateData } = updateOptionInput

        const option = await this.optionRepository.findOne({ where: { id } })
        // 조회한 선택지 존재하지 않으면, ResourceNotFoundException을 발생
        if (!option) {
            throw new ResourceNotFoundException(Constants.RESOURCE_OPTION, id)
        }

        await this.optionRepository.update(id, updateData)
        option.text = updateData.text
        option.score = updateData.score

        return option
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.optionRepository.delete(id)
        // 삭제하려는 선택지 ID가 존재하지 않으면, ResourceNotFoundException을 발생
        if (result.affected === 0) {
            throw new ResourceNotFoundException(Constants.RESOURCE_OPTION, id)
        }
        
        return true
    }

    async findByQuestionyId(questionId: number): Promise<Option[]> {
        return this.optionRepository.find({
          where: { question: { id: questionId} }
        });
    }
}