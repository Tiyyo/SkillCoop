export type User = {
  email: string,
  password: string
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