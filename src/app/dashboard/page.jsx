import InfoCard from "@/components/InfoCard";
import DashBoardTable from "@/components/Table";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";
import AreaChart from "@/components/charts/AreaChart";
import { currentUser } from "@clerk/nextjs/server";
import pool from "@/utils/db";
import { Building, DollarSign, List, Mail, Users } from "lucide-react";
import { formatToClp } from "@/utils/index";

const page = async () => {
  const { firstName, lastName, id } = await currentUser();

  // TODO: pasar usuario en query
  const { rows: totalEmpleados } = await pool.query(`
    SELECT
        c.name AS company,
        COUNT(w.id) AS workers
    FROM
        companies c
    LEFT JOIN
        workers w ON c.id = w.company_id
    WHERE
        c.user_id = '${id}'
    GROUP BY
        c.id;
    `);


  const { rows: totalEmpresas } = await pool.query(`
    SELECT
        COUNT(id) AS companies
    FROM
        companies
    WHERE
        user_id = '${id}';
    `);


  const { rows: avgPayment } = await pool.query(
    `
    SELECT
      AVG(w.base_salary) AS average_base_salary
    FROM
      workers w
    JOIN
      companies c ON w.company_id = c.id
    WHERE
      c.user_id = '${id}';
    `
  );

  const { rows: totalEmployees } = await pool.query(
    `
    SELECT
    COUNT(w.id) AS total_employees
FROM
    companies c
LEFT JOIN
    workers w ON c.id = w.company_id
WHERE
    c.user_id = '${id}';
    `
  );


  const infoCardsContent = [
    {
      number: totalEmpresas[0].companies,
      name: "Empresas",
      Icon: Building,
      description: "A tu cargo",
      bgColor: "#FFF4E8",
      textColor: "#F29425",
    },
    {
      number: totalEmployees[0].total_employees,
      name: "Empleados",
      Icon: Users,
      description: "Registrados",
      bgColor: "#E8F5FF",
      textColor: "#248CD8",
    },
    {
      number: 300,
      name: "Liquidaciones",
      Icon: List,
      description: "Generadas",
      bgColor: "#F9EFFF",
      textColor: "#A601FF",
    },
    {
      number: 10,
      name: "Emails",
      Icon: Mail,
      description: "Enviados",
      bgColor: "#ECFFF2",
      textColor: "#10A142",
    },
    {
      number: `${formatToClp(Math.round(avgPayment[0].average_base_salary))}`,
      name: "Promedio de sueldos",
      Icon: DollarSign,
      description: "Mensual",
      bgColor: "#FFF4E8",
      textColor: "#F29425",
    },
  ];


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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <div className="h-[15rem] col-span-1 mt-5 p-2 rounded overflow-hidden shadow-lg">
            <h2 className="py-3 pl-2">Empresas</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable />
            </div>
          </div>
          <div className="h-[15rem] col-span-1 mt-5 p-2 rounded overflow-hidden shadow-lg">
            <h2 className="py-3 pl-2">Empresas</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-5">
          <div className="flex-1 min-w-[18rem]">
            <AreaChart />
          </div>
          <div className="flex-1 min-w-[18rem]">
            <BarChart />
          </div>
          <div className="flex-1 min-w-[18rem]">
            <PieChart data={totalEmpleados} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
