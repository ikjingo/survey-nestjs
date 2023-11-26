import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Survey } from './entities/survey.entity'
import { CreateSurveyInput, UpdateSurveyInput } from './dto/survey.input'
import { ResourceNotFoundException } from 'src/common/exceptions/resource-not-found.exception'
import { Constants } from 'src/common/constants'

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(Survey)
        private surveyRepository: Repository<Survey>,
    ) {}

    async create(createSurveyInput: CreateSurveyInput): Promise<Survey> {
        const newSurvey = this.surveyRepository.create(createSurveyInput)
        return this.surveyRepository.save(newSurvey)
    }

    async update(updateSurveyInput: UpdateSurveyInput): Promise<Survey> {
        const { id, ...updateData } = updateSurveyInput

        const survey = await this.findOneById(id)
        // 조회한 설문지가 존재하지 않으면, ResourceNotFoundException을 발생
        if (!survey) {
            throw new ResourceNotFoundException(Constants.RESOURCE_SURVEY, id)
        }

        await this.surveyRepository.update(id, updateData)
        survey.title = updateData.title
        survey.description = updateData.description

        return survey
    }
    
    async remove(id: number): Promise<boolean> {
        const result = await this.surveyRepository.delete(id)
        // 삭제하려는 설문지 ID가 존재하지 않으면, ResourceNotFoundException을 발생
        if (result.affected === 0) {
            throw new ResourceNotFoundException(Constants.RESOURCE_SURVEY, id)
        }

        return true
    }

    async findOneById(id: number): Promise<Survey | undefined> {
        return this.surveyRepository.findOne({ where: { id } })
    }

    async findAll(): Promise<Survey[]> {
        return this.surveyRepository.find()
    }
}