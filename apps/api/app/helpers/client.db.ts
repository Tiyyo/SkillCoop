import { DB as DatabaseType } from '../@types/database.js';
import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

const sqliteDBPath =
  process.env.NODE_ENV === 'production'
    ? './apps/api/prisma/sqlite.db'
    : './prisma/sqlite.db';

const dialect = new SqliteDialect({
  database: new SQLite(sqliteDBPath),
});

export const db = new Kysely<DatabaseType>({ dialect });
