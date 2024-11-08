import {
  Transaction,
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import {
  createPostResponse,
  ActionGetResponse,
  ActionPostResponse,
  ActionPostRequest,
} from "@solana/actions";

// import { prisma } from "@/prisma";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// const yourProgramId = new PublicKey('ProgramId here')

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    icon: "https://hive.io/",
    title: "Ask Me Anything!",
    description: "This is Ask me anything blink",
    label: "Click me!",
    error: {
      message: "This blink is not implemented yet!",
    },
  };

  return Response.json(response);
}

export async function POST(request: Request) {
  const payload: ActionPostRequest = await request.json();
  const userPubKey = payload.account;
  console.log("This is the user public key", userPubKey);

  const response: ActionPostResponse = {
    transaction: "",
    message: `Hello ${userPubKey}`,
  };

  return Response.json(response);
}
