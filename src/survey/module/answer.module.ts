import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnswerResolver } from '../resolver/answer.resolver'
import { AnswerService } from '../service/answer.service'
import { Answer } from '../entities/answer.entity'
import { Question } from '../entities/question.entity'
import { Option } from '../entities/option.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Answer, Question, Option])],
    providers: [AnswerService, AnswerResolver],
})
export class AnswerModule {}