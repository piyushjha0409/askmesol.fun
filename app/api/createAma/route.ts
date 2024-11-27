import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { uploadImage } from "@/app/lib/cloudinary";

export async function POST(req: Request) {
  try {
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

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Parse the form data
    const formData = await req.formData();

    const imageFile = formData.get("image") as File;
    const title = formData.get("title") as string;
    const walletAddress = formData.get("walletAddress") as string;

    // Validate input
    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "Image file is required" },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, message: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const blinkImageUrl = await uploadImage(imageFile);

    // Create the Blink entry
    const blink = await prisma.blinkSchema.create({
      data: {
        creator_id: userId,
        title,
        walletAddress,
        blinkImageUrl: blinkImageUrl,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Blink created successfully",
        blink_id: blink.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
