export class ScoreEntity {
  score_team_1: number;
  score_team_2: number;
  event_id: string;

  constructor(scoreTeam1: number, scoreTeam2: number, eventId: string) {
    this.score_team_1 = scoreTeam1;
    this.score_team_2 = scoreTeam2;
    this.event_id = eventId;
  }
}
