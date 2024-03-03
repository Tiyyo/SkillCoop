import { Controller, Get, Post, Body, Param, Patch, HttpCode, Delete, NotFoundException } from '@nestjs/common';
import { ConversationService } from './message-storage/conversation.service';
import { CreateOneToOneConversationDto } from './dto/create-one-conversation.dto';
import { CreateGroupConversationDto } from './dto/create-group-conversation.dto';
import { AddUserGroupConversationDto } from './dto/add-user-group-conversation.dto';
import { RemoveUserGroupConversationDto } from './dto/remove-user-group-conversation.dto';
import { UserIdParamsDto } from './dto/userId.params.dto';
import { ConversationIdParamsDto } from './dto/conversationId.params.dto';
import { UpdateUserOnConversationDto } from './dto/update-user-conversation.dto';
import { DeleteConversationParamsDto } from './dto/delete-conversation.dto';
import { EventIdParamsDto } from './dto/eventId.params.dto';
import { UserService } from './user/user.service';

@Controller('chat-service')
export class AppController {
  constructor(private readonly conversationService: ConversationService, private readonly userService: UserService) { }
  @Get()
  async healthCheck() {
    return { message: 'Chat server is ok' };
  }
  @Post('conversation/oneToOne')
  async createConvOne(@Body() body: CreateOneToOneConversationDto) {
    const conversationId = await this.conversationService.createOneToOne(body);
    return conversationId;
  }

  @Post('conversation/group')
  async createConvGroup(@Body() body: CreateGroupConversationDto) {
    const conversationId = await this.conversationService.createGroup(body);
    return conversationId
  }

  @Patch('user-conversation/group')
  async addUserToGroup(
    @Body() body: AddUserGroupConversationDto,
  ) {
    return await this.conversationService.addToGroup(body);
  }

  @Delete('user-conversation/group/:conversation_id/:participant_id')
  @HttpCode(200)
  async removeUserFromGroup(
    @Param() params: RemoveUserGroupConversationDto,
  ) {
    const result = await this.conversationService.removeFromGroup(params);
    if (typeof result === 'boolean') {
      return { success: result };
    }
    return result
  }

  @Get('conversations/:userId')
  async getConversationsList(@Param() params: UserIdParamsDto) {
    const conversations = await this.conversationService.getList(
      params.userId,
    );
    return conversations;
  }

  @Get('conversation/:conversationId')
  async getConversation(@Param() params: ConversationIdParamsDto) {
    const conversation = await this.conversationService.getConversation(
      params.conversationId,
    );
    return conversation;
  }
  @Get('conversation/event/:eventId')
  async getConversationByEvent(@Param() params: EventIdParamsDto) {
    const conversationId = await this.conversationService.getConversationIdByEvent(
      params.eventId,
    );
    if (!conversationId) throw new NotFoundException('No conversation found for this event');
    const conversation = await this.conversationService.getConversation(
      conversationId,
    );
    return conversation;
  }
  @Patch('/user-conversation')
  async updateUserOneConversation(
    @Body() body: UpdateUserOnConversationDto,
  ) {
    const { conversation_id, user_id, ...updateData } = body;
    await this.conversationService.updateUserOnConversation({ conversation_id, user_id }, updateData);
  }

  @Post('conversation/find-or-create')
  async findOrCreateConversation(@Body() body: CreateOneToOneConversationDto) {
    const conversationId = await this.conversationService.searchOneToOne(body);
    if (conversationId) return conversationId;
    await this.userService.checkUserExistence(body.user_id_one, body.user_username_one, body.user_avatar_one);
    await this.userService.checkUserExistence(body.user_id_two, body.user_username_two, body.user_avatar_two);
    const conv = await this.conversationService.createOneToOne(body);
    return { conversation_id: conv.conversationId }
  }

  @Delete('conversation/:conversation_id/:user_id')
  @HttpCode(204)
  async deleteConversation(@Param() params: DeleteConversationParamsDto) {
    await this.conversationService.deleteGroup(params);
  }
}
