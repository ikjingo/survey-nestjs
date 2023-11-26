import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { SurveyModule } from './survey/module/survey.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as ormconfig from '../ormconfig'
import { QuestionModule } from './survey/module/question.module'
import { OptionModule } from './survey/module/option.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      // includeStacktraceInErrorResponses: false,
      formatError: (error) => {
        console.error("--- GraphQL Error ---")
        console.error("Path:", error.path)
        console.error("Message:", error.message)
        console.error(error.extensions)
        return error
      }
    }),
    SurveyModule,
    QuestionModule,
    OptionModule,
  ],
})
export class AppModule {}
