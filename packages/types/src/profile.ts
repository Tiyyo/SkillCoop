
export type Profile = {
  avatar_url: string | null;
  username: string;
  date_of_birth: string | null;
  profile_id: number;
  email?: string | null;
  nb_events?: number | null;
  first_name?: string | null;
  last_name?: string | null;
  location?: string | null;
  gb_rating?: number | null;
  nb_review?: number | null;
  nb_best_striker_bonus?: number | null;
  nb_mvp_bonus?: number | null;
  nb_attended_events?: number | null;
  relation_exists?: number | null;
  last_evaluation: number | null;
};

export type SearchProfileQuery = {
  username: string;
  page?: number;
  userProfileId: number;
};

export type Bonus = {
  nb_mvp_bonus: number;
  nb_best_striker_bonus: number;
};

