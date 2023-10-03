import { ZodError, AnyZodObject } from 'zod';
import registerSchema from './authentification/register';
import loginSchema from './authentification/login';
import sendVerifEmailSchema from './authentification/email';
import createEventSchema from './event/createEventSchema';
import searchFriendsSchema from './friends/searchSchema';
import createInvitationSchema from './friends/createInvitationSchema';
import updateFriendshipSchema from './friends/updateFriendshipSchema';
import inviteParticipantSchema from './participant/inviteParticipantSchema';
import updateParticipantSchema from './participant/updateParticipantSchema';
import updateEventSchema from './event/updateEventSchema';
import saveScoreSchema from './score/saveScoreSchema'

export type { AnyZodObject, ZodError }
export default {
  registerSchema,
  loginSchema,
  sendVerifEmailSchema,
  createEventSchema,
  updateEventSchema,
  searchFriendsSchema,
  createInvitationSchema,
  updateFriendshipSchema,
  inviteParticipantSchema,
  updateParticipantSchema,
  saveScoreSchema
}