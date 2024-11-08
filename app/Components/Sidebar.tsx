"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Logout } from "../utils/Logout";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-black hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform shadow-sm shadow-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="p-4 flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-900  hover:text-slate-200 transition-colors duration-200 max-w-fit rounded-3xl"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-900  transition-colors duration-200 max-w-fit rounded-3xl"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-900  transition-colors duration-200 max-w-fit rounded-3xl"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-white hover:bg-gray-900  transition-colors duration-200 max-w-fit rounded-3xl"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          {status === "authenticated" && (
            <div className="p-4 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full text-white hover:bg-gray-900 transition-colors duration-200 hover:text-white"
                onClick={Logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
