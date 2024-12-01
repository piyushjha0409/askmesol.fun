"use client";
import Link from "next/link";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Image from "next/image";

interface LoginFormProps {
  formData: BlinkFormData;
  loading: boolean;
  imagePreview: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface BlinkFormData {
  title: string;
  walletAddress: string;
  blinkImage: File | null;
  askingFee: number;
}

export function LoginForm({
  formData,
  loading,
  imagePreview,
  onInputChange,
  onFileChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <Card className="mx-auto max-w-md bg-black text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Ask Me Anything! 🤔
        </CardTitle>
        <CardDescription className="text-center">
          Share your thoughts or questions anonymously
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="title">Question Title</Label>
            <Input
              id="title"
              placeholder="What's on your mind?"
              required
              className="h-12"
              name="title"
              value={formData.title}
              onChange={onInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="wallet">Wallet Address</Label>
            <Input
              id="wallet"
              placeholder="0x..."
              required
              className="h-12 font-mono"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={onInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Blink Image</Label>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="h-12"
                  onChange={onFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile picture (optional)
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="askingFee">Asking Fee (SOL)</Label>
            <Input
              id="askingFee"
              type="number"
              step="0.1"
              min="0.5"
              max="1"
              required
              placeholder="Enter amount between 0.5 and 1 SOL"
              className="h-12"
              name="askingFee"
              value={formData.askingFee}
              onChange={onInputChange}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
          >
            {loading ? "Publishing..." : "Publish Blink"}
          </Button>

          <div className="text-center text-sm text-gray-500">
            By submitting, you agree to our{" "}
            <Link href="#" className="text-purple-500 hover:underline">
              Terms of Service
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}