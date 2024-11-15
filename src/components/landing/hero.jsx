import Container from "@/components/landing/container";

const Hero = () => {
  return (
    <div className="relative">
      <Container>
        <div className="flex flex-col h-screen justify-center items-center space-y-5 overflow-hidden">
          <div className="absolute -bottom-36 -left-36 blur-3xl rounded-full size-[10rem] lg:size-[37rem] bg-pri -z-10"></div>
          <div className="absolute -top-36 -right-36 blur-3xl rounded-full size-[10rem] lg:size-[37rem] bg-teal-600/30 -z-10"></div>
          <h1 className="text-6xl lg:text-8xl font-bebasNeue font-semibold bg-gradient-to-br from-teal-400 to-violet-700 text-transparent bg-clip-text">
            Bienvenido a LiquidApp
          </h1>
          <p className="font-roboto">
            La mejor aplicación para gestion de liquidaciones de sueldo
          </p>
          <div className="flex gap-5">
            <button className="bg-acc px-5 py-2 text-bg rounded-xl hover:scale-105 transition-all">
              Comenzar
            </button>
            <button className="px-5 py-2 border rounded-xl hover:scale-105 transition-all">
              Conocer mas
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
