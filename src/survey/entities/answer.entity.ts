import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Index } from 'typeorm'
import { Question } from './question.entity';
import { Option } from './option.entity';
import { Survey } from './survey.entity';

@ObjectType()
@Entity()
@Index(['userId', 'question', 'option'], { unique: true })
export class Answer {
  @PrimaryGeneratedColumn()
  @Field(() => ID) 
  id: number;

  @Column()
  @Field() 
  userId: string;

  @ManyToOne(() => Survey)
  survey: Survey;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column()
  questionId: number;

  @ManyToOne(() => Option)
  @Field()
  option: Option;
}