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
exports.registerSchema = exports.resetPasswordSchema = exports.passwordUpdateSchema = exports.loginSchema = exports.updateEmailSchema = exports.emailSchema = void 0;
const z = __importStar(require("zod"));
exports.emailSchema = z.object({
    email: z.string().email(),
});
exports.updateEmailSchema = z.object({
    email: z.string().email(),
    user_id: z.number().positive().int(),
});
exports.loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});
exports.passwordUpdateSchema = z
    .object({
    old_password: z.string(),
    new_password: z
        .string()
        .min(8, { message: 'Must contain at least 8 characters' })
        .max(64, { message: 'Must contain at most 64 characters' })
        .trim()
        .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: 'Must contain one lowercase',
    })
        .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: 'Must contain one uppercase',
    })
        .refine((value) => /\d/.test(value), {
        message: 'Must contain one number',
    })
        .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: 'Must contain one special character',
    }),
    confirm_new_password: z.string(),
})
    .refine((data) => data.old_password !== data.new_password, {
    message: 'Your new password has to be different than the new one',
    path: ['old_password'],
})
    .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'Passwords do not match',
    path: ['confirm_new_password'],
});
exports.resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Must contain at least 8 characters' })
        .max(64, { message: 'Must contain at most 64 characters' })
        .trim()
        .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: 'Must contain one lowercase',
    })
        .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: 'Must contain one uppercase',
    })
        .refine((value) => /\d/.test(value), {
        message: 'Must contain one number',
    })
        .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: 'Must contain one special character',
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
exports.registerSchema = z
    .object({
    email: z.string().email({ message: 'This is not an valid email' }),
    password: z
        .string()
        .min(8, { message: 'Must contain at least 8 characters' })
        .max(64, { message: 'Must contain at most 64 characters' })
        .trim()
        .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: 'Must contain one lowercase',
    })
        .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: 'Must contain one uppercase',
    })
        .refine((value) => /\d/.test(value), {
        message: 'Must contain one number',
    })
        .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: 'Must contain one special character',
    }),
    confirmedPassword: z.string(),
    termAndService: z.string().transform((value) => value === 'on'),
})
    .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords don't match !",
    path: ['confirm'],
});
//# sourceMappingURL=authentification.js.map