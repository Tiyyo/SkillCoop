import { Injectable } from '@nestjs/common';

@Injectable()
export class InjectedOneService {
  foo() {
    return 'foo';
  }
}
