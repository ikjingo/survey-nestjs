import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async createCompletedSurvey(createCompletedSurveyInput: CreateCompletedSurveyInput): Promise<CompletedSurvey> {
    const { userId, surveyId } = createCompletedSurveyInput;

    // 설문지 내용과 답변을 조회합니다.
    const survey = await this.surveyRepository.find({
        where: { id: surveyId },
        relations: ['questions', 'questions.options']
    });
    const answers = await this.answerRepository.find({ 
        where: {
            userId: userId,
            survey: { id: surveyId }
        }
    });

    // 설문지 내용과 답변을 JSON 형식으로 변환합니다.
    const surveyContent = JSON.stringify(survey);
    const userAnswers = JSON.stringify(answers);

    // 완료된 설문지를 생성하고 저장합니다.
    const completedSurvey = this.completedSurveyRepository.create({
        userId: userId,
        survey: { id: surveyId },
        surveyContent,
        answers: userAnswers
    });
    return this.completedSurveyRepository.save(completedSurvey);
  }
}