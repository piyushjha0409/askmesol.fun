"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BentoGridBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-black">
      <div className="absolute h-full w-full">
        <div className="relative h-full w-full">
          <div className="absolute inset-0">
            <div className="grid h-full grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="relative col-span-1 h-full rounded-xl bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 backdrop-blur-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

