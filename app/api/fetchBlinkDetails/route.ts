import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {

    const session = await auth();
    const user_id = session?.user?.id;

    if(!user_id){   
      return NextResponse.json(
        { success: false, message: "User not authenticated" },  
        { status: 401 } 
    )}

    const blinkDetails = await prisma.blinkSchema.findMany({
      where: { creator_id: user_id },
    });

    return NextResponse.json(blinkDetails);
 }