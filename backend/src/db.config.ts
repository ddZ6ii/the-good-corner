import { resolve } from 'node:path';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV ?? 'development';
const isDevMode = env.toLowerCase() === 'development';
const entitiesUrl = resolve(import.meta.dirname, 'schemas/entities/*.ts');

/** Database connection options.
 *
 * Use environment variables to avoid hardcoding sensitive information.
 *
 * HOST
 * ----
 * An environment variable is used to enable both local development and Docker Compose integration.
 * `localhost` is used by default for local development (without Docker for the backend container, ⚠️ but still needs the `db` container to run!), and is overriden by the service name "db" (via the `environment` attribute in the config .yml file) when using Docker Compose.
 * Using Docker service name (automatic DNS resolution) instead of an IP address is a feature of Docker Compose, which automatically creates a Docker network encompassing all the specified services. This network allows services to communicate with each other using their service names.
 */
export const postgresConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

export const dataSource = new DataSource({
  type: 'postgres',
  ...postgresConfig,
  entities: [entitiesUrl],
  // Dev mode only: do not use in production.
  ...(isDevMode && { synchronize: true, logging: true }),
});
