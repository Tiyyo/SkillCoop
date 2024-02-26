import { Injectable } from '@nestjs/common';
import { InjectedOneService } from './injected-one.service';
import { InjectedTwoService } from './intjected-two.service';

@Injectable()
export class RandomService {
  constructor(
    private readonly injectedOneService: InjectedOneService,
    private readonly injectedTwoService: InjectedTwoService,
  ) { }
  getStr() {
    return `${this.injectedOneService.foo()} ${this.injectedTwoService.bar()}`;
  }
}
