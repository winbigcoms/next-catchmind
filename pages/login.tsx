import { LoginContainer } from "src/container/login";
import { useSelector } from "react-redux";
import rootReducer from "../store/modules/index";
import { useEffect } from "react";
import { useRouter } from "next/router";

export type RootState = ReturnType<typeof rootReducer>;

const Login = () => {
  const login = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (login.name) {
      router.push("/game");
    }
  }, [login.name]);
  return <LoginContainer />;
};

export default Login;
