export type InvitationStatus = 'pending' | 'confirmed' | 'declined';

export type InvitationPageVariant = 'update' | 'mutate';

export const invitationStatus = {
  pending: 'pending',
  confirmed: 'confirmed',
  declined: 'declined',
} as const;

export const invitationPageVariant = {
  update: 'update',
  mutate: 'mutate',
} as const;

export type EventInvitation = {
  event_id: number;
  initiator?: number;
  ids: number[];
};

export type CreateFriendsInvitation = {
  adder_id: number;
  friend_id: number;
};

export type UpdateFriendsInvitation = {
  adder_id: number;
  friend_id: number;
  status_name: InvitationStatus;
};