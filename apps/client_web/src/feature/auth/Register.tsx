import { useMutation } from "@tanstack/react-query";
import { signUpUserFn } from "../../api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import registerSchema from "schema";

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
      signUpUser({ email: data.email,
                  password: data.password });
      navigate("/login");
    } catch (error) { 
      console.log(error);
  }
  };

  return (
    <div>
      <button>Sign up with Google</button>
      <form onSubmit={handleSubmit(onSubmit)}>
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
