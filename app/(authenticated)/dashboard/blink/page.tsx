"use client";
import { LoginForm, BlinkFormData } from "@/components/login-form";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Page = () => {

  const {toast} = useToast()

  const [formData, setFormData] = useState<BlinkFormData>({
    title: "",
    walletAddress: "",
    blinkImage: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blinkId, setBlinkId] = useState<string>("");
  const [blinkUrl, setBlinkUrl] = useState<string>("")
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({
        ...formData,
        blinkImage: file,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      for (const key in formData) {
        if (key === "blinkImage" && formData[key]) {
          formDataToSend.append("image", formData[key]);
        } else {
          formDataToSend.append(
            key,
            formData[key as keyof BlinkFormData]?.toString() || ""
          );
        }
      }

      const response = await fetch("/api/actions/createAma", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to create blink");
      }

      const data = await response.json();
      setBlinkId(data.data.id);
      
      toast({
        title: "Success!",
        description: "Your blink has been published.",
      });

      // Reset form
      setFormData({
        title: "",
        walletAddress: "",
        blinkImage: null,
      });
      setImagePreview(null);

    } catch (error) {
      console.error("Failed to submit the form", error);
      toast({
        title: "Error",
        description: "Failed to publish your blink. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-black">
      <div className="flex">
        <LoginForm
          formData={formData}
          loading={loading}
          imagePreview={imagePreview}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Page;