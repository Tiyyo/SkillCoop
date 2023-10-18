import { db } from '../helpers/client.db'
import computeRatingUser from '../service/compute-rating'
import { Player } from '../@types/types'


// TODO refactor and make smaller function 

export type Eval = {
  avg_pace: number
  avg_defending: number
  avg_passing: number
  avg_dribbling: number
  avg_shooting: number
  gb_rating: number
  profile_id: number
}

const getCompleteEventInfos = async (event_id: number) => {

  const [result] = await db
    .selectFrom("profile_on_event")
    /*@ts-ignore*/
    .select(["profile_on_event.event_id", "event.required_participants", "event.nb_teams"])
    .select(({ fn }) => [
      "profile_on_event.event_id",
      fn.agg<string>('group_concat', ['profile_on_event.profile_id']).as('ids_participants'),
    ])
    .leftJoin('event', "profile_on_event.event_id", "event.id")
    .where("profile_on_event.event_id", "=", event_id)
    .where("profile_on_event.status_name", "=", "confirmed")
    .groupBy(["profile_on_event.event_id", "event.required_participants"])
    .execute()

  const idsParticipantString = result.ids_participants.split(",")
  const nbParticipant = idsParticipantString.length

  if (nbParticipant !== result.required_participants) throw new Error('Wrong participant number')

  const participantEvals = await Promise.allSettled(
    idsParticipantString.map((ids) => computeRatingUser(Number(ids)))
  ).then((res) => {
    return res
  }).catch((err) => console.log('ERROR :', err))

  if (!participantEvals) return
  const evals = participantEvals.map((evaluation, index: number) => {
    if (evaluation.status !== 'fulfilled') {
      return {
        avg_pace: 50,
        avg_defending: 50,
        avg_passing: 50,
        avg_dribbling: 50,
        avg_shooting: 50,
        gb_rating: 50,
        profile_id: Number(idsParticipantString[index])
      }
    } else {
      return evaluation.value
    }
  })

  const idsParticipants: number[] = []
  const valuesGbRating: number[] = []

  evals.forEach((skill) => {
    idsParticipants.push(skill.profile_id)
    valuesGbRating.push(skill.gb_rating)
  })

  const team1: Player[] = []
  const team2: Player[] = []

  const config = {
    team1: team1,
    team2: team2,
    nb_teams: result.nb_teams,
    ids: idsParticipants,
    values: valuesGbRating,
    participants: result.required_participants as number,
  }
  return config
}

export default getCompleteEventInfos