import { infoCardsContent } from "@/utils";
import InfoCard from "@/components/InfoCard";

const page = () => {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const dayName = date.toLocaleString("es-CL", { weekday: "long" });
  const monthName = date.toLocaleString("es-CL", { month: "long" });
  return (
    <div className="bg-[#F8F9FD]">
      <div>
        <h2 className="lg:text-2xl font-semibold">
          Bienvenida, Gabriela Gonzalez
        </h2>
        <p className="text-xs lg:text-sm">{`Hoy es ${dayName} ${day} de ${monthName} ${year}`}</p>
        <div className="flex flex-wrap gap-3">
          {infoCardsContent.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
