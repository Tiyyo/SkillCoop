import { ZodError, AnyZodObject, ZodType, ZodTypeDef } from 'zod';
import registerSchema from './authentification/register';
import loginSchema from './authentification/login';
import createEventSchema from './event/create-event.schema';
import searchFriendsSchema from './friends/search.schema';
import createInvitationSchema from './friends/create-invitation.schema';
import updateFriendshipSchema from './friends/update-friend-relation.schema';
import inviteParticipantSchema from './participant/invite-participant.schema';
import updateParticipantSchema from './participant/update-participant.schema';
import updateEventSchema from './event/update-event.schema';
import saveScoreSchema from './score/save-score.schema'
import voteSchema from './vote/vote.schema';
import ownSkillSchema from './skills/own-skill.schema';
import participantSkillSchema from './skills/participant-skill.schema';
import emailSchema from './authentification/email';
import passwordSchema from './authentification/password';
import editProfileInfosSchema from './profile/edit-profile-infos.schema';

export type { AnyZodObject, ZodType, ZodTypeDef, ZodError }
export default {
  ZodError,
  registerSchema,
  loginSchema,
  emailSchema,
  passwordSchema,
  createEventSchema,
  updateEventSchema,
  searchFriendsSchema,
  createInvitationSchema,
  updateFriendshipSchema,
  inviteParticipantSchema,
  updateParticipantSchema,
  voteSchema,
  saveScoreSchema,
  ownSkillSchema,
  participantSkillSchema,
  editProfileInfosSchema

}