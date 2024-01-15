"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizerSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const z = __importStar(require("zod"));
const acceptableEventFormat = [6, 10, 14, 22];
exports.createEventSchema = z.object({
    start_date: z.string(),
    start_time: z.string(),
    duration: z.number().positive(),
    location: z.string(),
    required_participants: z.number().refine((data) => acceptableEventFormat.includes(data), {
        message: "wrongFormatEvent"
    }),
    organizer_id: z.number().int().positive(),
    status_name: z.enum(["open"]).optional(),
    participants: z.array(z.number()).optional(),
});
exports.updateEventSchema = z.object({
    // TODO make a custom regex for the date in string format
    event_id: z.number().positive().int(),
    date: z.string().optional(),
    duration: z.number().optional(),
    location: z.string().optional(),
    required_participants: z.number().refine((data) => acceptableEventFormat.includes(data), {
        message: "wrongFormatEvent"
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
//# sourceMappingURL=event.js.map