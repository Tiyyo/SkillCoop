import { useMutation } from "@tanstack/react-query";
import { signUpUserFn } from "../../api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import schemas from "schema";
import Page from "../../layout/Page";
import Center from "../../layout/Center";
import SocialButton from "../../component/social-link";
import Google from "../../assets/icon/Google";
import getGoogleUrl from "../../utils/getGoogleUrl";
import SeparatorLine from "../../component/seperator-line";
import FormField from "../../component/form-field";
import Atsign from "../../assets/icon/Atsign";
import EyeIcon from "../../assets/icon/Eye";
import EyeSlash from "../../assets/icon/EyeSlash";
import Button from "../../component/button";
const { registerSchema } = schemas

function Register() {
  const { mutate: signUpUser } = useMutation((userData) =>
    signUpUserFn(userData)
  );
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // signUpUser({ email: data.email, password: data.password });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <Center>
          <h1 className="py-4 text-xl font-bold text-primary-1100 text-center">Create your SkillCoop account</h1>
        <div className="flex flex-col w-[90%] max-w-lg bg-base-light py-12 px-6 rounded-lg">
          <SocialButton value="Continue with google" href={getGoogleUrl(from)}>
            <Google />
          </SocialButton>
          <SeparatorLine />
          <form className="flex flex-col items-center gap-y-5" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              type="email"
              name="email"
              label="Email"
              error={errors.email?.message}
              register={register}
            >
              <Atsign />
            </FormField>
            <FormField
              type="password"
              name="password"
              label="Password"
              subicon={<EyeSlash />}
              error={errors.password?.message}
              register={register}
            >
              <EyeIcon />
            </FormField>
            <p></p>
            <label htmlFor="termsAndService" className="text-xs text-opacity-70 text-center inline ">
              <input
                type="checkbox"
                value="on"
                className="mr-1"
                {...register("termAndService")}
              />
              By signing up, you agree to the<Link to="/terms-and-service" className="underline underline-offset-2 ml-1 text-primary-800 inline">terms and service</Link>
            </label>
            <Button textContent="Register" type="submit" />
          </form>
        </div>
         <p className="text-xs py-2">Already have an account ? <Link to="/login" className="text-primary-1000 font-bold">Log in</Link></p>
      </Center>
    </Page>
  );
}

export default Register;
