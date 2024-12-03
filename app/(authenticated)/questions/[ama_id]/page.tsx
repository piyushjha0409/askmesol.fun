"use client";

import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, User } from "lucide-react";
import ShineBorder from "@/components/ui/shine-border";
import { BsTwitterX } from "react-icons/bs";
import LoaderComponent from "@/components/LoaderComponent";

interface BlinkData {
  blinkId: string;
  creatorId: string;
  id: string;
  question: string;
  userAddress: string;
}

export default function Page({ params }: { params: { ama_id: string } }) {
  const [blinkData, setBlinkData] = useState<BlinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlinkData = async () => {
      try {
        const response = await fetch(`/api/fetchAma/?ama_id=${params.ama_id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Blink data");
        }

        const data = await response.json();
        setBlinkData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlinkData();
  }, [params.ama_id]);

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-black">
        <LoaderComponent />
      </div>
    );
  }

  if (error) {
    return (
      <SidebarInset className="bg-black text-white">
        <div className="flex items-center justify-center h-screen">
          <div className="text-red-400">Error: {error}</div>
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset className="bg-black text-white min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-700" />
        <Breadcrumb className="p-2 bg-black">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard/questions"
                className="hover:text-blue-400 transition-colors"
              >
                All Blinks
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-white">
                Blink #{blinkData[0]?.blinkId || "Loading..."}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-12 w-full p-6">
          {blinkData.map((blink) => (
            <ShineBorder
              key={blink.id}
              className="rounded-xl overflow-hidden bg-black text-white"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <Card className="bg-black backdrop-blur-sm border-none">
                <CardHeader className="pb-2">
                  <div className=" min-w-[300px] flex items-center justify-between">
                    <div className="flex items-center justify-between gap-3">
                      <div className="bg-gray-800 rounded-full p-2">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white font-mono">
                        {blink.userAddress.slice(0, 6)}...
                        {blink.userAddress.slice(-4)}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        ID: {blink.id}
                      </span>
                    </div> */}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                    <p className="text-xl text-gray-100 leading-relaxed">
                      {blink.question}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4">
                  {/* <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">Blink #{blink.blinkId}</span>
                </div> */}
                  <Button
                    variant="outline"
                    className="bg-white text-black hover:bg-blue-500 hover:text-white border-0 flex items-center gap-2"
                  >
                    <div className="text-lg font-semibold">Answer on</div>
                    <BsTwitterX className="h-2 w-2" />
                  </Button>
                </CardFooter>
              </Card>
            </ShineBorder>
          ))}
        </div>
      </div>
    </SidebarInset>
  );
}
