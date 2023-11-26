import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SurveyService } from '../service/survey.service'
import { SurveyResolver } from '../resolver/survey.resolver'
import { Survey } from '../entities/survey.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Survey])],
    providers: [SurveyService, SurveyResolver],
})
export class SurveyModule {}