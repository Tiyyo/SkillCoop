"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteSchema = void 0;
const z = require("zod");
exports.voteSchema = z.object({
    event_id: z.number().int().positive(),
    profile_id: z.number().int().positive(),
    rater_id: z.number().int().positive(),
});
