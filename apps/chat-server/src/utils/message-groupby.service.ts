import { Injectable } from '@nestjs/common';


@Injectable()
export class GroupMessageByService {
  groupByDateAndAuthor(messages) {
    return messages.reduce((acc, curr) => {
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
          lastDateGroup.groupAuthor[lastDateGroup.groupAuthor.length - 1];
        if (lastAuthorGroup.user_id === curr.user_id) {
          GroupMessageByService.addMessageToAuthorGroup(lastAuthorGroup, curr);
        } else {
          lastDateGroup.groupAuthor.push(GroupMessageByService.createAuthorGroup(curr));
        }
      }
      return acc;
    }, []);
  }
  static createDateGroup(date, authorGroup) {
    return {
      date,
      groupAuthor: [authorGroup],
    };
  }
  static createAuthorGroup(message) {
    return {
      user_id: message.user_id,
      username: message.username,
      avatar: message.avatar,
      messages: [GroupMessageByService.createMessage(message)],
    };
  }
  static createMessage(message) {
    return {
      message_id: message.message_id,
      message: message.message,
      created_at: message.created_at,
      updated_at: message.updated_at,
    };
  }
  static addMessageToAuthorGroup(authorGroup, message) {
    authorGroup.messages.push(GroupMessageByService.createMessage(message));
  }
}