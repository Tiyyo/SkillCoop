// import { Insertable, Selectable, Updateable } from "kysely"

// import { User as User_table, Profile as Profile_table, Profile_on_profile as Profile_on_profile_table, Event as Event_table, Profile_on_event as Profile_on_event_table, Skill_foot as Skill_foot_table, Skill_basket as Skill_basket_table, Sport as Sport_table, Status as Status_table, Image as Image_table } from '@prisma/client'


// export interface Database {
//     user: User_table
//     profile: Profile_table
//     profile_on_profile: Profile_on_profile_table
//     event: Event_table
//     profile_on_event: Profile_on_event_table
//     skill_foot: Skill_foot_table
//     skill_basket: Skill_basket_table
//     sport: Sport_table
//     status: Status_table
//     image: Image_table
// }

// export type User = Selectable<User_table>
// export type NewUser = Insertable<User_table>
// export type UserUpdate = Updateable<User_table>

// export type Profile = Selectable<Profile_table>
// export type NewProfile = Insertable<Profile_table>
// export type ProfileUpdate = Updateable<Profile_table>

// export type Profile_on_profile = Selectable<Profile_on_profile_table>
// export type NewProfile_on_profile = Insertable<Profile_on_profile_table>
// export type Profile_on_profileUpdate = Updateable<Profile_on_profile_table>

// export type Event = Selectable<Event_table>
// export type NewEvent = Insertable<Event_table>
// export type EventUpdate = Updateable<Event_table>

// export type Profile_on_event = Selectable<Profile_on_event_table>
// export type NewProfile_on_event = Insertable<Profile_on_event_table>
// export type Profile_on_eventUpdate = Updateable<Profile_on_event_table>

// export type Skill_foot = Selectable<Skill_foot_table>
// export type NewSkill_foot = Insertable<Skill_foot_table>
// export type Skill_footUpdate = Updateable<Skill_foot_table>

// export type Skill_basket = Selectable<Skill_basket_table>
// export type NewSkill_basket = Insertable<Skill_basket_table>
// export type Skill_basketUpdate = Updateable<Skill_basket_table>

// export type Sport = Selectable<Sport_table>
// export type NewSport = Insertable<Sport_table>
// export type SportUpdate = Updateable<Sport_table>

// export type Status = Selectable<Status_table>
// export type NewStatus = Insertable<Status_table>
// export type StatusUpdate = Updateable<Status_table>

// export type Image = Selectable<Image_table>
// export type NewImage = Insertable<Image_table>
// export type ImageUpdate = Updateable<Image_table>

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
    status_id: number;
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
    profileId: number;
    eventId: number;
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

