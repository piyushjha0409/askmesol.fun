import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export const Logout = () => {
  signOut();
  redirect("/");
};
