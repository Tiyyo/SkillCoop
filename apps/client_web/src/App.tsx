import { useMutation } from "@tanstack/react-query";
import "./App.css";
import { useStateContext } from "./context/app.context";
import { loginUserFn, logoutUserFn } from "./api/authApi";

function App() {
  // const navigate = useNavigate();
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  //logout
  // const { mutate: logoutUser, isLoading } = useMutation(
  //   async () => await logoutUserFn(),
  //   {
  //     onSuccess: (data) => {
  //       window.location.href = "/login";
  //     },
  //     onError: (error: any) => {
  //       if (Array.isArray(error.response.data.error)) {
  //         error.data.error.forEach((el: any) => console.log(el.message));
  //       } else {
  //         console.log(error.response.data.message);
  //       }
  //     },
  //   }
  // );

  // const onLogoutHandler = async () => {
  //   logoutUser();
  // };

  const {
    mutate: loginUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation((userData) => loginUserFn(userData), {
    onSuccess: () => {
      // query.refetch();
      console.log("isSuccess");
    },
  });
  // const {
  //   isSuccess,
  //   isLoading,
  //   refetch,
  //    isError,
  //    error,
  //    data
  //   } = useQuery(['authUser'], getMeFn, {
  //    enabled: false,
  //    select: (data) => {},
  //    retry: 1,
  //    onSuccess: (data) => {},
  //    onError: (error) => {},
  //  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const dataToSend = {
      email: "example@example.com",
      password: "@Azerty10",
    };

    loginUser(dataToSend);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" />
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
