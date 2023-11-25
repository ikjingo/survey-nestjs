import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput, UpdateSurveyInput } from './dto/survey.input';

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

    async update(updateSurveyInput: UpdateSurveyInput): Promise<Survey> {
        const { id, ...updateData } = updateSurveyInput;
        await this.surveyRepository.update(id, updateData);
        return this.surveyRepository.findOne({ where: { id } });
      }
    
      async remove(id: number): Promise<boolean> {
        const result = await this.surveyRepository.delete(id);
        return result.affected > 0;
      }

    async findAll(): Promise<Survey[]> {
        return this.surveyRepository.find();
    }
}