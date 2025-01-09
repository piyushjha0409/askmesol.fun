'use client'
import { Button } from "@/components/ui/button";
import { BsTwitterX } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Login } from "@/app/utils/Login";
import LoaderComponent from "@/components/loader-component";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Shield, Lock, MessageSquare, Sparkles, Users, Zap } from 'lucide-react';
import { MagicBentoGrid } from "@/components/ui/magic-bento-grid";

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/dashboard");
    return null;
  }

  if (status === "loading") {
    return <LoaderComponent />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MagicBentoGrid />
      
      <Navbar />
      
      <main className="relative">
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="inline-block"
              >
                <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/70 mb-4 inline-block backdrop-blur-md">
                  Powered by Blink on Solana
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
                Anonymous Q&A Platform
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/80">
                stealthChat revolutionizes the way creators interact with their audience. 
                Create your own AMA session where anonymity meets authenticity in a secure 
                and decentralized environment.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="flex items-center gap-2 mx-auto bg-white text-black hover:bg-white/90 transition-all duration-300"
                  size="lg"
                  onClick={Login}
                >
                  <BsTwitterX className="w-4 h-4" />
                  <span>Connect with Twitter</span>
                </Button>
              </motion.div>
            </motion.div>

            <BentoGrid>
              <BentoGridItem
                title="Anonymous & Secure"
                description="Ask questions without revealing your identity, protected by blockchain technology."
                header={
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                }
              />
              <BentoGridItem
                title="Decentralized"
                description="Built on Solana for transparency, speed, and reliability."
                header={
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                }
              />
              <BentoGridItem
                title="Creator-Focused"
                description="Engage with your audience in meaningful Q&A sessions."
                header={
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                }
              />
              <BentoGridItem
                title="Real-time Interactions"
                description="Experience seamless, instant responses powered by Solana's speed."
                header={
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                }
              />
              <BentoGridItem
                title="Community Building"
                description="Create and grow your community with meaningful interactions."
                header={
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                }
              />
              <BentoGridItem
                title="Enhanced Features"
                description="Customize your AMA experience with advanced moderation tools."
                header={
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                }
              />
            </BentoGrid>
          </div>
        </section>

        <section className="py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container mx-auto max-w-4xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Start Your AMA?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join the future of decentralized Q&A platforms and connect with your audience like never before.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-white text-black hover:bg-white/90 transition-all duration-300"
                size="lg"
                onClick={Login}
              >
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="relative py-8 text-center text-white/60 border-t border-white/10 backdrop-blur-sm">
        <p>© 2024 stealthChat. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Powered by Blink on Solana
        </p>
      </footer>
    </div>
  );
}
