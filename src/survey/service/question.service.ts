import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Question } from '../entities/question.entity'
import { CreateQuestionInput } from '../dto/question.input';
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

    async findBySurveyId(surveyId: number): Promise<Question[]> {
        return this.questionRepository.find({
            where: { survey: { id: surveyId } },
            relations: ['options']
          });
    }
}