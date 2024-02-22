import { Injectable } from '@nestjs/common';
import { SaveScoreEventDTO } from 'src/application/dto/save-score.dto';
import { ScoreAdapter } from 'src/domain/repositories/score.repository';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';

@Injectable()
export class EventMutationUsecases {
  constructor(
    private readonly eventMutationAdapter: EventMutationsAdapter,
    private readonly scoreAdapter: ScoreAdapter,
  ) { }

  async saveScore(data: SaveScoreEventDTO) {
    await this.scoreAdapter.createOne(data);
    await this.eventMutationAdapter.updateOne(
      {
        id: data.event_id,
      },
      { status_name: 'completed' },
    );
  }
}
