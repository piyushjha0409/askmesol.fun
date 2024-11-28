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
import Image from "next/image";

export default function Page() {
  const [blinkData, setBlinkData] = useState<{
    icon: string;
    title: string;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlinkData = async () => {
      try {
        const blinkId = sessionStorage.getItem("blinkId");
        console.log("This is from session storage --> ", blinkId);

        const response = await fetch(`/api/actions/questions/${blinkId}`, {
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
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{blinkData?.title || "Blink"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/10 flex items-center justify-center">
            {blinkData?.icon ? (
              <Image
                src={blinkData.icon}
                alt={blinkData.title}
                width={112}
                height={112}
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <p>No Image</p>
            )}
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/10 md:min-h-min p-4">
          <h1 className="text-2xl font-bold">{blinkData?.title}</h1>
          <p className="mt-4">{blinkData?.description}</p>
        </div>
      </div>
    </SidebarInset>
  );
}
