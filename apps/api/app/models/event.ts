import { Core } from './core'

export class Event extends Core {
    tableName: string = 'event'

    constructor(client: any) {
        super(client)
    }
}

