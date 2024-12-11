"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavBar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import { ReactLenis, useLenis } from "lenis/react";

export default function Component() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return (
    <ReactLenis root>
      <div>
        {/* <NavBar /> */}
        <Hero />
      </div>
    </ReactLenis>
  );
}
