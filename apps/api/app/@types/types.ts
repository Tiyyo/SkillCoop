import { NextFunction, Request, Response } from 'express';
import { ColumnType } from 'kysely';
import { DB } from './database.js';
// Need to add the name of each table added to the database in TablesNames

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>; // eslint-disable-line

// find a less confusuing name
export type ObjectRecordGeneric = Record<
  string,
  string | number | boolean | null
>;

export const canals = {
  body: 'body',
  params: 'params',
  query: 'query',
} as const;

export type TableNames =
  | 'best_striker_poll'
  | 'event'
  | 'image'
  | 'language_preference'
  | 'mvp_poll'
  | 'notification'
  | 'notification_preference'
  | 'notification_type'
  | 'profile'
  | 'profile_on_event'
  | 'profile_on_profile'
  | 'score'
  | 'skill_foot'
  | 'sport'
  | 'status'
  | 'theme_preference'
  | 'user';

export const tableNames = {
  best_striker_poll: 'best_striker_poll',
  event: 'event',
  image: 'image',
  language_preference: 'language_preference',
  mvp_poll: 'mvp_poll',
  notification: 'notification',
  notification_preference: 'notification_preference',
  notification_type: 'notification_type',
  profile: 'profile',
  profile_on_event: 'profile_on_event',
  profile_on_profile: 'profile_on_profile',
  score: 'score',
  skill_foot: 'skill_foot',
  sport: 'sport',
  status: 'status',
  theme_preference: 'theme_preference',
  user: 'user',
} as const;


type IsNullable<T> = {
  [P in keyof T]: null extends T[P] ? P : never;
}[keyof T];


type OptionalNullable<T> = Partial<Pick<T, IsNullable<T>>> &
  Omit<T, IsNullable<T>>;


type IfGeneratedThenNumber<T> = T extends ColumnType<infer S, infer I, infer U>
  ? number
  : T;

type ReplaceGeneratedByNumber<T> = {
  [K in keyof T]: IfGeneratedThenNumber<T[K]>;
};

// type ReplaceGeneratedByNumber<T> = {
//   [K in keyof T]: T[K] extends ColumnType<infer S, infer I, infer U> ? number | undefined : T[K]
// } & {
//     [K in keyof T as T[K] extends ColumnType<infer S, infer I, infer U> ? K : never]?: T[K] extends ColumnType<infer S, infer I, infer U> ? number : never
//   };

// type ReplaceGeneratedByNumber<T> = {
//   [K in keyof T as T[K] extends ColumnType<infer S, infer I, infer U> ? K : never]?: T[K] extends ColumnType<infer S, infer I, infer U> ? number : never
// } & {
//     [K in keyof T]: T[K] extends ColumnType<infer S, infer I, infer U> ? never : T[K]
//   }



type TableEvent = TableType<'event'>
type UpdateProfile = ReplaceGeneratedByOptionalNumber<TableEvent>;


// type ReplaceGeneratedByNumber<T> = {
//   [K in keyof T]: T[K] extends ColumnType<infer S, infer I, infer U>
//   ? { [P in keyof T[K]]?: number }
//   : T[K]
// }

type OmitGeneratedProps<T> = {
  [K in keyof T as T[K] extends ColumnType<infer S, infer I, infer U>
  ? never
  : K]: T[K];
};

export type TableType<T extends TableNames> = DB[T];
export type TableTypeOmitCreatedAt<T extends TableNames> = Omit<
  TableType<T>,
  'created_at' | 'updated_at'
>;
export type TableTypeOmitId<T extends TableNames> = Omit<
  TableType<T>,
  'id' | 'created_at' | 'updated_at'
>;





export type Insert<T extends TableNames> = TableTypeOmitId<T>;

export type InsertNullOptional<T extends TableNames> = OptionalNullable<
  Insert<T>
>;
export type InsertWithoutGenerated<T extends TableNames> = OmitGeneratedProps<
  InsertNullOptional<T>
>;
export type InsertObjectDB<T extends TableNames> = InsertWithoutGenerated<T> & {
  created_at?: string;
  updated_at?: string | null;
};

export type Find<T extends TableNames> = Partial<
  Omit<TableType<T>, 'created_at' | 'updated_at'>
>;

export type FindObjectDB<T extends TableNames> = ReplaceGeneratedByNumber<
  Find<T>
>;

export type ReplaceGeneratedByOptionalNumber<T> = {
  [K in keyof T as T[K] extends ColumnType<infer S, infer I, infer U> ? never : K]: T[K]
} & {
    [K in keyof T as T[K] extends ColumnType<infer S, infer I, infer U> ? K : never]?: number
  };

export type Update<T extends TableNames> = ReplaceGeneratedByOptionalNumber<TableTypeOmitCreatedAt<T>>;

export type UpdateObjectDB<T extends TableNames> = Partial<Update<T>> & {
  created_at?: string;
  updated_at?: string | null;
}


export type ReturnTableType<T extends TableNames> = ReplaceGeneratedByNumber<
  TableType<T>
>;

export type DeleteObjectDB<T extends TableNames> = Partial<TableType<T>>;
