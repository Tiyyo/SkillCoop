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
  initiator?: string;
  ids: string[];
};

export type EventParticipationRequest = {
  event_id: number;
  profile_id: string;
}

export type CreateFriendsInvitation = {
  adder_id: string;
  friend_id: string;
};

export type UpdateFriendsInvitation = {
  adder_id: string;
  friend_id: string;
  status_name: InvitationStatus;
};