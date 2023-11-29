import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Question } from './question.entity'

@ObjectType()
@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  title: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string

  @OneToMany(() => Question, question => question.survey)
  questions: Question[];
}