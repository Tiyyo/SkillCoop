import getDateUTC from '../utils/get-date-utc';
import { Core } from './core'

export class ProfileOnEvent extends Core {
  tableName: string = 'profile_on_event';

  constructor(client) {
    super(client)
  }

  async updateStatus(data: { event_id: number, profile_id: number, status_name: 'confirmed' | 'declined', updated_at: undefined | string }) {
    const today = new Date()
    const utctoday = getDateUTC(today)
    data.updated_at = utctoday

    const result = await this.client
      .updateTable(this.tableName)
      .set({ ...data })
      .where('event_id', "=", data.event_id)
      .where('profile_id', "=", data.profile_id)
      .executeTakeFirst()

    return !!result.numChangedRows
  }
}