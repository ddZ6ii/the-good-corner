import sqlite3 from 'sqlite3';
import { resolve } from 'node:path';

const DB_FILENAME = 'the_good_corner.sqlite';
const dbFileUrl = resolve(import.meta.dirname, DB_FILENAME);

export const db = new sqlite3.Database(dbFileUrl);
