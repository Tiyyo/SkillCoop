import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type event = {
    id: Generated<number>;
    date: string;
    duration: number;
    location: string;
    required_particpants: number;
    num_teams: Generated<number>;
    organizer_id: number;
    status_name: string;
    createdAt: Generated<string>;
    updatedAt: string | null;
};
export type image = {
    id: Generated<number>;
    url: string;
    key: string;
    size: number | null;
    createdAt: Generated<string>;
    updatedAt: string | null;
};
export type profile = {
    id: Generated<number>;
    user_id: number;
    username: string;
    date_of_birth: string;
    avatar_url: string | null;
    skill_foot_id: number | null;
};
export type profile_on_event = {
    id: Generated<number>;
    profile_id: number;
    event_id: number;
    status_name: string;
    createdAt: Generated<string>;
    updatedAt: string | null;
};
export type profile_on_profile = {
    id: Generated<number>;
    adder_id: number;
    friend_id: number;
    status_name: string | null;
    createdAt: Generated<string>;
    updatedAt: string | null;
};
export type skill_foot = {
    id: Generated<number>;
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    createdAt: Generated<string>;
    updatedAt: string | null;
    sport_id: number;
    rater_id: number;
    reviewee_id: number;
};
export type sport = {
    id: Generated<number>;
    name: string;
    createdAt: Generated<string>;
    updatedAt: string | null;
};
export type status = {
    id: Generated<number>;
    name: string;
    createdAt: Generated<string>;
    updatedAt: string | null;
};
export type user = {
    id: Generated<number>;
    email: string;
    password: string;
    createdAt: Generated<string>;
    updatedAt: string | null;
};
export type DB = {
    event: event;
    image: image;
    profile: profile;
    profile_on_event: profile_on_event;
    profile_on_profile: profile_on_profile;
    skill_foot: skill_foot;
    sport: sport;
    status: status;
    user: user;
};
