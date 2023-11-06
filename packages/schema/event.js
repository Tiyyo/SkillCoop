"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.createEventSchema = void 0;
const z = require("zod");
exports.createEventSchema = z.object({
    // TODO make a custom regex for the date in string format
    date: z.string(),
    duration: z.number(),
    location: z.string(),
    required_participants: z.number(),
    organizer_id: z.number().int().positive(),
    status_name: z.enum(["open", "full"]).optional(),
    participants: z.array(z.number()).optional(),
});
exports.updateEventSchema = z.object({
    // TODO make a custom regex for the date in string format
    date: z.string().optional(),
    duration: z.number().optional(),
    location: z.string().optional(),
    required_participants: z.number().optional(),
    profile_id: z.number().int().positive(),
    status_name: z.enum(["open", "full", "cancelled", "completed"]).optional(),
    participants: z.array(z.number()).optional(),
});
