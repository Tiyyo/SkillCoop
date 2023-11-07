"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveScoreSchema = void 0;
const z = require("zod");
exports.saveScoreSchema = z.object({
    score_team_1: z.number().min(0).max(100),
    score_team_2: z.number().min(0).max(100),
    event_id: z.number().int().positive(),
});
