import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ConversationService } from './message-storage/conversation.service';

export class Message {
  content: string;
  senderId: string;
  receiverId: string;
}

@Controller('chat-serivce')
export class AppController {
  constructor(private readonly conversationService: ConversationService) { }
  @Post('conversation/oneToOne')
  async createConvOne(@Body() body: { userIdOne: number; userIdTwo: number }) {
    await this.conversationService.createOneToOne(body);
  }
  @Post('conversation/group')
  async createConvGroup(@Body() body: { creatorId: number; ids?: number[] }) {
    await this.conversationService.createGroup(body);
  }
  @Patch('conversation/group')
  async addUserToGroup(
    @Body() body: { conversationId: number; ids: number[] },
  ) {
    await this.conversationService.addToGroup(body);
  }
  @Patch('conversation/group/remove')
  async removeUserFromGroup(
    @Body() body: { userId: number; conversationId: number },
  ) {
    await this.conversationService.removeFromGroup(body);
  }
  @Get('conversations/:userId')
  async getConversationsList(@Param() params: { userId: string }) {
    const conversations = await this.conversationService.getList(
      Number(params.userId),
    );
    return conversations;
  }
  @Get('conversation/:conversationId')
  async getConversation(@Param() params: { conversationId: number }) {
    const conversation = await this.conversationService.getConversation(
      params.conversationId,
    );
    return conversation;
  }
}
