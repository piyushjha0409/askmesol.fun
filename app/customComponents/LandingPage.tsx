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
    <div className="flex flex-col h-screen bg-black text-white">
      <AnimatedGridPattern
        numSquares={120}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
        )}
      />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="relative flex h-[500px] w-[700px] flex-col items-center justify-center overflow-hidden rounded-2xl border ">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-white dark:from-white dark:to-slate-900/10">
              <h1 className="text-4xl font-bold mb-6">
                AMA Project powered by Blink
              </h1>
              <p className="text-xl mb-8">
                Unleashing the power of questions and answers on Solana
              </p>
            </span>
            <Button
              className="flex gap-2 items-center bg-white text-black hover:bg-gray-200 cursor-pointer"
              size="lg"
              onClick={Login}
            >
              {"Sign In with Twitter"}
              <BsTwitterX />
            </Button>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm">
        <p>© 2024 AMA Project powered by Blink. All rights reserved.</p>
        <p className="mt-2">
          The best projects are built on curiosity—AMA lets the world ask, and
          innovation answers.
        </p>
      </footer>
    </div>
  );
}
