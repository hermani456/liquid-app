"use client";

import Container from "@/components/landing/container";
import Image from "next/image";
import ss from "@/public/ss.png";
import ssmobile from "@/public/ss-mobile.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const desktopSs = useTransform(scrollYProgress, [0, 1], [0, -550]);
  const scaleDesktopSs = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const mobileSs = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const text = useTransform(scrollYProgress, [0, 1], [1, .5])
  const con = useTransform(scrollYProgress, [0, 1], [1, .5]);

  return (
    <motion.div ref={container} className="relative mt-10">
      <Container>
        <div className="flex flex-col h-screen justify-around items-center">
          <div className="absolute -bottom-36 -left-36 blur-3xl rounded-full size-[10rem] lg:size-[37rem] bg-pri -z-10"></div>
          <div className="absolute -top-36 -right-36 blur-3xl rounded-full size-[10rem] lg:size-[37rem] bg-[#32c6c1]/20 -z-10"></div>
          <motion.dev
            style={{ scale: con, opacity: text }}
            className="flex flex-col items-center gap-5"
          >
            <h1 className="text-6xl text-center lg:text-8xl font-bebasNeue font-semibold bg-gradient-to-br from-teal-400 to-violet-700 text-transparent bg-clip-text">
            Gestiona tus liquidaciones de sueldo de manera fácil y eficiente
            </h1>
            <p className="font-roboto max-w-prose">
            Simplifica la administración de tu equipo. Nuestra plataforma te permite generar, enviar y organizar liquidaciones de sueldo en minutos, sin complicaciones.
            </p>
            <div className="flex gap-5">
              <button className="bg-acc px-5 py-2 text-bg rounded-xl hover:scale-105 transition-all">
                Comenzar
              </button>
              <button className="px-5 py-2 border rounded-xl hover:scale-105 transition-all">
                Conocer mas
              </button>
            </div>
          </motion.dev>
          <div className="relative hidden lg:block">
            <motion.div style={{ y: desktopSs, scale: scaleDesktopSs }}>
              <Image src={ss} alt="ss" />
            </motion.div>
            <div style={{ y: mobileSs }}>
              <Image
                src={ssmobile}
                width={250}
                alt="ssmobile"
                className="absolute inset-0 m-auto"
              />
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Hero;
