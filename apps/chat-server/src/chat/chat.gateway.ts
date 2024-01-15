import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserModel } from 'src/database/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private userModel: UserModel) { }
  @WebSocketServer() io: Server;

  afterInit() {
    console.log('Init');
  }
  handleConnection(client: any, ...args: any[]) {
    // console.log('Args', args);
    // console.log('Client', client);
    console.log('Connected');
  }
  handleDisconnect(client: any) {
    // console.log('Client', client);
    console.log('Disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log('Message', payload);
    this.userModel.create({ user_id: 1, avatar: null, username: 'test' });
    // console.log('Client', client)
  }
}
