import getCompleteEventInfos from "../../models/teams";
import { Player, TeamGeneratorConfig } from "../../@types/types";

export async function generateBalancedTeam() {
  console.info("Algo has started");
  console.time("Algo time start");

  // hardcoded event_id for now
  // gonna be a parameter later
  const event_id = 4;

  const eventInfos = await getCompleteEventInfos(event_id)

  const profiles = eventInfos.profiles

  const newObject: Record<string, number> = {}

  profiles.forEach((profile) => {
    newObject[profile.profile_id as keyof typeof newObject] = profile.gb_rating
  })

  // const nbTeamsArray = new Array(eventInfos.num_teams).fill(1)
  // nbTeamsArray.forEach((el, index) => {
  // })
  // remove those hardcoded variables for improvement
  // especially for more than 2 teams

  let team_1: Player[] = []
  let team_2: Player[] = []

  const config = {
    team1: team_1,
    team2: team_2,
    ids: Object.keys(newObject),
    values: Object.values(newObject) as number[],
    participants: eventInfos.required_participants
  }

  const result = divideInTeam(config)

  console.log(result, 'this is the result')
  console.timeEnd("Algo time end")

}

export function divideInTeam(config: TeamGeneratorConfig) {
  const valueTeam1 = getTeamValue(config.team1)
  const valueTeam2 = getTeamValue(config.team2)

  const maxIndex = getMaxIndex(config.values)

  const player = getPlayerObject(maxIndex, config.ids, config.values)

  useRandomConditionAtStart(config.participants, config.ids, valueTeam1, valueTeam2) ? config.team1.push(player) : config.team2.push(player)

  deleteFromArrayAfterPush(config.ids, config.values, maxIndex)

  if (config.ids.length !== 0) {
    divideInTeam(config)
  }
  return { team_1: config.team1, team_2: config.team2 }
}

export function useRandomConditionAtStart(participants: number, idsArray: string[], valueTeam1: number, valueTeam2: number) {
  if (participants === idsArray.length) {
    const randomNumberStart = getRandomArbitrary(0, 1)
    return randomNumberStart > 0.5
  }
  return valueTeam1 < valueTeam2
}

export function deleteFromArrayAfterPush(ids: string[], values: number[], index: number) {
  ids.splice(index, 1)
  values.splice(index, 1)
}

export function getMaxIndex(values: number[]): number {
  const maxValues = Math.max(...values)
  return values.findIndex((v) => v === maxValues)
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getPlayerObject(maxIndex: number, ids: string[], values: number[]): Player {
  const player: Player = {
    profile_id: Number(ids[maxIndex]),
    gb_rating: values[maxIndex]
  }
  return player
}

export function getTeamValue(arrayTeam: Player[]): number {
  return arrayTeam.length > 0 ? arrayTeam.map((p) => {
    let value = p.gb_rating
    return value
  }).reduce((a, b) => a + b) : 0
}