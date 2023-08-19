import { db } from '../helpers/database'

import { User } from './user'
import { Event } from './event'
import { Friendlist } from './friendslist'
import { Image } from './image'
import { Profile } from './profile'
import { SkillFoot } from './skill.foot'
import { Sport } from './sport'
import { ProfileOnEvent } from './profile_on_event'
import { Status } from './status'

export const user = new User(db)
export const event = new Event(db)
export const friendslist = new Friendlist(db)
export const image = new Image(db)
export const profile = new Profile(db)
export const skillFoot = new SkillFoot(db)
export const sport = new Sport(db)
export const profileOnEvent = new ProfileOnEvent(db)
export const status = new Status(db)