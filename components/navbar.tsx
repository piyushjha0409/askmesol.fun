"use client";

import { Button } from "@/components/ui/button";
import { Login } from "@/app/utils/Login";
import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  const navItems = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/" 
              className="text-xl font-bold text-white hover:text-white/80 transition-colors"
            >
              stealthChat
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  href={item.href} 
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={Login}
                className="bg-white text-black hover:bg-white/90 transition-all duration-300"
              >
                Get Started
              </Button>
            </motion.div>
          </nav>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
          >
            <Button
              onClick={Login}
              className="bg-white text-black hover:bg-white/90 transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

