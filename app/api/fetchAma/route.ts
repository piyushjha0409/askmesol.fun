import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

//This route will fetch all the blinks answer from a user through twitter we have to fetch it and show it on the page
export const GET = async () => {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user?.id;

  const AmaQuestions = await prisma.questionSchema.findMany({
    where: {
      creator_id: userId,
    },
  });

  console.log("Data of the questions -->", AmaQuestions)

  return NextResponse.json(AmaQuestions);
};
