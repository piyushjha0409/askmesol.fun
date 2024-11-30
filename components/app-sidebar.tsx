"use client"

import * as React from "react"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { IoMdAdd } from "react-icons/io"
import { BsQuestionSquare } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logout } from "../app/utils/Logout"

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: MdOutlineSpaceDashboard },
  { title: "Create a Blink", href: "/dashboard/blink", icon: IoMdAdd },
  { title: "Questions", href: "/questions", icon: BsQuestionSquare },
]

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { status } = useSession()

  return (
    <Sidebar
      {...props}
      className="fixed inset-y-0 left-0 z-50 w-64 transform shadow-sm shadow-white"
    >
      <SidebarContent className="flex h-full flex-col bg-black text-white">
        <SidebarGroup>
          <div>
            <SidebarHeader className="font-bold">
              Ask Me Anything
              <SidebarGroupLabel>by Solana Blink</SidebarGroupLabel>
            </SidebarHeader>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="py-6">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 px-4 py-2 text-white hover:bg-gray-900 hover:text-black transition-colors duration-200 rounded-3xl"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {status === "authenticated" && (
          <div className="mt-auto border-t border-white/10 p-4">
            <Button
              variant="ghost"
              className="w-full text-white hover:bg-gray-900 transition-colors duration-200 hover:text-white"
              onClick={Logout}
            >
              <LogOut className="mr-4 h-5 w-5" />
              Sign out
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}