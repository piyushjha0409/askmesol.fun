"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const MagicBentoGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const gridItems = Array.from({ length: 20 }, (_, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    return { row, col };
  });

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed inset-0 -z-10 opacity-40"
    >
      <div className="absolute inset-0 bg-black" />
      <div className="relative grid h-full grid-cols-4 gap-1 overflow-hidden p-2">
        {gridItems.map((item, idx) => {
          const distance = isHovered
            ? Math.sqrt(
                Math.pow(item.row * 150 - mousePosition.y, 2) +
                Math.pow(item.col * 150 - mousePosition.x, 2)
              )
            : 0;
          const scale = isHovered
            ? Math.max(0.1, 1 - distance / 500)
            : 0.5 + Math.random() * 0.5;

          return (
            <motion.div
              key={idx}
              className="relative h-full w-full rounded-lg bg-gradient-to-br from-white/10 to-white/5"
              animate={{
                scale,
                opacity: isHovered ? scale : 0.3 + Math.random() * 0.3,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.5,
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-black/50 backdrop-blur-sm" />
            </motion.div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
  );
};

