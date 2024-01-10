import { DB as DatabaseType } from '../@types/database.js';
import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

const dialect = new SqliteDialect({
  database: new SQLite('./prisma/sqlite.db'),
});
// export type DbClientType = infer<typeof DatabaseType>
export const db = new Kysely<DatabaseType>({ dialect });
