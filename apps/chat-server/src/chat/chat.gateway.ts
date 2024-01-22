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
import { JoinRoomDto } from 'src/dto/join-room.dto';
import { PayloadMessageDto } from 'src/dto/payload.message.dto';
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
    @MessageBody() payload: PayloadMessageDto

  ) {
    const { message, conversation_id, user_id, username, avatar } = payload;
    await this.messageService.store({
      conversation_id,
      content: message,
      sender: user_id,
    });

    const roomName = `conversation#${conversation_id}`;

    this.io.to(roomName).emit('new-message', {
      message,
      created_at: client.handshake.time,
      username,
      avatar,
      user_id
    });
  }
  @SubscribeMessage('join_conversation')
  async handleUsername(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomDto,
  ) {
    client.join(`conversation#${payload.conversation_id}`)

    const historic = await this.historicService.get({
      conversation_id: payload.conversation_id,
    });

    client.emit('historic', historic);
  }
}
