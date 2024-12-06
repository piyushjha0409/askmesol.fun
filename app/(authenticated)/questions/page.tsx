"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
import { ChevronRight, Home, DollarSign } from "lucide-react";
import ShineBorder from "@/components/ui/shine-border";
import LoaderComponent from "@/components/LoaderComponent";
import Link from "next/link";
import { useSession } from "next-auth/react";
import router from "next/navigation";

interface BlinkData {
  id: string;
  creator_id: string;
  title: string;
  walletAddress: string;
  blinkImageUrl: string;
  askingFee: string;
}

export default function Page() {
  const [blinkData, setBlinkData] = useState<BlinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlinkData = async () => {
      try {
        const response = await fetch(`/api/fetchBlinkDetails`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Blink data");
        }

        const data = await response.json();
        console.log("this is the data", data);
        setBlinkData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlinkData();
  }, []);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.redirect("/");
    },
  });

  if (status === "loading" || loading) {
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
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-16 md:px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-700" />
        <Breadcrumb className="p-2 bg-black">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-white">
                All Blinks
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="grid lg:grid-cols-3 gap-6 p-6">
        {blinkData.map((blink) => (
          <ShineBorder
            key={blink.id}
            className="rounded-lg overflow-hidden bg-black"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <Card className="bg-black text-white h-full cursor:pointer border-none md:min-w-[500px]">
              <Link href={`/questions/${blink.id}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold truncate">
                      {blink.title}
                    </span>
                    <span className="text-sm text-blue-400">
                      {blink.walletAddress.slice(0, 6)}...
                      {blink.walletAddress.slice(-4)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative h-48 w-full">
                    <Image
                      src={blink.blinkImageUrl}
                      alt={blink.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Blink ID: {blink.id}
                    </span>
                    <div className="flex items-center text-green-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{blink.askingFee}</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </ShineBorder>
        ))}
      </div>
    </SidebarInset>
  );
}
