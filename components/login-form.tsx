//TODO: why there is multiple fields for the question (title and the textarea)
//TODO: the profile image uploading is not rendering on the profile section

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
import { Textarea } from "@/components/ui/textarea";

export function LoginForm() {
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
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Question Title</Label>
            <Input
              id="title"
              placeholder="What's on your mind?"
              required
              className="h-12"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="wallet">Wallet Address</Label>
            <Input
              id="wallet"
              placeholder="0x..."
              required
              className="h-12 font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Profile Image</Label>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="h-12"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile picture (optional)
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              placeholder="Type your question here..."
              className="min-h-[120px] resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
          >
            Ask Question
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
