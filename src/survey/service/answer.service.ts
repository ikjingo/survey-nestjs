import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Answer } from '../entities/answer.entity'
import { CreateAnswerInput, UpdateAnswerInput } from '../dto/answer.input';
import { ResourceNotFoundException } from 'src/common/exceptions/resource-not-found.exception';
import { Constants } from 'src/common/constants';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { InvalidAnswerException } from 'src/common/exceptions/invalid-answer.exception';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Option)
        private optionRepository: Repository<Option>,
    ) {}

    async createOrUpdateAnswer(createAnswerInput: CreateAnswerInput): Promise<Answer> {
        const { questionId, optionId, userId, ...answerData } = createAnswerInput;
      
        // questionId 유효성 검사 및 survey 가져오기
        const question = await this.questionRepository.findOne({ 
          where: { id: questionId },
          relations: ['survey'] 
        });
        if (!question) {
            throw new ResourceNotFoundException(Constants.RESOURCE_QUESTION, questionId);
        }

        // optionId 유효성 검사
        const option = await this.optionRepository.findOne({ 
            where: { id: optionId }, 
            relations: ['question']
          });
        if (!option) {
            throw new ResourceNotFoundException(Constants.RESOURCE_OPTION, optionId);
        }
        if (option.question.id != questionId) {
            throw new InvalidAnswerException(optionId, questionId);
        }
      
        // 기존 답변 찾기
        let answer = await this.answerRepository.findOne({ 
          where: { userId, questionId }
        });
      
        // 기존 답변 업데이트 또는 새로운 답변 생성
        if (answer) {
          // 답변 업데이트
          answer.option = option;
        } else {
          // 새 답변 생성
          answer = this.answerRepository.create({
            ...answerData,
            userId,
            question,
            option,
            survey: question.survey,
          });
        }
      
        return this.answerRepository.save(answer);
      }

    async create(createAnswerInput: CreateAnswerInput): Promise<Answer> {
        const { questionId, optionId, ...answerData } = createAnswerInput;

        // optionId 유효성 검사
        const option = await this.optionRepository.findOne({ where: { id: optionId }, relations: ['question'] });
        if (!option) {
            throw new ResourceNotFoundException(Constants.RESOURCE_OPTION, optionId)
        }
        // option.questionId와 questionId 일치하지 않으면, InvalidAnswerException을 발생
        if (option.question.id != questionId) {
            throw new InvalidAnswerException(optionId, questionId);
        }

        // questionId 유효성 검사
        const question = await this.questionRepository.findOne({ where: { id: questionId }, relations: ['survey'] });
        if (!question) {
            throw new ResourceNotFoundException(Constants.RESOURCE_QUESTION, questionId)
        }
        
        const answer = this.answerRepository.create({
            ...answerData,
            question,
            option,
            survey: question.survey,
        });

        return this.answerRepository.save(answer);
    }

    async update(updateAnswerInput: UpdateAnswerInput): Promise<Answer> {
        const { id, optionId } = updateAnswerInput

        const answer = await this.answerRepository.findOne({ where: { id } })
        // 조회한 답변 존재하지 않으면, ResourceNotFoundException을 발생
        if (!answer) {
            throw new ResourceNotFoundException(Constants.RESOURCE_ANSWER, id)
        }

        // optionId 유효성 검사
        const option = await this.optionRepository.findOne({ where: { id: optionId }, relations: ['question'] });
        if (!option) {
            throw new ResourceNotFoundException(Constants.RESOURCE_OPTION, optionId)
        }
        // option.question.id와 questionId 일치하지 않으면, InvalidAnswerException을 발생
        if (option.question.id != answer.questionId) {
            throw new InvalidAnswerException(optionId, answer.questionId);
        }
        
        answer.option = option;

        return this.answerRepository.save(answer);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.answerRepository.delete(id)
        // 삭제하려는 답변 ID가 존재하지 않으면, ResourceNotFoundException을 발생
        if (result.affected === 0) {
            throw new ResourceNotFoundException(Constants.RESOURCE_ANSWER, id)
        }
        
        return true
    }

    async findByUserIdAndQuestionId(userId: string, questionId: number): Promise<Answer[]> {
        return this.answerRepository.find({
          where: {
            userId: userId,
            question: { id: questionId }
          },
          relations: ['option'],
        });
    }

    async findAllAnswersBySurveyId(userId: string, surveyId: number): Promise<Answer[]> {
        return this.answerRepository.find({
            where: {
              userId: userId,
              survey: { id: surveyId }
            },
            relations: ['option'],
          });
    }
}