"use client";

import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { BsTwitterX } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Login } from "../utils/Login";
import LoaderComponent from "@/components/LoaderComponent";

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  if (status === "loading") {
    return <LoaderComponent />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <AnimatedGridPattern
        numSquares={120}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "absolute inset-x-0 inset-y-[-30%] h-[160%] skew-y-12 md:block pointer-events-none"
        )}
      />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md md:max-w-xl">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border p-6 md:h-[500px] md:w-[700px] mx-auto">
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                AMA powered by Blink
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8">
                Unleashing the power of questions and answers on Solana
              </p>
            </div>
            <Button
              className="flex gap-2 items-center bg-white text-black hover:bg-gray-200 cursor-pointer"
              size="lg"
              onClick={Login}
            >
              Sign In with Twitter
              <BsTwitterX />
            </Button>
            <BorderBeam 
              size={250} 
              duration={12} 
              delay={9} 
              className="hidden md:block" 
            />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm px-4">
        <p>© 2024 AMA Project powered by Blink. All rights reserved.</p>
        <p className="mt-2 text-xs md:text-sm">
          The best projects are built on curiosity—AMA lets the world ask, and
          innovation answers.
        </p>
      </footer>
    </div>
  );
}

