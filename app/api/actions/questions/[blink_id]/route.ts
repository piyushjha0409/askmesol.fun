// import { clusterApiUrl, Connection } from "@solana/web3.js";
import {
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

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
            href: `/api/actions/questions/${blinkId}?question={question}`,
            parameters: [
              {
                type: "text",
                name: "question",
                label: "Enter your question",
                required: true,
              },
            ],
          },
        ],
      },
      type: "action",
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

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  //assuming the body has the account and the question parameters
  try {
    const { pathname } = new URL(req.url);
    const pathSegments = pathname.split("/");
    const blinkId = pathSegments[4];
    const body = await req.json();

    const userAddress = new PublicKey(body.account);
    const url = new URL(req.url);
    const question = url.searchParams.get("question");

    //check the cretor dertails with the blinkId first
    const blinkDetails = await prisma.blinkSchema.findUnique({
      where: { id: blinkId },
    });

    if (!blinkDetails) {
      return new Response(
        JSON.stringify({ error: "Couldn't find the Blink data!" }),
        {
          status: 404,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const creatorAddress = new PublicKey(blinkDetails.walletAddress);
    const askingFee = blinkDetails.askingFee;

    const totalFee = askingFee * LAMPORTS_PER_SOL;

    //make the transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userAddress,
        toPubkey: creatorAddress,
        lamports: totalFee,
      })
    );

    transaction.feePayer = userAddress;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: "Successfully sent the quetion to the creator",
        links: {
          next: {
            type: "post",
            href: `/api/actions/saveAma?question=${question}&blinkId=${blinkId}`,
          },
        },
      },
    });

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error processing request:", error);
  }
  return new Response("Hello, Next.js!");
};

