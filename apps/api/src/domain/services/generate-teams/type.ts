export type Player = {
  profile_id: string;
  gb_rating: number;
};

export type Conditions = {
  random(): boolean;
  regular(valueTeam1: number, valueTeam2: number): boolean;
  ifZero(lengthTeam1: number, lengthTeam2: number): boolean;
};

export type TeamGeneratorConfig = {
  team1: Player[];
  team2: Player[];
  ids: string[];
  values: number[];
  participants: number;
};
