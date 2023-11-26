import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}