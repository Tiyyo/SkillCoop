import { NextFunction, Request, Response } from 'express';

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
