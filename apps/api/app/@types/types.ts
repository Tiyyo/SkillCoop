import { NextFunction, Request, Response } from "express";

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>;

export const canals = {
    body: "body",
    params: "params",
    query: "query"
} as const

export type LevelScale =
    'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert'

export type Score = {
    avg_pace: number
    avg_shooting: number
    avg_passing: number
    avg_dribbling: number,
    avg_defending: number
}

export type Player = {
    profile_id: number
    gb_rating: number
}

export type TeamGeneratorConfig = {
    team1: Player[]
    team2: Player[]
    ids: string[]
    values: number[]
    participants: number
}

