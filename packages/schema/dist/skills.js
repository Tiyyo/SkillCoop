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
exports.participantSkillSchema = exports.ownSkillSchema = void 0;
const z = __importStar(require("zod"));
exports.ownSkillSchema = z.object({
    defending: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    dribbling: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    pace: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    passing: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    shooting: z.enum(['beginner', 'novice', 'intermediate', 'advanced', 'expert']),
    profile_id: z.number().int().positive(),
});
exports.participantSkillSchema = z.object({
    event_id: z.number().int().positive(),
    rater_id: z.number().int().positive(),
    reviewee_id: z.number().int().positive(),
    pace: z.number().min(10).max(100),
    shooting: z.number().min(10).max(100),
    passing: z.number().min(10).max(100),
    dribbling: z.number().min(10).max(100),
    defending: z.number().min(10).max(100),
});
//# sourceMappingURL=skills.js.map