import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import chalk from 'chalk';
import { dataSource } from '@/db.config';
import { authChecker } from '@/middlewares/auth.ts';
import { CategoriesResolver } from '@/resolvers/Categories.resolver.ts';
import { AdsResolver } from '@/resolvers/Ads.resolver.ts';
import { TagsResolver } from '@/resolvers/Tags.resolver';
import { UsersResolver } from '@/resolvers/Users.resolver';

const API_PORT = parseInt(process.env.API_PORT ?? '3000', 10);

async function initialize(): Promise<void> {
  // Database connection.
  await dataSource.initialize();

  // Build GraphQL schema.
  const schema = await buildSchema({
    resolvers: [CategoriesResolver, AdsResolver, TagsResolver, UsersResolver],
    validate: true, // enable 'class-validator' integration: automatically validate all input arguments
    authChecker, // register the authorization checker function (💡 set to "null" to temporarily silence auth guards)
  });

  // Create and run GraphQL server.
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: API_PORT },
    // Provide context to share data between resolvers. The `context` function is called for each request. Resolvers can access the context with the `context` object parameter.
    // eslint-disable-next-line  @typescript-eslint/require-await
    context: async ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });
  console.info(chalk.yellow(`GraphQL server ready and running at ${url}...`));
}

// Application initialization.
initialize().catch((err: unknown) => {
  console.error(chalk.red('Failed to initialize the application!'), err);
});
