import { DataSource } from 'typeorm';
import { resolve } from 'node:path';

const entitiesUrl = resolve(import.meta.dirname, 'entities/*.ts');
const DB_FILENAME = 'the_good_corner.sqlite';

export const dbFileUrl = resolve(
  import.meta.dirname,
  '..',
  'database',
  DB_FILENAME,
);

export const dataSource = new DataSource({
  type: 'sqlite',
  database: dbFileUrl,
  entities: [entitiesUrl],
  // Dev mode only: do not use in production.
  synchronize: true,
  logging: true,
});
