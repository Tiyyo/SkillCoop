"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.passwordUpdateSchema = exports.loginSchema = exports.emailSchema = void 0;
const z = require("zod");
exports.emailSchema = z.object({
    email: z.string().email(),
});
exports.loginSchema = z.object({
    email: z.string(),
    password: z.string()
});
exports.passwordUpdateSchema = z.object({
    old_password: z.string(),
    new_password: z.string()
        .min(8, { message: "Must contains at least 8 characters" })
        .trim()
        .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: "Must contain one lowercase",
    })
        .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: "Must contain one uppercase",
    })
        .refine((value) => /\d/.test(value), {
        message: "Must contain one number",
    })
        .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: "Must containe one special character",
    }),
    confirm_new_password: z.string(),
}).refine(data => data.new_password === data.confirm_new_password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
exports.registerSchema = z
    .object({
    email: z.string().email({ message: "This is not an valid email" }),
    password: z
        .string()
        .min(8, { message: "Must contains at least 8 characters" })
        .trim()
        .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: "Must contain one lowercase",
    })
        .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: "Must contain one uppercase",
    })
        .refine((value) => /\d/.test(value), {
        message: "Must contain one number",
    })
        .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: "Must containe one special character",
    }),
    confirmedPassword: z.string(),
    termAndService: z.string().transform((value) => value === "on"),
})
    .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords don't match !",
    path: ["confirm"],
});
