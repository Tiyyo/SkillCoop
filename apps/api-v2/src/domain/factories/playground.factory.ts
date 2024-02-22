import { CreatePlaygroundDTO } from 'src/application/dto/create-playground.dto';
import { PlaygroundEntity } from '../entities/playground.entity';
import { GenericFactory } from '../shared/factory';

export class PlaygroundFactory extends GenericFactory {
  constructor() {
    super();
  }
  create(body: CreatePlaygroundDTO) {
    const uuid = this.generateUUID();
    return new PlaygroundEntity({ id: uuid, ...body });
  }
}
