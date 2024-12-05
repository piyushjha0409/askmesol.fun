//TODO: Figure out a way to manage the screenshot for the page so that we can share it on the twitter
"use client";

import { useEffect, useRef, useState } from "react";
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
import { toPng } from 'html-to-image';
import router from "next/router";
import { useSession } from "next-auth/react";

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

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
          <div className="text-red-400">Error: {error}</div>
        </div>
      </SidebarInset>
    );
  }

  const handleAnswerOnX = async (index: number) => {
    const cardElement = cardRefs.current[index];

    if (!cardElement) return;

    try {
      // Generate screenshot of the card
      const dataUrl = await toPng(cardElement, {
        quality: 1,
        pixelRatio: 2,
        height: cardElement.scrollHeight,
        width: cardElement.scrollWidth,
      });

      // Prepare tweet text
      const tweetText = encodeURIComponent(
        `Answering a user question: ${blinkData[index].question}\n\nAsked by: ${blinkData[index].userAddress}`
      );
  
      // Open X with the screenshot and pre-filled tweet
      const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(
        dataUrl
      )}`;

      window.open(xShareUrl, "_blank");
    } catch (error) {
      console.error("Failed to capture screenshot", error);
      // Fallback to just opening X if screenshot fails
      const tweetText = encodeURIComponent(
        `Answering a user question: ${blinkData[index].question}`
      );
      const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(xShareUrl, "_blank");
    }
  };

  return (
    <SidebarInset className="bg-black text-white min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 md:px-4 px-12">
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
                href="/questions"
                className="hover:text-blue-400 transition-colors"
              >
                All Blinks
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-white text-xs md:text-md">
                {blinkData[0]?.blinkId || "Loading..."}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex w-full justify-center">
        <div className="grid lg:grid-cols-3 gap-12 p-4">
          {blinkData.map((blink, index) => (
            <ShineBorder
              key={blink.id}
              className="rounded-xl overflow-hidden bg-black text-white"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <Card
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="bg-black backdrop-blur-sm border-none"
              >
                <CardHeader className="pb-2">
                  <div className=" md:min-w-[300px] flex items-center justify-between">
                    <div className="flex items-center justify-between gap-3">
                      <div className="bg-gray-800 rounded-full p-2">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white font-mono">
                        {blink.userAddress.slice(0, 6)}...
                        {blink.userAddress.slice(-4)}
                      </span>
                    </div>
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
                  <Button
                    variant="outline"
                    className="bg-white text-black hover:bg-blue-500 hover:text-white border-0 flex items-center gap-2"
                    onClick={() => handleAnswerOnX(index)}
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
