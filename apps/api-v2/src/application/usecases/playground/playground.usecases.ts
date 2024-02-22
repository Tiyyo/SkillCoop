import { Injectable } from '@nestjs/common';
import { PlaygroundEntity } from 'src/domain/entities/playground.entity';
import { PlaygroundFactory } from 'src/domain/factories/playground.factory';
import { PlaygroundAdapter } from 'src/infrastructure/kysely/adapters/playground.adapter';

@Injectable()
export class PlaygroundUsecases {
  constructor(
    private readonly playgroundAdapter: PlaygroundAdapter,
    private readonly playgroundFactory: PlaygroundFactory,
  ) { }

  async createOne(body: Omit<PlaygroundEntity, 'id'>) {
    const newPlayground = this.playgroundFactory.create(body);
    const id = newPlayground.id;
    delete newPlayground.id;
    const playground = { domain_id: id, ...newPlayground };
    return await this.playgroundAdapter.createOne(playground);
  }
  async search(query: string) {
    return await this.playgroundAdapter.search(query);
  }
}
