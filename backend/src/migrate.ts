import fs from 'fs';
import sqlite3 from 'sqlite3';
import { resolve } from 'node:path';
import { dbFileUrl } from './database/db.config.ts';

const dumpFileUrl = resolve(import.meta.dirname, 'database/dump.sql');

const db = new sqlite3.Database(dbFileUrl);

const sql = fs.readFileSync(dumpFileUrl, {
  encoding: 'utf8',
});

// Reset database content from sql dump file.
db.exec(sql, (err) => {
  console.error(err);
});

// Prevent deleting a parent row if there are dependent rows in the child table.
db.run('PRAGMA foreign_keys = ON');
