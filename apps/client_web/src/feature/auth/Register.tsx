import { useMutation } from "@tanstack/react-query";
import { signUpUserFn } from "../../api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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

function Register() {
  const { mutate: signUpUser } = useMutation((userData) =>
    signUpUserFn(userData)
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      signUpUser({ email: data.email, password: data.password });
      navigate("/login");
    } catch (error) { 
      console.log(error);
  }
  };

  return (
    <div>
      <button>Sign up with Google</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {console.log(errors)}
        <input type="text" placeholder="email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="confirm password"
          {...register("confirmedPassword")}
        />
        <label htmlFor="termsAndService">
          Accept terms and service
          <input type="checkbox" value="on" {...register("termAndService")} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
