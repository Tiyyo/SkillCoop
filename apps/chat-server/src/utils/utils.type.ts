import { Conversation } from "@skillcoop/types";


export function assertIsConversation(conversation: any): asserts conversation is Conversation {
  const isObject = (obj: any): obj is Record<string, unknown> => typeof obj === 'object' && obj !== null;


  if (!isObject(conversation)) {
    throw new Error('Conversation is not an object');
  }
  if (typeof conversation.conversation_id !== 'number') {
    throw new Error('Conversation Id is not a number');
  }

  if (typeof conversation.title !== 'string' && conversation.title !== null) {
    throw new Error('Conversation title is not a string or null');
  }

  if (!['oneToOne', 'group', 'event'].includes(conversation.type_name as any)) {
    throw new Error('Conversation type_name is not one of the valid types : oneToOne, group, event');
  }

  if (typeof conversation.last_seen !== 'string' && conversation.last_seen !== null && conversation.last_seen !== undefined) {
    throw new Error('Conversation last_seen is not a string or null or undefined');
  }

  if (typeof conversation.last_update !== 'string' && conversation.last_update !== null) {
    throw new Error('Conversation last_update is not a string or null');
  }

  if (!Array.isArray(conversation.participants_list)) {
    throw new Error('Conversation participants_list is not an array');
  }

  conversation.participants_list.forEach(participant => {
    if (typeof participant.user_id !== 'string' ||
      typeof participant.username !== 'string' ||
      typeof participant.avatar !== 'string' && participant.avatar !== null || typeof participant.is_admin !== 'number') {
      throw new Error('Invalid Participant in Conversation object');
    }
  });

  if (conversation.last_message) {
    if (typeof (conversation.last_message as any).user_id !== 'number' ||
      typeof (conversation.last_message as any).content !== 'string' ||
      typeof (conversation.last_message as any).created_at !== 'string') {
      throw new Error('Invalid LastMessage in Conversation object');
    }
  }
}