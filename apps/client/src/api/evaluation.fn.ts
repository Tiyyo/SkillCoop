import { OwnSkill } from 'packages/schema/src';
import { api } from './api.fn';
import type {
  EvaluationParticipantSkill,
  ProfileEval,
  Vote,
} from '@skillcoop/types/src';

export const getProfileEvalFn = async (
  profileId: string,
): Promise<ProfileEval> => {
  const response = await api.get(`api/skills/profile/${profileId}`);
  return response.data;
};

export const getAverageSkillFn = async (data: {
  rater_id: string;
  reviewee_id: string;
  event_id: number;
}) => {
  const response = await api.get(`api/skills/event`, { params: data });
  return response.data;
};

export const evaluateParticipantSkillsFn = async (
  data: EvaluationParticipantSkill,
) => {
  const response = await api.post(`api/skills/event`, data);
  return response.data;
};

export const evaluateOwnSkillsFn = async (data: OwnSkill) => {
  const response = await api.post(`api/skills`, data);
  return response.data;
};

export const voteMvpFn = async (data: Vote) => {
  const response = await api.post(`api/mvp`, data);
  return response.data;
};

export const voteBestStrikerFn = async (data: Vote) => {
  const response = await api.post(`api/best-striker`, data);
  return response.data;
};
