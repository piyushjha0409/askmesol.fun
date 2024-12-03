"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderComponent from "@/components/LoaderComponent";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import ShineBorder from "@/components/ui/shine-border";

export default function UserDashboard() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-black">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-black text-white"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mb-8 text-4xl font-bold"
      >
        <TypewriterEffectSmooth
          words={[
            { text: "Ask me anything", className: "text-primary text-white" },
          ]}
        />
      </motion.h1>
      <ShineBorder
        className="rounded-lg overflow-hidden bg-black text-white"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="mb-8 rounded-lg  p-6 text-center"
        >
          <p className="text-lg">Welcome to your Creator dashboard!</p>
          <p className="mt-2 text-sm text-gray-400">
            Here you can manage your account and access exclusive features.
          </p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push("/dashboard/blink")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Create a Blink
          </Button>
        </motion.div>
      </ShineBorder>
    </motion.div>
  );
}
