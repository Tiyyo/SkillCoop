// Import generated types from prisma client
import { DB as DatabaseType } from './database.type';
import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

const mockDatabaseProvider = {
  provide: 'dbClient',
  useFactory: () => {
    const dialect = new SqliteDialect({
      database: new SQLite('./src/infrastructure/prisma/test.db'),
    });
    return new Kysely<DatabaseType>({
      dialect,
    });
  },
};

export default mockDatabaseProvider;
