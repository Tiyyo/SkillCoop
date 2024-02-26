import { Controller, Req, Sse, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request } from 'express';
import { Observable, map, fromEvent } from 'rxjs';
import { SSEGuard } from 'src/infrastructure/nest/guards/sse.guard';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Controller('subscription-event')
export class SubscriptionEventController {
  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
    private readonly eventEmitter: EventEmitter2,
  ) { }
  @UseGuards(SSEGuard)
  @Sse()
  sse(@Req() req: Request): Observable<unknown> {
    //@ts-expect-error Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'
    const user_id = req.user;
    const clientUrl = this.envVariableService.getClientUrl();
    console.log(
      `connection SSE on : ${clientUrl} from:${req.protocol}://${req.get(
        'host',
      )}${req.originalUrl}`,
    );

    req.on('close', () => {
      console.log(`${user_id} connection closed`);
      this.eventEmitter.removeAllListeners('new-notification');
    });

    req.on('error', (err) => {
      console.log(err);
      console.log(`${user_id} connection error`);
    });

    return fromEvent(this.eventEmitter, 'new-notification').pipe(
      map((notfication: any) => {
        if (notfication.profileId === user_id) {
          return { data: { message: 'new-notification' } };
        }
      }),
    );
  }
}
