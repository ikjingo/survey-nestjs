import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CompletedSurvey {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field() 
  userId: string;

  @Column()
  surveyId: number;

  @Column('jsonb')
  @Field(() => String)
  answers: string; // JSON 형식으로 저장

  @Column('jsonb')
  @Field(() => String)
  surveyContent: string; // 완료 시점의 설문지 내용을 JSON 형식으로 저장
}