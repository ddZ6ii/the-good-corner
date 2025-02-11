import chalk from 'chalk'
import fs from 'fs'
import { resolve } from 'node:path'
import pg from 'pg'
import { postgresConfig } from '@/db.config'

const pgConfig = {
  ...postgresConfig,
  user: postgresConfig.username,
}
delete pgConfig.username

const dumpFileUrl = resolve(import.meta.dirname, 'dump.sql')
const sql = fs.readFileSync(dumpFileUrl, {
  encoding: 'utf8',
})

async function migrate(): Promise<void> {
  const client = new pg.Client({ ...pgConfig })
  await client.connect()
  await client.query(sql)
  await client.end()
}

migrate()
  .then(() => {
    console.info(
      chalk.green('Successfully migrated database from SQL dump file!'),
    )
  })
  .catch((err: unknown) => {
    console.error(
      chalk.red('Failed to migrate database from SQL dump file!'),
      err,
    )
  })
