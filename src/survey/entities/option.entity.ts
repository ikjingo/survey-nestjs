import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Question } from './question.entity';

@ObjectType()
@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  @Field(() => ID) 
  id: number;

  @Column()
  @Field()
  text: string;

  @Column()
  @Field()
  score: number;

  @ManyToOne(() => Question, question => question.options)
  question: Question;
}