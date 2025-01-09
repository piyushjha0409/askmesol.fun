"use client";

import { motion } from "framer-motion";

export default function LoaderComponent() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <motion.div
        className="w-16 h-16 border-4 border-white rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

