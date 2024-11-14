import { uploadImage } from "@/app/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create an API route handler
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!file || !folder) {
    return new Response(JSON.stringify({ error: "Missing file or folder" }), {
      status: 400,
    });
  }

  try {
    const imageUrl = await uploadImage(file as File, folder as string);
    return new Response(JSON.stringify({ url: imageUrl }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "An unknown error occurred" }),
        {
          status: 500,
        }
      );
    }
  }
}