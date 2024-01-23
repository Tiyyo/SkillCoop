import { Controller, Get, Post, Body, Param, Patch, HttpCode, HttpException, Delete } from '@nestjs/common';
import { ConversationService } from './message-storage/conversation.service';
import { CreateOneToOneConversationDto } from './dto/create-one-conversation.dto';
import { CreateGroupConversationDto } from './dto/create-group-conversation.dto';
import { AddUserGroupConversationDto } from './dto/add-user-group-conversation.dto';
import { RemoveUserGroupConversationDto } from './dto/remove-user-group-conversation.dto';
import { UserIdParamsDto } from './dto/userId.params.dto';
import { ConversationIdParamsDto } from './dto/conversationId.params.dto';
import { UpdateUserOnConversationDto } from './dto/update-user-conversation.dto';
import { DeleteConversationParamsDto } from './dto/delete-conversation.dto';

@Controller('chat-serivce')
export class AppController {
  constructor(private readonly conversationService: ConversationService) { }

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
    return conversationId ? conversationId : await this.conversationService.createOneToOne(body);
  }

  @Delete('conversation/:conversation_id/:user_id')
  @HttpCode(204)
  async deleteConversation(@Param() params: DeleteConversationParamsDto) {
    console.log(params, 'delete conversation');
    await this.conversationService.deleteGroup(params);
  }
}
