import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

//This route will fetch all the blinks answer from a user through twitter we have to fetch it and show it on the page
export const GET = async (request: Request) => {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user?.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User ID not found in session" },
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const amaId = url.searchParams.get("ama_id");

  if (!amaId) {
    return NextResponse.json(
      { success: false, message: "User ID not found in session" },
      { status: 400 }
    );
  }

  const AmaQuestions = await prisma.questionSchema.findMany({
    where: {
      blinkId: amaId,
    },
  });

  console.log("Data of the questions -->", AmaQuestions);

  return NextResponse.json(AmaQuestions);
};
