import { db } from '../helpers/client.db';
import ServerError from '../helpers/errors/server.error';
import computeRatingUser from '../service/compute-rating';
import { Player } from '@skillcoop/types';

// TODO refactor and make smaller function

export type Eval = {
  avg_pace: number;
  avg_defending: number;
  avg_passing: number;
  avg_dribbling: number;
  avg_shooting: number;
  gb_rating: number;
  profileId: number;
};

type EventData = {
  event_id: number;
  ids_participants: string;
  required_participants: number | null;
  nb_teams: number | null;
};

export class ConfigGenerateTeams {
  eventId: number;
  team1: Player[];
  team2: Player[];
  nb_teams: number;
  ids: number[];
  values: number[];
  participants: number;

  constructor(eventId: number) {
    this.eventId = eventId;
    this.team1 = [];
    this.team2 = [];
    this.nb_teams = 0;
    this.ids = [];
    this.values = [];
    this.participants = 0;
  }
  public async init() {
    const eventData = await this.fetchEventData();
    this.participants = eventData.required_participants!;
    this.nb_teams = eventData.nb_teams!;

    this.parsedEventDataIntoIds(eventData);
    if (this.ids.length !== eventData.required_participants)
      throw new ServerError('Wrong participant number', 'TeamConfigGenerator');

    const promiseSettledResultEval = await this.getUsersEvals();
    const evals = this.ensureAllParticipantsGotEvaluated(
      promiseSettledResultEval,
    );
    this.mapsEvalIntoIdsAndValues(evals);

    return {
      team1: this.team1,
      team2: this.team2,
      nb_teams: this.nb_teams,
      ids: this.ids,
      values: this.values,
      participants: this.participants,
    };
  }
  private async fetchEventData() {
    const [result] = await db
      .selectFrom(['profile_on_event'])
      .select(['profile_on_event.event_id'])
      .select(({ fn }) => [
        'profile_on_event.event_id',
        fn
          .agg<string>('group_concat', ['profile_on_event.profile_id'])
          .as('ids_participants'),
      ])
      .leftJoin('event', 'profile_on_event.event_id', 'event.id')
      .select(['event.required_participants', 'event.nb_teams'])
      .where('profile_on_event.event_id', '=', this.eventId)
      .where('profile_on_event.status_name', '=', 'confirmed')
      .groupBy(['profile_on_event.event_id', 'event.required_participants'])
      .execute();
    return result;
  }
  private parsedEventDataIntoIds(eventData: EventData) {
    const ids = eventData.ids_participants.split(',').map(Number);
    this.ids = ids;
  }
  private async getUsersEvals() {
    const participantEvals = await Promise.allSettled(
      this.ids.map((id) => computeRatingUser(id)),
    )
      .then((res) => {
        return res;
      })
      .catch((err) => console.log('ERROR :', err));
    return participantEvals;
  }
  private ensureAllParticipantsGotEvaluated(
    promiseResult: PromiseSettledResult<Eval>[] | void,
  ) {
    if (!promiseResult) return;
    const evals = promiseResult.map((evaluation, index: number) => {
      if (evaluation.status !== 'fulfilled') {
        return {
          avg_pace: 50,
          avg_defending: 50,
          avg_passing: 50,
          avg_dribbling: 50,
          avg_shooting: 50,
          gb_rating: 50,
          profile_id: Number(this.ids[index]),
        };
      } else {
        return evaluation.value;
      }
    });
    return evals as Eval[];
  }
  private mapsEvalIntoIdsAndValues(evals?: Eval[]) {
    if (!evals) return;
    evals.forEach((skill) => {
      this.ids.push(skill.profileId);
      this.values.push(skill.gb_rating);
    });
  }
}
