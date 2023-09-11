import DatabaseError from "../helpers/errors/database.error"
import NotFoundError from "../helpers/errors/not.found.error"

export class Core {
  tableName: string

  client: any

  constructor(client: any,) {
    this.client = client
  }
  async findAll() {
    try {
      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .execute()

      if (!result) throw new NotFoundError('Not found')

      return result

    } catch (error) {
      throw new DatabaseError(error)
    }

  }
  async findByPk(id: number) {

    try {
      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .where('id', "=", id)
        .execute()

      if (!result) throw new NotFoundError('Not found')

      return result

    } catch (error) {
      throw new DatabaseError(error)
    }
  }
  // this is not a find many but a find one
  async findMany(data: Record<string, number | string | Date>) {

    const key = Object.keys(data)[0].toString()
    const value = Object.values(data)[0]

    try {

      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .where(key, "=", value)
        .execute()

      if (!result) throw new NotFoundError('Not found')

      return result[0]

    } catch (error) {
      throw new DatabaseError(error)
    }
  }
  async create(data: any) {

    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data)
        .execute()

      return result[0].insertId
    } catch (error) {
      throw new DatabaseError(error)
    }

  }
  async update(id: number, data: any) {

    const today = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Paris'
    }).format(new Date())

    data.updatedAt = today

    const result = await this.client
      .updateTable(this.tableName)
      .set({ ...data })
      .where('id', "=", id)
      .executeTakeFirst()

    return !!result.numChangedRows
  }
  async delete(id: number) {

    const result = await this.client
      .deleteFrom(this.tableName)
      .where('id', "=", id)
      .executeTakeFirst()

    return !!result.numDeletedRows
  }
}