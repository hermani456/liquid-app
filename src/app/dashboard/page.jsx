import { infoCardsContent } from "@/utils";
import InfoCard from "@/components/InfoCard";
import DashBoardTable from "@/components/Table";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";
import AreaChart from "@/components/charts/AreaChart";
import { currentUser } from '@clerk/nextjs/server'
import pool from "@/utils/db";



const page = async() => {
  const { rows } = await pool.query(`SELECT
    c.name AS company,
    COUNT(w.id) AS workers
  FROM
    companies c
  LEFT JOIN
    workers w ON c.id = w.company_id
  GROUP BY
    c.id;`);
  const { firstName, lastName } = await currentUser()

  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const dayName = date.toLocaleString("es-CL", { weekday: "long" });
  const monthName = date.toLocaleString("es-CL", { month: "long" });
  return (
    <div className="">
      <div className="py-2 px-3">
        <h2 className="lg:text-2xl font-semibold">
          Saludos, {firstName} {lastName}
        </h2>
        <p className="text-xs lg:text-sm">{`Hoy es ${dayName} ${day} de ${monthName} ${year}`}</p>
        <div className="flex flex-wrap gap-5 mt-5">
          {infoCardsContent.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
        <div className="flex gap-5 flex-wrap flex-grow">
          <div className="h-[15rem] mt-5 p-2 rounded overflow-hidden shadow">
            <h2 className="py-3 pl-2">Empresas</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable />
            </div>
          </div>
          <div className="h-[15rem] mt-5 p-2 rounded overflow-hidden shadow">
            <h2 className="py-3 pl-2">Empresas</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full border-box-all">
          <div className="max-w-[25rem] lg:w-[25rem]">
            <AreaChart />
          </div>
          <div className="max-w-[25rem] lg:w-[25rem] pl-20">
            <BarChart />
          </div>
          <div className="max-w-[25rem] lg:w-[25rem]">
            <PieChart data={rows}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
