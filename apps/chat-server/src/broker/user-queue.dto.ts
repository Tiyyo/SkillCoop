type UserQueueAction = 'create' | 'update' | 'delete';

export class UserQueueDto {
  readonly profile_id: number;
  readonly username?: string;
  readonly avatar?: string | null;
  readonly action: UserQueueAction;
}
