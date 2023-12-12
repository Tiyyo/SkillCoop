"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsReadNotificationSchema = void 0;
const z = require("zod");
exports.markAsReadNotificationSchema = z.object({
    notificationId: z.number().int().positive()
});
