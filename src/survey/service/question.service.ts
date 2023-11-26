import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Question } from '../entities/question.entity'

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) {}

    async findOneById(id: number): Promise<Question | undefined> {
        return this.questionRepository.findOne({ where: { id } })
    }

    async findAll(): Promise<Question[]> {
        return this.questionRepository.find()
    }
}