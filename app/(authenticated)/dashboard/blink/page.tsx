"use client";

import { LoginForm, BlinkFormData } from "@/components/login-form";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { ToastAction } from "@radix-ui/react-toast";
import PopUpModal from "@/app/customComponents/PopUpModal";
import { CheckCircle, Copy } from "lucide-react";
import { useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoaderComponent from "@/components/LoaderComponent";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

// const useWallet = dynamic(() => import('@solana/wallet-adapter-react').then(mod => mod.useWallet), {ssr: false})

export default function Page() {
  const { toast } = useToast();
  const { publicKey } = useWallet();
  const router = useRouter();
  const controls = useAnimation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [blinkId, setBlinkId] = useState("");
  const [formData, setFormData] = useState<BlinkFormData>({
    title: "",
    walletAddress: "",
    blinkImage: null,
    askingFee: 0.0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(<Copy />);

  useEffect(() => {
    if (publicKey) {
      setFormData((prevData) => ({
        ...prevData,
        walletAddress: publicKey.toString(),
      }));
    }
  }, [publicKey]);

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

  //This function is used blink generation

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

      //debugging logs
      console.log("Form data contents:");
      Array.from(formDataToSend.entries()).forEach((pair) => {
        console.log(pair[0], pair[1]);
      });

      //Hitting the request for creating a blink
      const response = await fetch("/api/createAma", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to create blink");
      }

      const data = await response.json();

      if (data.blink_id) {
        setBlinkId(data.blink_id);
        sessionStorage.setItem("blinkId", blinkId);
        localStorage.setItem("blinkId", blinkId);
      }

      toast({
        title: "Success!",
        description: (
          <div>
            Your blink has been published. <br />
            <strong>Blink ID:</strong> {data.blink_id}
          </div>
        ),
        action: (
          <ToastAction
            altText="Copy Blink ID to clipboard"
            onClick={() => navigator.clipboard.writeText(data.blink_id)}
          >
            Copy to Clipboard
          </ToastAction>
        ),
      });

      // Reset form
      setFormData({
        title: "",
        walletAddress: publicKey?.toString() || "",
        blinkImage: null,
        askingFee: 0.0,
      });
      setIsModalOpen(true);
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

  const linkToCopy = `https://askmesol.fun/api/actions/questions/${blinkId}`;

  //function for making copy button
  const handleCopy = () => {
    navigator.clipboard.writeText(linkToCopy).then(() => {
      setCopied(true);
      setIcon(<CheckCircle className="text-green-500" />); // Change icon to checkmark icon
      controls.start({ scale: 1.1, rotate: 360 }); // Animation on copy
      setTimeout(() => {
        setCopied(false);
        setIcon(<Copy />); // Reset icon back to original
        controls.start({ scale: 1, rotate: 0 }); // Reset animation
      }, 1000); // Reset copied status after 3 seconds
    });
  };

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-black">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <div className="flex relative w-full min-h-screen bg-black">
      <main className="flex justify-center items-center lg:h-screen w-full bg-black pt-16">
        <header className="absolute lg:top-2 lg:right-3 justify-end lg:p-4  top-1 right-1">
          <WalletMultiButton />
        </header>
        <div className="flex mx-2">
          <LoginForm
            formData={formData}
            loading={loading}
            imagePreview={imagePreview}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
      <PopUpModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        copied={copied}
        blinkId={blinkId}
        icon={icon}
        handleCopy={handleCopy}
        linkToCopy={linkToCopy}
      />
    </div>
  );
}
