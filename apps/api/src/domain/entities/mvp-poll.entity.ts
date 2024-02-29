export class BestStrikerPoll {
  event_id: string;
  profile_id: string;
  rater_id: string;

  constructor(event_id: string, profile_id: string, rater_id: string) {
    this.event_id = event_id;
    this.profile_id = profile_id;
    this.rater_id = rater_id;
  }
}
