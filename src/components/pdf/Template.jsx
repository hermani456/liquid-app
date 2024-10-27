import {
  Footnote,
  PageBottom,
  Tailwind,
  Margins,
} from "@fileforge/react-print";
import { Building } from "lucide-react";

const page = () => {
  return (
    <div
      className="h-[32.5cm] w-[21.5cm]"
      style={{
        color: "#000",
        background: "white",
      }}
    >
      <Tailwind>
        {/* <Margins pageRatio="A4" top="100" right="100" left="100" bottom="100" /> */}
        <div id="container">
          <div className="flex items-center gap-2">
            <div>
              <Building size={50} />
            </div>
            <div className="w-[1px] bg-black/30 h-14 mr-2"></div>
            <div className="text-xs font-semibold">
              <p>Yme.cL</p>
              <p>77.456.321-5</p>
              <p>San Martin 2019</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center font-bold mt-5">
            <h1 className="text-2xl">Remuneración</h1>
            <h2 className="text-xl">Liquidación de sueldo</h2>
            <h3 className="font-normal">Octubre 2024</h3>
          </div>
          <div
            id="employee-data"
            className="border rounded-md text-sm overflow-hidden mt-3"
          >
            <div className="bg-black/20 p-1">
              <h2 className="font-bold">Información del trabajador</h2>
            </div>
            <div className="flex justify-between p-1">
              <div className="flex flex-col">
                <h6 className="font-semibold">
                  Nombre: <span className="font-normal">Emilio Acevedo</span>
                </h6>
                <h6 className="font-semibold">
                  Rut: <span className="font-normal">12.345.678-9</span>
                </h6>
                <h6 className="font-semibold">
                  Cargo: <span className="font-normal">Desarrollador</span>
                </h6>
              </div>
              <div className="flex flex-col">
                <h6 className="font-semibold">
                  Trabaja desde: <span className="font-normal">01/01/2020</span>
                </h6>
                <h6 className="font-semibold">
                  Contrato: <span className="font-normal">Indefinido</span>
                </h6>
                <h6 className="font-semibold">
                  Email: <span className="font-normal">emilio@a7.cl</span>
                </h6>
              </div>
            </div>
          </div>
          <div
            id="details"
            className="border rounded-md text-sm overflow-hidden mt-3"
          >
            <div className="bg-black/20 p-1">
              <h2 className="font-bold">Detalle</h2>
            </div>
            <div className="flex divide-x-2 justify-between p-1">
              <div className="flex space-x-5">
                <div>Dias trabajados: 30</div>
                <div>Feriados: 2</div>
                <div>Ausentes: 0</div>
              </div>
              <div className="flex space-x-5">
                <div>AFP: UNO</div>
                <div>Tasa: 10.49%</div>
              </div>
              <div className="flex space-x-5">
                <div>Salud: Banmedica</div>
                <div>Cargas: 0</div>
              </div>
            </div>
          </div>
        </div>
      </Tailwind>
    </div>
  );
};

export default page;
