// import { clusterApiUrl, Connection } from "@solana/web3.js";
import { ACTIONS_CORS_HEADERS } from "@solana/actions";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const GET = async (req: Request) => {
  try {
    // Extract the `blinkId` from the URL path
    const { pathname } = new URL(req.url);
    const pathSegments = pathname.split("/");
    const blinkId = pathSegments[4];

    // Find the Blink data using the `blinkId`
    const blinkData = await prisma.blinkSchema.findUnique({
      where: { id: blinkId },
    });

    if (!blinkData) {
      return new Response(
        JSON.stringify({ error: "Couldn't find the Blink data!" }),
        {
          status: 404,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    // Construct the payload
    const payload = {
      icon: blinkData.blinkImageUrl, // Assuming the correct field is `blinkImage`
      title: blinkData.title,
      description: "Tip: Bid more SOL to get the quickest response possible!",
      label: "Ask",
      links: {
        actions: [
          {
            label: "Ask",
            href: `/api/actions/questions/${blinkId}`,
            parameters: [
              {
                type: "text",
                name: "Ask your Question",
                label: "Enter your question",
                required: true,
              },    
            ],
          },
        ],
      },
    };

    return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.error("Error processing request:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
