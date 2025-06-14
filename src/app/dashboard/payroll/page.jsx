import ReactPDFTemplate from "@/components/pdf/ReactPDFTemplate";
import Button from "@/components/pdf/Button";

const page = () => {
  // Sample data for preview
  const sampleData = {
    name: "John",
    last_name: "Doe",
    rut: "12345678-9",
    position: "Developer",
    email: "john@example.com",
    sueldoBase: 1000000,
    valorDiaPresente: 900000,
    dias: 27,
    diasAusentes: 3,
    horasExtras: 5,
    pagoHoraExtra: 35000,
    gratificacion: 197917,
    totalImponible: 1132917,
    movilizacion: 50000,
    colacion: 30000, 
    viatico: 0,
    asignacionFamiliar: 0,
    afp: { label: "AFP Modelo", value: 0.1 },
    prevision: 113292,
    seguroCesantia: 6797,
    fonasa: 79304,
    descuentosPrevisionales: 199393,
    liquido: 933524,
    mes: "Junio",
    descuento: 0,
    totalLiquido: 933524
  };

  return (
    <div className="flex justify-between">
      <div className="p-10 bg-white flex justify-center items-center">
        <div>Preview not available in browser - click generate to create PDF</div>
      </div>
      <div className="flex justify-center items-center">
        <Button />
      </div>
    </div>
  );
};

export default page;
