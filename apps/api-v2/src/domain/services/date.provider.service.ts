import { Injectable } from '@nestjs/common';
import { getUTCString, getInterval } from '@skillcoop/date-handler';

@Injectable()
export class DateProvider {
  today() {
    return getUTCString(new Date());
  }
  intervalFromToday(date: string) {
    return getInterval(this.today(), date);
  }
}
