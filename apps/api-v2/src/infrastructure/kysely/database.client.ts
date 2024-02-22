// Import generated types from prisma client
import { DB as DatabaseType } from './database.type';
import * as SQLite from 'better-sqlite3';
import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from 'kysely';

const databaseProvider = {
  provide: 'dbClient',
  useFactory: () => {
    const dialect = new SqliteDialect({
      database: new SQLite('./src/infrastructure/prisma/sqlite.db'),
    });
    return new Kysely<DatabaseType>({
      dialect,
      plugins: [new ParseJSONResultsPlugin()],
    });
  },
};

export default databaseProvider;
