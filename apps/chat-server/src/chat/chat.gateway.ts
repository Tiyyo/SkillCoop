import { Logger } from '@nestjs/common';
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
    private readonly logger: Logger,
  ) { }
  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Init');
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.debug('Client connected: ' + client.id);
  }
  handleDisconnect(client: any) {
    this.logger.debug('Client disconnected: ' + client.id);
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
    const { content, conversationId, userId, username, avatar } = payload;

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
  }
}
