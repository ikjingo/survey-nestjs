import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompletedSurveyService } from '../service/completed-survey.service'
import { CompletedSurveyResolver } from '../resolver/completed-survey.resolver'
import { CompletedSurvey } from '../entities/completed-survey.entity'
import { Answer } from '../entities/answer.entity'
import { Survey } from '../entities/survey.entity'

@Module({
    imports: [TypeOrmModule.forFeature([CompletedSurvey, Survey, Answer])],
    providers: [CompletedSurveyService, CompletedSurveyResolver],
})
export class CompletedSurveyModule {}