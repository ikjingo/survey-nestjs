import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Survey } from './survey.entity';

@ObjectType()
@Entity() 
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID) 
  id: number;

  @Column() 
  @Field()
  text: string;

  @Column()
  @Field() 
  order: number;

  @ManyToOne(() => Survey, survey => survey.questions)
  survey: Survey;

  // @OneToMany(() => Option, option => option.question) 
  // options: Option[];
}
