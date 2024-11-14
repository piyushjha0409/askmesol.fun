"use client"

import * as React from "react"
import {ChevronRightIcon, File, Folder, LogOut, Menu, X } from "lucide-react"
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
  SidebarRail,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import { Logout } from "../app/utils/Logout"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: MdOutlineSpaceDashboard },
  { title: "Create a Blink", href: "/dashboard/blink", icon: IoMdAdd },
  { title: "Questions", href: "/questions", icon: BsQuestionSquare },
]

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { status } = useSession()

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-black hover:text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <Sidebar
        {...props}
        className={`fixed inset-y-0 left-0 z-50 w-64 transform shadow-sm shadow-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent className="flex h-full flex-col bg-black text-white">
          <div className="flex items-center justify-between border-b border-white/10 p-4 md:hidden">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
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
        <SidebarRail />
      </Sidebar>
    </>
  )
}

function Tree({
    item,
  }: {
    item: string | (string | (string | (string | string[])[])[])[];
  }) {
    const [name, ...items] = Array.isArray(item) ? item : [item];
  
    if (!items.length) {
      return (
        <SidebarMenuButton
          isActive={name === "button.tsx"}
          className="data-[active=true]:bg-transparent"
        >
          <File className="mr-2 h-4 w-4" />
          {name}
        </SidebarMenuButton>
      );
    }
  
    return (
      <SidebarMenuItem>
        <Collapsible
          className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          defaultOpen={name === "components" || name === "ui"}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <ChevronRightIcon className="mr-2 h-4 w-4 transition-transform" />
              <Folder className="mr-2 h-4 w-4" />
              {name}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {items.map((subItem, index) => (
                <Tree key={index} item={subItem} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    );
  }
  