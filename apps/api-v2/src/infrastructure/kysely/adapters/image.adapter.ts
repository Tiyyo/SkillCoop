import { ImageRepository } from 'src/domain/repositories/image.repository';
import { CoreAdapter } from './core.adapter';
import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB } from '../database.type';

export class ImageAdapter
  extends CoreAdapter<'image'>
  implements ImageRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
}
