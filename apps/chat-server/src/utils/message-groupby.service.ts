import { Injectable } from '@nestjs/common';
import { MessageStore, AuthorGroupMessages, HistoricMessages, } from '@skillcoop/types';


@Injectable()
export class GroupMessageByService {
  groupByDateAndAuthor(messages) {
    return messages.reduce((acc: HistoricMessages, curr) => {
      const currentDate = new Date(curr.created_at).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      });

      const lastDateGroup = acc.find((group) => group.date === currentDate);

      if (!lastDateGroup) {

        acc.push(GroupMessageByService.createDateGroup(currentDate, GroupMessageByService.createAuthorGroup(curr)));
      } else {

        const lastAuthorGroup =
          lastDateGroup.author_groups[lastDateGroup.author_groups.length - 1];
        if (lastAuthorGroup.user_id === curr.user_id) {

          GroupMessageByService.addMessageToAuthorGroup(lastAuthorGroup, curr);
        } else {

          lastDateGroup.author_groups.push(GroupMessageByService.createAuthorGroup(curr));
        }
      }
      return acc;
    }, []);
  }
  static createDateGroup(date: string, authorGroup: AuthorGroupMessages) {
    return {
      date,
      author_groups: [authorGroup],
    };
  }
  static createAuthorGroup(message: MessageStore) {
    return {
      user_id: message.user_id,
      username: message.username,
      avatar: message.avatar,
      messages: [GroupMessageByService.createMessage(message)],
    };
  }
  static createMessage(message: MessageStore) {
    return {
      message_id: message.message_id,
      message: message.message,
      created_at: message.created_at,
      updated_at: message.updated_at,
    };
  }
  static addMessageToAuthorGroup(authorGroup: AuthorGroupMessages, message: MessageStore) {
    authorGroup.messages.push(GroupMessageByService.createMessage(message));
  }
}