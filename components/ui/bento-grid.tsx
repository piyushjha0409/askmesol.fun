"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  description: string;
  header: React.ReactNode;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  ...props
}: BentoGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-2xl hover:shadow-white/10 border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="p-4 h-full flex flex-col justify-between gap-4">
        <div className="group-hover/bento:translate-x-2 transition-transform duration-300">
          {header}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white mb-2 group-hover/bento:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/70 group-hover/bento:text-white/80 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

