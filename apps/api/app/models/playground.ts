import { Core } from './core.js';
import { tableNames } from '../@types/types.js';
import { sql } from 'kysely';
import { db } from '../helpers/client.db.js';
import DatabaseError from '../helpers/errors/database.error.js';

export class Playground extends Core<typeof tableNames.playground> {
  tableName: typeof tableNames.playground;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.playground;
  }
  async search(query: string) {
    try {
      const result = await sql`
        SELECT 
          id, 
          name, 
          city
        FROM playground
        WHERE name LIKE ${`%${query}%`}
        OR city LIKE ${`%${query}%`}
        LIMIT 5
        `.execute(this.client);
      return result.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
}
