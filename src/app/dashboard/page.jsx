import InfoCard from "@/components/InfoCard";
import DashBoardTable from "@/components/Table";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";
import AreaChart from "@/components/charts/AreaChart";
import { currentUser } from "@clerk/nextjs/server";
import pool from "@/utils/db";
import { Building, DollarSign, List, Mail, Users } from "lucide-react";
import { formatToClp } from "@/utils/index";
import DataTable from "@/components/data-table";

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

  const { rows: employeesSalary } = await pool.query(
    `
  SELECT 
    CONCAT(UPPER(LEFT(w.name, 1)), '.', UPPER(LEFT(w.last_name, 1)), '.') AS initials,
    w.base_salary
  FROM users u
  JOIN companies c ON u.id = c.user_id
  JOIN workers w ON c.id = w.company_id
  WHERE u.id = '${id}';
  `
  );

  const { rows: employeesCompanies } = await pool.query(
    `
    SELECT 
    c.id AS company_id,
    c.name AS company_name,
    c.rut AS company_rut,
    COUNT(w.id) AS employee_count
    FROM companies c
    LEFT JOIN workers w ON c.id = w.company_id
    WHERE c.user_id = '${id}'
    GROUP BY c.id;
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

  const empresas = [
    {
      id: 1,
      nombre: "TechSolutions SpA",
      rut: "76.543.210-K",
      empleados: 120,
    },
    {
      id: 2,
      nombre: "Constructora Andes Ltda.",
      rut: "89.876.543-2",
      empleados: 250,
    },
    {
      id: 3,
      nombre: "Alimentos del Sur S.A.",
      rut: "96.321.654-9",
      empleados: 80,
    },
    {
      id: 4,
      nombre: "Transportes Rápidos E.I.R.L.",
      rut: "77.777.777-7",
      empleados: 45,
    },
    {
      id: 5,
      nombre: "Servicios Financieros Chile S.A.",
      rut: "99.999.999-9",
      empleados: 300,
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
          <div className="h-[15rem] col-span-1 mt-5 p-2 rounded-xl overflow-hidden shadow-lg border-gray-300/30 border-2">
            <h2 className="py-3 pl-2 font-semibold">Empresas</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable empresas={employeesCompanies} />
            </div>
          </div>
          <div className="h-[15rem] col-span-1 mt-5 p-2 rounded-xl overflow-hidden shadow-lg border-gray-300/30 border-2">
            <h2 className="py-3 pl-2 font-semibold">Empleados</h2>
            <div className="h-[calc(100%-3rem)] overflow-y-scroll">
              <DashBoardTable empresas={empresas} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-5 lg:justify-between">
          {/* <div className="flex-1 min-w-[18rem]">
            <AreaChart />
          </div> */}
          <div className="w-full max-w-[30rem] flex-shrink">
            <BarChart chartData={employeesSalary}/>
          </div>
          <div className="w-full max-w-[30rem] flex-shrink">
            <AreaChart />
          </div>
          <div className="w-full max-w-[30rem] flex-shrink">
            <PieChart data={totalEmpleados} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
