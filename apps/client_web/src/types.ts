export type LevelScale =
  'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert'

export type EventStatus = 'open' | 'full' | 'completed' | 'cancelled'

export type InvitationStatus = 'pending' | 'confirmed' | 'declined'

export type User = {
  email: string,
  password: string
}

export type RegisterUser = User & {
  confirmedPassword: string,
  termAndService: boolean | string
}

export type Profile = {
  user_id: number,
  avatar_url: string | null,
  username: string,
  date_of_birth: Date,
  profile_id: number,
  nb_reviews: number,
  avg_pace: number,
  avg_shooting: number,
  avg_dribbling: number,
  avg_defending: number,
  gb_rating: number,
}

export type EventParticipant = {
  profile_id: number
  username: string
  avatar: string
  status: InvitationStatus
  team?: number
}

export type CreateEventData = {
  date: string
  duration: number
  location: string
  required_participants: number
  organizer_id: number
  status_name: 'open'
  participants?: number[]
}

export type EventType = {
  event_id: number
  date: string
  duration: number
  location: string
  required_participants: number
  nb_teams: number
  organizer_id: number
  status_name: EventStatus
  score_team_1: number | null
  score_team_2: number | null
  user_status: InvitationStatus
  participants: EventParticipant[] | string
  confirmed_participants: number
}

export type Friend = {
  adder_id: number
  friend_id: number
  username: string
  avatar_url: string
  status_name: InvitationStatus
}
