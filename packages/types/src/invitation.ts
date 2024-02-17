export type InvitationStatus = 'pending' | 'confirmed' | 'declined' | 'requested' | 'refused';

export type InvitationPageVariant = 'update' | 'mutate';

export const invitationStatus = {
  pending: 'pending',
  confirmed: 'confirmed',
  declined: 'declined',
  requested: 'requested',
  refused: 'refused',
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

export type EventParticipationRequest = {
  event_id: number;
  profile_id: number;
}

export type CreateFriendsInvitation = {
  adder_id: number;
  friend_id: number;
};

export type UpdateFriendsInvitation = {
  adder_id: number;
  friend_id: number;
  status_name: InvitationStatus;
};