import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CompletedSurvey } from '../entities/completed-survey.entity';
import { Survey } from '../entities/survey.entity';
import { Answer } from '../entities/answer.entity';
import { CreateCompletedSurveyInput } from '../dto/completed-survey.input';

@Injectable()
export class CompletedSurveyService {
  constructor(
    @InjectRepository(CompletedSurvey)
    private completedSurveyRepository: Repository<CompletedSurvey>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private dataSource: DataSource,
  ) {}

  async createCompletedSurvey(createCompletedSurveyInput: CreateCompletedSurveyInput): Promise<CompletedSurvey> {
    const { userId, surveyId } = createCompletedSurveyInput;

    return await this.dataSource.transaction(async entityManager  => {
        // 설문지 내용과 답변을 조회합니다.
        const survey = await entityManager.find(Survey, {
            where: { id: surveyId },
            relations: ['questions', 'questions.options']
        })
        const answers = await entityManager.find(Answer, { 
            where: {
                userId: userId,
                survey: { id: surveyId }
            }
        })

        // 사용자의 설문지의 모든 답변을 삭제합니다.
        await entityManager.remove(Answer, answers);

        // 설문지 내용과 답변을 JSON 형식으로 변환합니다.
        const surveyContent = JSON.stringify(survey);
        const userAnswers = JSON.stringify(answers);
        
        // 완료된 설문지를 생성하고 저장합니다.
        const completedSurvey = entityManager.create(CompletedSurvey,{
            userId: userId,
            surveyId: surveyId,
            surveyContent,
            answers: userAnswers
        });
        
        return entityManager.save(CompletedSurvey, completedSurvey);
    });
  }

  async completedSurveys(userId: string): Promise<CompletedSurvey[]> {
    return this.completedSurveyRepository.find({ where: { userId } });
  }
}