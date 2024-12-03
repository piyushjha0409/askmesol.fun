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
import { ChevronRight, Home, User } from 'lucide-react';

interface BlinkData {
  blinkId: string;
  creatorId: string;
  id: string;
  question: string;
  userAddress: string;
}

export default function Page() {
  const [blinkData, setBlinkData] = useState<BlinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlinkData = async () => {
      try {
        const response = await fetch(`/api/fetchAma`, {
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
  }, []);

  if (loading) {
    return (
      <SidebarInset className="bg-black text-white">
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </SidebarInset>
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">All Blinks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {blinkData.map((blink) => (
          <Card key={blink.blinkId} className="bg-gray-900 text-white border-gray-800 w-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400">
                  {blink.userAddress.slice(0, 6)}...{blink.userAddress.slice(-4)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">Question:</p>
              <p className="text-lg text-gray-300">{blink.question}</p>
              <div className="mt-4 text-sm text-gray-500">
                Ama ID: {blink.blinkId}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SidebarInset>
  );
}

