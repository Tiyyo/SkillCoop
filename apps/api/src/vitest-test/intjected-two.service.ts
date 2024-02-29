import { Injectable } from '@nestjs/common';

@Injectable()
export class InjectedTwoService {
  constructor() {}
  bar() {
    return 'bar';
  }
}
