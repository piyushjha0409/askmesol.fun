import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  imageFile: File,
  base64String: string
): Promise<string> {
  if (!process.env.CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Cloundinary upload preset is not defined!");
  }

  //preparing the base64 encoding
  const trimmedValue = base64String.trim();

  try {
    const result = await cloudinary.uploader.upload(
      `data:${imageFile.type}; base64, ${trimmedValue}`,
      {
        folder: "blinkImage",
        resource_type: "image",
        public_id: randomUUID(),
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "",
      }
    );

    return result.secure_url || "";
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
}
