import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { Survey } from './survey.entity';

@ObjectType()
@Entity() 
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID) 
  id: number;

  @OneToOne(() => Survey, survey => survey.questions)
  @Field(() => [Survey])
  survey: Survey;

  @Column() 
  @Field()
  text: string;

  @Column()
  @Field() 
  order: number;

  // @OneToMany(() => Option, option => option.question) 
  // options: Option[];
}
