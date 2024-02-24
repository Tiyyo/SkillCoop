import { InjectedOneService } from './injected-one.service';
import { InjectedTwoService } from './intjected-two.service';

export class RandomService {
  constructor(
    private readonly injectedOneService: InjectedOneService,
    private readonly injectedTwoService: InjectedTwoService,
  ) { }
  getStr() {
    return `${this.injectedOneService.foo()} ${this.injectedTwoService.bar()}`;
  }
}
