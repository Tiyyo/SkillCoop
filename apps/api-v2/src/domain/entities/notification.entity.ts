import { NotificationType } from '../value-objects/notification-type.vo';

export class NotificationEntity {
  profile_id: string;
  type: NotificationType;
  is_read: boolean;
  message: string;
  instigator_id?: string;
  event_id?: string;
  img_url?: string;
  subtype?: string;

  constructor({
    profile_id,
    type,
    is_read,
    message,
    instigator_id,
    event_id,
    img_url,
    subtype,
  }: {
    id: string;
    profile_id: string;
    type: NotificationType;
    is_read: boolean;
    message: string;
    instigator_id?: string;
    event_id?: string;
    img_url?: string;
    subtype?: string;
  }) {
    this.profile_id = profile_id;
    this.type = type;
    this.is_read = is_read;
    this.message = message;
    this.instigator_id = instigator_id;
    this.event_id = event_id;
    this.img_url = img_url;
    this.subtype = subtype;
  }
}

export type NotificationDBEntity = {
  id: number;
  profile_id: string;
  type: string;
  is_read: number;
  message: string;
  instigator_id: string;
  event_id: number;
  img_url: string;
  subtype: string;
  created_at: string;
};
