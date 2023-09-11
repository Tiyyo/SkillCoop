import * as z from "zod";

const registerSchema = z
  .object({
    email: z.string().email({ message: "This is not an valid email" }),
    password: z
      .string()
      .min(8, { message: "Must contains at least 8 characters" })
      .max(36, { message: "Must be 36 or fewer characters long" })
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


export default registerSchema;