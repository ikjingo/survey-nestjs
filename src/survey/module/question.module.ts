import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionResolver } from '../resolver/question.resolver'
import { QuestionService } from '../service/question.service'
import { Question } from '../entities/question.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    providers: [QuestionService, QuestionResolver],
})
export class QuestionModule {}