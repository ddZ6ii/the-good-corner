import fs from 'fs';
import { db } from './database/db.config.ts';
import { resolve } from 'node:path';

const dumpFileUrl = resolve(import.meta.dirname, 'database/dump.sql');

const sql = fs.readFileSync(dumpFileUrl, {
  encoding: 'utf8',
});
db.exec(sql, (err) => {
  console.error(err);
});
