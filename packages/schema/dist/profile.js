"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileInfosSchema = void 0;
const z = require("zod");
exports.editProfileInfosSchema = z.object({
    username: z.string().max(16, { message: '16 characters or less allowed' }).optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    date_of_birth: z.string().optional(),
    location: z.string().optional(),
});
