import DatabaseError from '../helpers/errors/database.error'
import { Core } from './core'

export class User extends Core {
  tableName: string = 'user'

  constructor(client: any) {
    super(client)
  }
  async create(data: any) {

    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data)
        .returning(['id', 'email'])
        .execute()

      return result[0]
    } catch (error) {
      throw new DatabaseError(error)
    }

  }
}
