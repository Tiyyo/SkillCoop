import condition from './condition';
import { Conditions, Player, TeamGeneratorConfig } from './type';

export function divideInTeam(config: TeamGeneratorConfig) {
  const valueTeam1 = getTeamValue(config.team1);
  const valueTeam2 = getTeamValue(config.team2);
  const maxIndex = getMaxIndex(config.values);
  const player = getPlayerObject(maxIndex, config.ids, config.values);

  useRigthCondition(config, player, valueTeam1, valueTeam2, condition)
    ? config.team1.push(player)
    : config.team2.push(player);

  deleteFromArrayAfterPush(config.ids, config.values, maxIndex);

  if (config.ids.length !== 0) {
    divideInTeam(config);
  }
  return { team1: config.team1, team2: config.team2 };
}

export function assignTeam(
  position: number,
  requiredParticipant: number,
): number {
  const TEAM_1 = 1;
  const TEAM_2 = 2;
  const HALF = requiredParticipant / 2;
  if (position < HALF) {
    return TEAM_1;
  } else {
    return TEAM_2;
  }
}

export function useRigthCondition(
  config: TeamGeneratorConfig,
  player: Player,
  valueTeam1: number,
  valueTeam2: number,
  conditions: Conditions,
): boolean {
  if (config.participants === config.ids.length) {
    return conditions.random();
  }
  if (player.gb_rating === 0) {
    return conditions.ifZero(config.team1.length, config.team2.length);
  }
  return conditions.regular(valueTeam1, valueTeam2);
}

export function deleteFromArrayAfterPush(
  ids: string[],
  values: number[],
  index: number,
) {
  ids.splice(index, 1);
  values.splice(index, 1);
}

export function getMaxIndex(values: number[]): number {
  const maxValues = Math.max(...values);
  return values.findIndex((v) => v === maxValues);
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getPlayerObject(
  maxIndex: number,
  ids: string[],
  values: number[],
): Player {
  const player: Player = {
    profile_id: ids[maxIndex],
    gb_rating: values[maxIndex],
  };
  return player;
}

/*eslint-disable*/
export function getTeamValue(arrayTeam: Player[]): number {
  return arrayTeam.length > 0
    ? arrayTeam
      .map((p) => {
        return p.gb_rating;
      })
      .reduce((a, b) => a + b)
    : 0;
}




