import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SurveyModule } from './survey/survey.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    SurveyModule,
  ],
})
export class AppModule {}
