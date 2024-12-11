"use client";

import Container from "@/components/landing/container";
import Image from "next/image";
import ss from "@/public/ss.png";
import ssmobile from "@/public/ss-mobile.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Hero = () => {
  // const container = useRef();
  // const { scrollYProgress } = useScroll({
  //   target: container,
  //   offset: ["start start", "end end"],
  // });

  // const desktopImageOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  // const scaleDesktopSs = useTransform(scrollYProgress, [0.5, 1], [1, 0.5]);
  // const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // const con = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <Container className={"h-[100dvh]"}>
      <div className="flex flex-col items-center justify-center gap-5 h-full sticky top-0 ">
        <h1 className="text-6xl text-center lg:text-8xl font-bebasNeue font-semibold bg-gradient-to-br from-teal-400 to-violet-700 text-transparent bg-clip-text">
          Gestiona tus liquidaciones de sueldo de manera fácil y eficiente
        </h1>
        <p className="font-roboto max-w-prose">
          Simplifica la administración de tu equipo. Nuestra plataforma te
          permite generar, enviar y organizar liquidaciones de sueldo en
          minutos, sin complicaciones.
        </p>
        <div className="flex gap-5">
          <SignedOut>
            <SignInButton>
              <button className="bg-acc px-5 py-2 text-bg rounded-xl hover:scale-105 transition-all">
                Comenzar
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="bg-acc px-5 py-2 text-bg rounded-xl hover:scale-105 transition-all">
                Dashboard
              </button>
            </Link>
          </SignedIn>
          <button className="px-5 py-2 border rounded-xl hover:scale-105 transition-all">
            Conocer mas
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
