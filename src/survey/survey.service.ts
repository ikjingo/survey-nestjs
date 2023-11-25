import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/survey.input';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(Survey)
        private surveyRepository: Repository<Survey>,
    ) {}

    async create(createSurveyInput: CreateSurveyInput): Promise<Survey> {
        const newSurvey = this.surveyRepository.create(createSurveyInput);
        return this.surveyRepository.save(newSurvey);
    }

    async findAll(): Promise<Survey[]> {
        return this.surveyRepository.find();
    }
}