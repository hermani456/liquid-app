import { DollarSign } from "lucide-react";
import { Building, Folder, List, Users, Mail } from "lucide-react";

export const infoCardsContent = [
  {
    number: 3,
    name: "Empresas",
    Icon: Building,
    description: "A tu cargo",
    bgColor: "#FFF4E8",
    textColor: "#F29425",
  },
  {
    number: 100,
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
    number: "$900.000",
    name: "Promedio de sueldos",
    Icon: DollarSign,
    description: "Mensual",
    bgColor: "#FFF4E8",
    textColor: "#F29425",
  },
];

export const navLinks = [
  {
    id: 1,
    name: "Home",
    path: "#home",
    icon: Building,
  },
  {
    id: 2,
    name: "About",
    path: "#about",
    icon: Folder,
  },
  {
    id: 3,
    name: "Features",
    path: "#features",
    icon: List,
  },
  {
    id: 4,
    name: "Contact",
    path: "#contact",
    icon: Users,
  },
];

// AFP Capital: 1,44%
// AFP Cuprum: 1,44%
// AFP Habitat: 1,27%
// AFP Modelo: 0,58%
// AFP Planvital: 1,16%
// AFP Provida: 1,45%
// AFP Uno: 0,49%

export const afpOptions = [
  { id: 1, name: "AFP Capital", value: 1.44 },
  { id: 2, name: "AFP Cuprum", value: 1.44 },
  { id: 3, name: "AFP Habitat", value: 1.27 },
  { id: 4, name: "AFP Modelo", value: 0.58 },
  { id: 5, name: "AFP Planvital", value: 1.16 },
  { id: 6, name: "AFP Provida", value: 1.45 },
  { id: 7, name: "AFP Uno", value: 0.49 },
];
