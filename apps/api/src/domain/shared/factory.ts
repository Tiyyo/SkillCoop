import { v4 as uuidv4 } from 'uuid';

export class GenericFactory {
  generateUUID() {
    return uuidv4();
  }
}
