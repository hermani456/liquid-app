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

const Unidades = (num) => {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
    default:
      return "";
  }
};

const Decenas = (num) => {
  let decena = Math.floor(num / 10);
  let unidad = num - decena * 10;
  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
};

const DecenasY = (strSin, numUnidades) =>
  numUnidades > 0 ? strSin + " Y " + Unidades(numUnidades) : strSin;

const Centenas = (num) => {
  let centenas = Math.floor(num / 100);
  let decenas = num - centenas * 100;
  switch (centenas) {
    case 1:
      if (decenas > 0) return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
    default:
      return Decenas(decenas);
  }
};

const Seccion = (num, divisor, strSingular, strPlural) => {
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let letras = "";
  if (cientos > 0) {
    letras = cientos > 1 ? Centenas(cientos) + " " + strPlural : strSingular;
  } else {
    letras = strSingular;
  }
  if (resto > 0) {
    letras += "";
  }
  return letras;
};

const Miles = (num) => {
  let divisor = 1000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  let strCentenas = Centenas(resto);
  return strMiles == "" || cientos === 0
    ? strCentenas
    : strMiles + " " + strCentenas;
};

const Millones = (num) => {
  let divisor = 1000000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let strMillones = Seccion(
    num,
    divisor,
    millon(num, true),
    millon(num, false)
  );
  let strMiles = Miles(resto);
  return strMillones == "" || cientos === 0
    ? strMiles
    : strMillones + " " + strMiles;
};

const millon = (num, singular) => {
  let letraMillon = singular ? "UN MILLON" : "MILLONES";
  if (num % 1000000 == 0) {
    letraMillon = letraMillon + " DE";
  }
  return letraMillon;
};

export const NumberAsString = (num, centavos = false, currency) => {
  currency = currency || {};
  let data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: centavos ? Math.round(num * 100) - Math.floor(num) * 100 : 0,
    letrasCentavos: "",
    letrasMonedaPlural: currency.plural || "PESOS",
    letrasMonedaSingular: currency.singular || "PESO",
    letrasMonedaCentavoPlural: currency.centPlural || "CENTAVOS",
    letrasMonedaCentavoSingular: currency.centSingular || "CENTAVO",
  };

  if (data.centavos > 0) {
    let centavos =
      data.centavos == 1
        ? Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular
        : Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
    data.letrasCentavos = "CON " + centavos;
  }

  if (data.enteros == 0) {
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }
  if (data.enteros == 1) {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaSingular +
      " " +
      data.letrasCentavos
    );
  } else {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaPlural +
      " " +
      data.letrasCentavos
    );
  }
};

// console.log(NumberAsString(750000).replace("  ", " "))

export const formatToClp = (num) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(num);
};

export function formatRut(str) {
  return (
    str.slice(0, 2) +
    "." +
    str.slice(2, 5) +
    "." +
    str.slice(5, 8) +
    "-" +
    str.slice(8)
  );
}

export const checkRut = (rut) => {
  if (!rut || typeof rut !== "string") return false;

  const trimmedRut = rut.trim();

  const parts = trimmedRut.split("-");
  if (parts.length === 2 && parts[1].length !== 1) return false;

  const cleanRut = trimmedRut.replace(/[.-]/g, "");

  if (cleanRut.length < 2 || cleanRut.length > 9) return false;

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toLowerCase();

  if (!/^\d+$/.test(body) || !/^[0-9kK]$/.test(dv)) return false;

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  let calculatedDv;

  if (expectedDv === 11) calculatedDv = "0";
  else if (expectedDv === 10) calculatedDv = "k";
  else calculatedDv = expectedDv.toString();

  return calculatedDv === dv;
};

// capitalize first letter
export const capitalizeAll = (string) => {
  return string.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
};

export const inputCleaner = (sueldo) => {
  let cleanSueldo = sueldo.replace(/\./g, "");
  cleanSueldo = cleanSueldo.replace(/\$/g, "");
  return cleanSueldo;
};