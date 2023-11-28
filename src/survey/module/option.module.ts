import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OptionResolver } from '../resolver/option.resolver'
import { OptionService } from '../service/option.service'
import { Option } from '../entities/option.entity'
import { Question } from '../entities/question.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Option, Question])],
    providers: [OptionService, OptionResolver],
})
export class OptionModule {}