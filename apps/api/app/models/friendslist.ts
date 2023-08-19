import DatabaseError from '../helpers/errors/database.error'
import { Core } from './core'

export class Friendlist extends Core {
    tableName: string = "profile_on_profile"

    constructor(client: any) {
        super(client)
    }
    async findAllByPk(id: number) {
        try {
            const friendships = await this.client
                .selectFrom(this.tableName)
                .selectAll()
                .innerJoin("profile", "profile.id", "profile_on_profile.friend_id")
                .where("adder_id", "=", id)
                .where((builder: any) => builder.or([
                    builder("status_name", "=", "confirmed"),
                    builder("status_name", "=", "pending")
                ]))
                .execute()

            return friendships
        } catch (error) {
            throw new DatabaseError(error)
        }

    }
    async sendRequest(adder_id: number, friend_id: number) {
        try {
            const reverseFriendship = await this.client
                .selectFrom(this.tableName)
                .selectAll()
                .where("adder_id", "=", friend_id)
                .where("friend_id", "=", adder_id)
                .execute()


            if (reverseFriendship.length > 0) throw new Error("You can't send a friend request to this user")

            const addPendingFriendship = await this.client
                .insertInto(this.tableName)
                .values({
                    adder_id,
                    friend_id: friend_id,
                    status_name: "pending"
                })
                .execute()

            return !!addPendingFriendship.insertId
        } catch (error) {
            throw new DatabaseError(error)
        }

    }
    async updateStatus({ friend_id, adder_id, status_name }) {
        try {
            await this.client
                .insertInto(this.tableName)
                .values({
                    adder_id: friend_id,
                    friend_id: adder_id,
                    status_name
                })

            const acceptFriendship = await this.client
                .update(this.tableName)
                .set({
                    status_name
                })
                .where("adder_id", "=", adder_id)
                .where("friend_id", "=", friend_id)
                .execute()

            return !!acceptFriendship.affectedRows
        } catch (error) {
            throw new DatabaseError(error)
        }
    }
    async declineRequest(friend_id: number, adder_id: number) {
        try {
            const declineFriendship = await this.client
                .update(this.tableName)
                .set({
                    status_name: "declined"
                })
                .where("adder_id", "=", adder_id)
                .where("friend_id", "=", friend_id)
                .execute()

            const declinedReversedFriendship = await this.client
                .insertInto(this.tableName)
                .values({
                    adder_id: friend_id,
                    friend_id: adder_id,
                    status_name: "declined"
                })
                .execute()

            return !!declineFriendship.affectedRows
        } catch (error) {
            throw new DatabaseError(error)
        }
    }
    async findPendingRequests(id: number) {
        try {
            const pendingRequests = await this.client
                .selectFrom(this.tableName)
                .selectAll()
                .innerJoin("profile", "profile.id", "profile_on_profile.adder_id")
                .where("friend_id", "=", id)
                .where("status_name", "=", "pending")
                .execute()

            return pendingRequests
        } catch (error) {

        }
    }

}