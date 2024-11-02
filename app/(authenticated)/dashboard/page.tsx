"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UserDashboard() {
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
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center bg-black text-white"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mb-8 text-4xl font-bold"
      >
        User Dashboard
      </motion.h1>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mb-8 rounded-lg bg-gray-800 p-6 text-center"
      >
        <p className="text-lg">Welcome to your personalized dashboard!</p>
        <p className="mt-2 text-sm text-gray-400">
          Here you can manage your account and access exclusive features.
        </p>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={logOut}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Sign Out
        </Button>
      </motion.div>
    </motion.div>
  );
}
