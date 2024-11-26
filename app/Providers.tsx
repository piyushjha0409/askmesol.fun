"use client";
import { SessionProvider } from "next-auth/react";
import  AppWalletProvider  from "./context/AppWalletProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppWalletProvider>{children}</AppWalletProvider>
    </SessionProvider>
  );
}
