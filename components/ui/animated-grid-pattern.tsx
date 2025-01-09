
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedGridPatternProps {
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

export default function AnimatedGridPattern({
  numSquares = 100,
  className = "",
  maxOpacity = 0.5,
  duration = 2,
}: AnimatedGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const squares: HTMLDivElement[] = [];
    const container = containerRef.current;
    const size = 40;

    for (let i = 0; i < numSquares; i++) {
      const square = document.createElement("div");
      square.className = "absolute border border-white/10";
      square.style.width = `${size}px`;
      square.style.height = `${size}px`;
      
      const row = Math.floor(i / 10);
      const col = i % 10;
      square.style.top = `${row * size}px`;
      square.style.left = `${col * size}px`;
      
      squares.push(square);
      container.appendChild(square);
    }

    return () => {
      squares.forEach(square => square.remove());
    };
  }, [numSquares]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, maxOpacity, maxOpacity/2, maxOpacity] }}
      transition={{ duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}

