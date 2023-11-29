import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Question } from '../entities/question.entity'
import { CreateQuestionInput, UpdateQuestionInput } from '../dto/question.input';
import { Survey } from '../entities/survey.entity';
import { ResourceNotFoundException } from 'src/common/exceptions/resource-not-found.exception';
import { Constants } from 'src/common/constants';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Survey)
        private surveyRepository: Repository<Survey>,
    ) {}

    async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
        const { surveyId, ...questionData } = createQuestionInput;

        // surveyId 유효성 검사
        const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
        if (!survey) {
            throw new ResourceNotFoundException(Constants.RESOURCE_SURVEY, surveyId)
        }

        const question = this.questionRepository.create({
            ...questionData,
            survey,
            });

        return this.questionRepository.save(question);
    }

    async update(updateQuestionInput: UpdateQuestionInput): Promise<Question> {
        const { id, ...updateData } = updateQuestionInput

        const question = await this.questionRepository.findOne({ where: { id } })
        // 조회한 문항 존재하지 않으면, ResourceNotFoundException을 발생
        if (!question) {
            throw new ResourceNotFoundException(Constants.RESOURCE_QUESTION, id)
        }

        await this.questionRepository.update(id, updateData)
        question.text = updateData.text
        question.order = updateData.order

        return question
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.questionRepository.delete(id)
        // 삭제하려는 문항 ID가 존재하지 않으면, ResourceNotFoundException을 발생
        if (result.affected === 0) {
            throw new ResourceNotFoundException(Constants.RESOURCE_QUESTION, id)
        }

        return true
    }

    async findBySurveyId(surveyId: number): Promise<Question[]> {
        return this.questionRepository.find({
            where: { survey: { id: surveyId } },
            relations: ['options']
          });
    }
}