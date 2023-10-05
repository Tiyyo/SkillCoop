import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type best_striker_pool = {
    event_id: number;
    profile_id: number;
    created_at: string;
    updated_at: string | null;
};
export type event = {
    id: Generated<number>;
    date: string;
    duration: number;
    location: string;
    required_participants: number;
    nb_teams: Generated<number>;
    organizer_id: number;
    status_name: string;
    created_at: string;
    updated_at: string | null;
    mvp_id: number;
    best_striker_id: number;
};
export type image = {
    id: Generated<number>;
    url: string;
    key: string | null;
    size: number | null;
    created_at: string;
    updated_at: string | null;
};
export type mvp_pool = {
    event_id: number;
    profile_id: number;
    created_at: string;
    updated_at: string | null;
};
export type profile = {
    id: Generated<number>;
    user_id: number;
    username: string;
    first_name: string | null;
    last_name: string | null;
    location: string | null;
    date_of_birth: string | null;
    avatar_url: string | null;
    skill_foot_id: number | null;
};
export type profile_on_event = {
    id: Generated<number>;
    profile_id: number;
    event_id: number;
    team: number | null;
    status_name: string;
    created_at: string;
    updated_at: string | null;
};
export type profile_on_profile = {
    adder_id: number;
    friend_id: number;
    status_name: string | null;
    created_at: string;
    updated_at: string | null;
};
export type score = {
    id: Generated<number>;
    score_team_1: number;
    score_team_2: number;
    event_id: number;
    created_at: string;
    updated_at: string | null;
};
export type skill_foot = {
    id: Generated<number>;
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    created_at: string;
    updated_at: string | null;
    sport_id: number;
    rater_id: number;
    reviewee_id: number;
};
export type sport = {
    id: Generated<number>;
    name: string;
    created_at: string;
    updated_at: string | null;
};
export type status = {
    id: Generated<number>;
    name: string;
    created_at: string;
    updated_at: string | null;
};
export type user = {
    id: Generated<number>;
    email: string;
    password: string;
    verified: Generated<number>;
    created_at: string;
    updated_at: string | null;
};
export type DB = {
    best_striker_pool: best_striker_pool;
    event: event;
    image: image;
    mvp_pool: mvp_pool;
    profile: profile;
    profile_on_event: profile_on_event;
    profile_on_profile: profile_on_profile;
    score: score;
    skill_foot: skill_foot;
    sport: sport;
    status: status;
    user: user;
};
