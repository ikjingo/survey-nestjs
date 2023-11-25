// hello-world.resolver.ts
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}