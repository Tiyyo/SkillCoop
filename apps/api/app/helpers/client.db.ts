import { DB as DatabaseType } from "../@types/database";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import logger from "./logger";


logger.info('DATABASE_URL:' + process.env.DATABASE_URL + ' - ' + '../../../sqlite.db')
console.log(process.cwd())
const dialect = new SqliteDialect(
  { database: new SQLite("./prisma/sqlite.db") }
);

export const db = new Kysely<DatabaseType>({ dialect });