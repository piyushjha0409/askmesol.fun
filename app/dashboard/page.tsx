"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { status } = useSession();

  function logOut() {
    signOut();
    router.push("/");
  }

  if (status === "unauthenticated") {
    redirect("/");
  }

  if (status === "loading") {
    return <div className="flex">Loading....</div>;
  }

  return (
    <div>
      <div className="flex">This is the user dashboard</div>
      <Button onClick={() => logOut()}>Sign Out</Button>
    </div>
  );
};

export default Page;
