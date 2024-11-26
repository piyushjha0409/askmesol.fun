'use client'

import { LoginForm, BlinkFormData } from "@/components/login-form"
import React, { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"
import { useWallet } from "@solana/wallet-adapter-react"
const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), {ssr: false})

// const useWallet = dynamic(() => import('@solana/wallet-adapter-react').then(mod => mod.useWallet), {ssr: false})

export default function CreateBlinkPage() {
  const { toast } = useToast()
  const { publicKey } = useWallet()

  const [formData, setFormData] = useState<BlinkFormData>({
    title: "",
    walletAddress: "",
    blinkImage: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
//   const [, setBlinkId] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (publicKey) {
      setFormData(prevData => ({
        ...prevData,
        walletAddress: publicKey.toString(),
      }))
    }
  }, [publicKey])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setFormData({
        ...formData,
        blinkImage: file,
      })
    }
  }

  //This function is used blink generation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //TODO: handle the loading state by the custom loader component that you have created 
    setLoading(true) 

    // console.log("This is the form data -->", formData)

    try {
      const formDataToSend = new FormData()
      
      for (const key in formData) {
        if (key === "blinkImage" && formData[key]) {
          formDataToSend.append("image", formData[key])
        } else {
          formDataToSend.append(
            key,
            formData[key as keyof BlinkFormData]?.toString() || ""
          )
        }
      }
      
      //debugging logs
    //   console.log('Form data contents:');
    //   Array.from(formDataToSend.entries()).forEach(pair => {console.log(pair[0], pair[1])})

      //Hitting the request for creating a blink
      const response = await fetch("/api/createAma", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Failed to create blink")
      }

    //   const data = await response.json()
    //   setBlinkId(data.data.id)
      
      toast({
        title: "Success!",
        description: "Your blink has been published.",
      })

      // Reset form
      setFormData({
        title: "",
        walletAddress: publicKey ? publicKey.toString() : "",
        blinkImage: null,
      })
      setImagePreview(null)

    } catch (error) {
      console.error("Failed to submit the form", error)
      toast({
        title: "Error",
        description: "Failed to publish your blink. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex relative w-full min-h-screen bg-black">
      <header className="absolute top-2 right-3 justify-end p-4">
        <WalletMultiButton />
      </header>
      <main className="flex justify-center items-center h-screen w-full bg-black">
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
      </main>
    </div>
  )
}