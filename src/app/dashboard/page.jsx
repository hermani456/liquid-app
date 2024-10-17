import { infoCardsContent } from "@/utils";
import InfoCard from "@/components/InfoCard";
import DashBoardTable from "@/components/Table";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";
import AreaChart from "@/components/charts/AreaChart";

const page = () => {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const dayName = date.toLocaleString("es-CL", { weekday: "long" });
  const monthName = date.toLocaleString("es-CL", { month: "long" });
  return (
    <div className="bg-[#F8F9FD]">
      <div className="py-2 px-3">
        <h2 className="lg:text-2xl font-semibold">
          Bienvenido, Humberto Chupete Suazo
        </h2>
        <p className="text-xs lg:text-sm">{`Hoy es ${dayName} ${day} de ${monthName} ${year}`}</p>
        <div className="flex flex-wrap gap-5 mt-5">
          {infoCardsContent.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
        <div className="flex gap-5 flex-wrap flex-grow">
          <div className="w-full sm:w-[38rem] h-[15rem] bg-white mt-5 p-2 rounded overflow-hidden shadow">
            <h2 className="py-3 pl-2">Empresas</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable />
            </div>
          </div>
          <div className="w-full sm:w-[38rem] h-[15rem] bg-white mt-5 p-2 rounded overflow-hidden shadow">
            <h2 className="py-3 pl-2">Empresas</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap min-h-[18rem] justify-between items-center pr-20">
          <div className="w-[25rem]">
            <AreaChart />
          </div>
          <div className="w-[25rem]">
            <BarChart />
          </div>
          <div className="w-[25rem]">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
