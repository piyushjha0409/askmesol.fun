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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Home, User, MessageCircle } from "lucide-react";
import ShineBorder from "@/components/ui/shine-border";
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
          <p>Error: {error}</p>
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset className="bg-black text-white">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-700" />
        <Breadcrumb className="p-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard/blinks"
                className="flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/questions" className="flex items-center">
                <span>All Blinks</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Blink ID: {blinkData[0]?.blinkId || "Loading..."}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 p-6">
        {blinkData.map((blink) => (
          <ShineBorder
            key={blink.id}
            className="rounded-lg overflow-hidden bg-black text-white"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Card className="bg-black text-white border-gray-800 h-full w-full min-w-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <User className="h-6 w-6 mr-2" />
                  <span className="text-sm text-blue-400">
                    {blink.userAddress.slice(0, 6)}...
                    {blink.userAddress.slice(-4)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex">
                  <div className="relative h-48 w-48 bg-gray-800 rounded-md flex items-center justify-center">
                    <MessageCircle className="h-12 w-12 text-gray-600" />
                  </div>
                  <div>
                    <div className="w-full flex items-center justify-between border-gray-800"></div>
                    <p className="text-xl font-semibold text-gray-300 p-4">
                      {blink.question}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ShineBorder>
        ))}
      </div>
    </SidebarInset>
  );
}
