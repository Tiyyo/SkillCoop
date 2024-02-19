export interface ProfileEntity {
  profile_id: number;
  username: string;
  date_of_birth: string | null;
  avatar_url: string | null;
  email?: string | null; // Not sure maybe it should be delete
  first_name?: string | null;
  last_name?: string | null;
  location?: string | null;
  nb_events?: number | null;
  gb_rating?: number | null;
  nb_review?: number | null;
  nb_best_striker_bonus?: number | null;
  nb_mvp_bonus?: number | null;
  nb_attended_events?: number | null;
  relation_exists?: number | null; // Not sure maybe it should be delete
  winning_rate?: number | null;
  last_evaluation: number | null;
}
