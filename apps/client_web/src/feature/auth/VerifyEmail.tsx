import Page from "../../layout/Page";
import Center from "../../layout/Center";
import envelope from "../../assets/svg/envelope.svg";
import paperPlane from "../../assets/svg/paper-plane.svg";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { sendEmailVerifyFn } from "../../api/authApi";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function VerifyEmail() {
  const location = useLocation();
  const email = location.state?.email;
  const {
    mutate: sendEmailVerify,
    isSuccess,
    isLoading,
  } = useMutation((email : string) => sendEmailVerifyFn(email));

  const handleClick = () => {
    sendEmailVerify(email);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.info("A new email has been sent")
    }
  }, [isLoading]);

  return (
    <>
    <ToastContainer/>
    <Page>
      <Center>
        <div className="relative flex flex-col font-bold text-primary-1000 justify-center gap-8 text-lg bg-box px-8 py-12 shadow-lg rounded-xl">
          <img
            src={paperPlane}
            className="object-contain aspect-square h-11 absolute -top-2.5 -right-2"
          />
          <h1>An Email has been sent</h1>
          <img src={envelope} className="h-14" />
          <p>Please verify your Email</p>
        </div>
        <p className="text-xs py-4 text-primary-1100">
          Your mailbox is empty ?{" "}
          <span className="text-accent-700" onClick={handleClick}>
            click here to resend an email
          </span>
        </p>
      </Center>
    </Page>
</>
  );
}

export default VerifyEmail;
