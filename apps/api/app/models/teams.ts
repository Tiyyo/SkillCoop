import { db } from '../helpers/client.db'
import { profile as Profile } from '../models/index'


// TODO refactor and make smaller function 

const getCompleteEventInfos = async (event_id: number) => {


  // need to regenerate database type with the good field name
  const result = await db
    .selectFrom("event")
    .innerJoin("profile_on_event", "event.id", "profile_on_event.event_id")
    .select(['profile_on_event.profile_id', 'event.id as event_id', 'event.required_participants', 'event.nb_teams',])
    .where("event.id", "=", event_id)
    .execute()

  const nbParticipant = result.length

  if (nbParticipant !== result.length) throw new Error('Participants number is wrong')

  const profileIds = result.map((participant) => {
    return participant.profile_id
  })

  const queries = profileIds.map((id) => {
    return Profile.findOne(id)
  })

  const profiles = await Promise.all(queries)

  const config = {
    event_id: result[0].event_id,
    num_teams: result[0].nb_teams,
    required_participants: result[0].required_participants,
    profiles: profiles.map((profile) => {
      return {
        profile_id: profile.profile_id,
        username: profile.username,
        gb_rating: profile.gb_rating
      }
    })
  }
  return config

}

export default getCompleteEventInfos