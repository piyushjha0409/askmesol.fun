import { prisma } from "@/prisma";
import {
  ActionError,
  CompletedAction,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";

export const GET = async () => {
  return Response.json(
    { message: "Method not supported" },
    {
      headers: ACTIONS_CORS_HEADERS,
    }
  );
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const url = new URL(req.url);

    const question = url.searchParams.get("question");
    const blinkId = url.searchParams.get("blinkId");

    const userAddress = body.account;

    if (!blinkId) {
      return new Response(
        JSON.stringify({ error: "Couldn't find the Blink data!" }),
        {
          status: 404,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

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
    if (!question) {
      return new Response(JSON.stringify({ error: "Question not found" }), {
        status: 404,
        headers: ACTIONS_CORS_HEADERS,
      });
    }
    if (!userAddress) {
      return new Response(JSON.stringify({ error: "User Address not found" }), {
        status: 404,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    await prisma.questionSchema.create({
      data: {
        creator_id: blinkDetails?.creator_id,
        question: question,
        userAddress: userAddress,
        blinkId: blinkId,
        //TODO: to send the fee in the schema
        fee: 0
      },
    });

    const payload: CompletedAction = {
      type: "completed",
      title: "Operation  Successful",
      label: "Completed",
      icon: "🎉",
      description: `You have successfully joined the tournament`,
    };

    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.error("General error:", err);
    const actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err === "string") actionError.message = err;
    return new Response(JSON.stringify(actionError), {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
