import { Core } from './core'

export class ProfileOnEvent extends Core {
  tableName: string = 'profile_on_event';

  constructor(client) {
    super(client)
  }

  async updateStatus(data: { event_id: number, profile_id: number, status_name: 'confirmed' | 'declined', updatedAt: undefined | string }) {

    const today = new Intl.DateTimeFormat('en-Us', {
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
      .where('event_id', "=", data.event_id)
      .where('profile_id', "=", data.profile_id)
      .executeTakeFirst()

    return !!result.numChangedRows
  }
}