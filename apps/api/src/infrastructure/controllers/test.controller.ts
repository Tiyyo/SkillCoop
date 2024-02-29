// import { Body, Controller, Post } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { NotificationSubtypeService } from 'src/domain/services/notification/notifcation-subtype.example';

// @Controller('test')
// export class TestController {
//   constructor(
//     private readonly notificationSubtypeService: NotificationSubtypeService,
//     private readonly eventEmitter: EventEmitter2,
//   ) { }

//   @Post()
//   async test(@Body() body: any) {
//     await this.notificationSubtypeService.notify({
//       instigatorId: body.instigator_id,
//       eventId: body.event_id,
//       profileId: body.profile_id,
//       convId: body.conv_id,
//     });
//     // if transport is null then we should not send notification
//     // we should filter out the null transport
//     // we need to retrieve some infos base on the type of notification
//     // we have requested the correct builder message base on the ntofication type
//     // once we have all the infos we can create our notification entity
//     // we store it in the database
//     // then dispatch it to the transport
//     return 'result';
//   }
// }
