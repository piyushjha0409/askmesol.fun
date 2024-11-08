import { LoginForm } from "@/components/login-form";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-black">
      <div className="flex">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
