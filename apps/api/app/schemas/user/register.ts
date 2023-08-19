import * as z from "zod";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Must contains at least 8 characters" })
        .max(36, { message: "Must be 36 or fewer characters long" })
        .trim()
        .refine((value: string) => /\w*[a-z]\w*/.test(value), {
            message: "Must contain one lowercase",
        })
        .refine((value: string) => /\w*[A-Z]\w*/.test(value), {
            message: "Must contain one uppercase",
        })
        .refine((value: string) => /\d/.test(value), {
            message: "Must contain one number",
        })
        .refine((value: string) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
            message: "Must containe one special character",
        }),
})

export default registerSchema;