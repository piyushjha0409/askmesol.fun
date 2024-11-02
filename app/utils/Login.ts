import { signIn } from "next-auth/react";

export const Login = () => {
  signIn("twitter", {
    callbackUrl: "/dashboard",
  });
};
