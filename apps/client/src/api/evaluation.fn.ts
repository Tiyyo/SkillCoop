import { api } from './api.fn';
import type {
  EvaluationOwnSkill,
  EvaluationParticipantSkill,
  ProfileEval,
  Vote,
} from '@skillcoop/types/src';

export const getProfileEvalFn = async (
  profileId: number,
): Promise<ProfileEval> => {
  const response = await api.get(`api/skill_foot/${profileId}`);
  return response.data;
};

export const getAverageSkillFn = async (data: {
  rater_id: number;
  reviewee_id: number;
  event_id: number;
}) => {
  const response = await api.get(`api/skill_foot/event`, { params: data });
  return response.data;
};

export const evaluateParticipantSkillsFn = async (
  data: EvaluationParticipantSkill,
) => {
  const response = await api.post(`api/skill_foot/event`, data);
  return response.data;
};

export const evaluateOwnSkillsFn = async (data: EvaluationOwnSkill) => {
  const response = await api.post(`api/skill_foot`, data);
  return response.data;
};

export const voteMvpFn = async (data: Vote) => {
  const response = await api.post(`api/mvp`, data);
  return response.data;
};

export const voteBestStrikerFn = async (data: Vote) => {
  const response = await api.post(`api/best_striker`, data);
  return response.data;
};
