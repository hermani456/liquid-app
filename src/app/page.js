"use client"
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavBar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import { ReactLenis, useLenis } from 'lenis/react'

export default function Component() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      <div className="relative">
      <NavBar />
      <Hero />
      {/* <div className="flex justify-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div> */}
      <div className="h-[300vh]"></div>
    </div>
    </ReactLenis>
  )
}

