import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HistoricService } from 'src/message-storage/historic.service';
import { MessageService } from 'src/message-storage/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly historicService: HistoricService,
    private readonly messageService: MessageService,
  ) { }
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
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      conversationId: number;
      content: string;
      userId: number;
      username: string;
      avatar: string | null;
    },
  ) {
    console.log('Message', payload);
    // handle the logic to store a message in db
    // we need for that conversationId, user_id ,
    // message content
    // then we emit this message to all user in the room
    // matching the conversation id
    // console.log('Client', client)

    console.log(payload);
    const { content, conversationId, userId, username, avatar } = payload;
    console.log(client);
    await this.messageService.store({
      conversationId,
      content,
      sender: userId,
    });
    const roomName = `conversation#${conversationId}`;
    this.io.to(roomName).emit('new-message', {
      message: content,
      created_at: client.handshake.time,
      username,
      avatar,
      user_id: userId,
    });
  }
  @SubscribeMessage('join_conversation')
  async handleUsername(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: number },
  ) {
    client.join(`conversation#${payload.conversationId}`);

    const historic = await this.historicService.get({
      conversationId: payload.conversationId,
    });
    client.emit('historic', historic);
    // handle the logic to emit historic message for user
    // we need that the conversationId
  }
}
