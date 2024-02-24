import { Module } from '@nestjs/common';
import { RandomService } from './service';
import { InjectedOneService } from './injected-one.service';
import { InjectedTwoService } from './intjected-two.service';

@Module({
  providers: [RandomService, InjectedOneService, InjectedTwoService],
})
export class VitestModule { }
