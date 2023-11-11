'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateParticipantSchema = exports.inviteParticipantSchema = void 0;
const z = require('zod');
exports.inviteParticipantSchema = z.object({
  event_id: z.number().int().positive(),
  ids: z.array(z.number()),
});
exports.updateParticipantSchema = z.object({
  event_id: z.number().int().positive(),
  profile_id: z.number().int().positive(),
  status_name: z.enum(['confirmed', 'declined', 'pending']),
});
