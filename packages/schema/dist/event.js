"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizerSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const z = require("zod");
const acceptableEventFormat = [6, 10, 14, 22];
const todayDate = new Intl.DateTimeFormat("en-Fr", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).format(new Date());
const todayTime = new Intl.DateTimeFormat("en-Fr", {
    hour: "numeric",
    minute: "numeric",
}).format(new Date());
exports.createEventSchema = z.object({
    // TODO make a custom regex for the date in string format
    date: z.string().refine((data) => {
        const startTime = data.split(' ')[1];
        // Need to add 000 to the end of the date to make it work
        // new Date() automatically adds 01:00:00 to the date
        // instead of 00:00:00
        const startDate = data.split(' ')[0] + ' 00:00:000';
        const hours = Number(startTime.split(':')[0]);
        const minutes = Number(startTime.split(':')[1]);
        const todayHours = Number(todayTime.split(':')[0]);
        const todayMinutes = Number(todayTime.split(':')[1].slice(0, 2));
        if (new Date(startDate) === new Date(todayDate) && (hours > todayHours || (hours === todayHours && minutes > todayMinutes)))
            return true;
        if (new Date(startDate) > new Date(todayDate))
            return true;
        if (new Date(startDate) < new Date(todayDate))
            return false;
        return false;
    }, {
        message: "Date must be in the future"
    }),
    duration: z.number(),
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
