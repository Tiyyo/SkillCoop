"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizerSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const z = require("zod");
const acceptableEventFormat = [6, 10, 14, 22];
exports.createEventSchema = z.object({
    start_date: z.string(),
    start_time: z.string(),
    duration: z.number().positive(),
    location: z.string(),
    required_participants: z.number().refine((data) => acceptableEventFormat.includes(data), {
        message: "Wrong format, must be 6, 10, 14 or 22"
    }),
    organizer_id: z.number().int().positive(),
    status_name: z.enum(["open"]).optional(),
    participants: z.array(z.number()).optional(),
});
exports.updateEventSchema = z.object({
    // TODO make a custom regex for the date in string format
    date: z.string().optional(),
    duration: z.number().optional(),
    location: z.string().optional(),
    required_participants: z.number().refine((data) => acceptableEventFormat.includes(data), {
        message: "Wrong format, must be 6, 10, 14 or 22"
    }).optional(),
    profile_id: z.number().int().positive(),
    status_name: z.enum(["open", "full", "cancelled", "completed"]).optional(),
    participants: z.array(z.number()).optional(),
});
exports.updateOrganizerSchema = z.object({
    event_id: z.number().int().positive(),
    organizer_id: z.number().int().positive(),
    new_organizer_id: z.number().int().positive(),
});
