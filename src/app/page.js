import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import  NavBar from "@/components/landing/navbar"
import Hero from '@/components/landing/hero'

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </div>
  );
}
