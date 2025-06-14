import React from "react";
import { Building } from "lucide-react";
import { NumberAsString, formatRut, formatToClp } from "@/utils/index";

const page = ({
  name,
  valorDiaPresente,
  last_name,
  rut,
  position,
  email,
  diasAusentes,
  afp,
  sueldoBase,
  dias,
  pagoHoraExtra,
  gratificacion,
  totalImponible,
  movilizacion,
  colacion,
  viatico,
  asignacionFamiliar,
  prevision,
  seguroCesantia,
  fonasa,
  descuentosPrevisionales,
  liquido,
  mes,
  descuento,
  totalLiquido
}) => {
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth();
  const totalNoImponible =
    Number(movilizacion) +
    Number(colacion) +
    Number(viatico) +
    Number(asignacionFamiliar);
  const totalHaberes = totalImponible + totalNoImponible;
  return (
    <div
      className="h-[1056px] w-[816px]"
      style={{
        color: "#000",
        background: "white",
      }}
    >
      <div>
        {/* <Margins pageRatio="A4" top="100" right="100" left="100" bottom="100" /> */}
        <div id="container">
          <div className="flex items-center gap-2">
            <div>
              <Building size={50} />
            </div>
            <div className="w-[1px] bg-black/30 h-14 mr-2"></div>
            <div className="text-xs font-semibold">
              <p>Lota Schwager</p>
              <p>77.456.321-5</p>
              <p>San Martin 2019</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center font-bold mt-5">
            <h1 className="text-2xl">Remuneración</h1>
            <h2 className="text-xl">Liquidación de sueldo</h2>
            <h3 className="font-normal">{`${mes} ${year}`}</h3>
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
                  Nombre:{" "}
                  <span className="font-normal">{`${name} ${last_name}`}</span>
                </h6>
                <h6 className="font-semibold">
                  Rut: <span className="font-normal">{formatRut(rut)}</span>
                </h6>
                <h6 className="font-semibold">
                  Cargo: <span className="font-normal">{position}</span>
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
                  Email: <span className="font-normal">{email}</span>
                </h6>
              </div>
            </div>
          </div>
          <div
            id="details"
            className="border rounded-md text-sm overflow-hidden mt-3 pb-5"
          >
            <div className="bg-black/20 p-1">
              <h2 className="font-bold">Detalle</h2>
            </div>
            <div className="flex divide-x-2 justify-between p-1 border-b-2">
              <div className="flex space-x-5">
                <div className="flex flex-col items-center">
                  Dias trabajados: <span>{Number(dias)}</span>
                </div>
                <div className="flex flex-col items-center">
                  Dias Feriados: <span>0</span>
                </div>
                <div className="flex flex-col items-center">
                  Dias Ausentes: <span>{Number(diasAusentes)}</span>
                </div>
              </div>
              <div className="flex space-x-5 pl-5">
                <div className="flex flex-col items-center">
                  AFP: <span>{afp.name}</span>
                </div>
                <div className="flex flex-col items-center">
                  Tasa: <span>{(afp.value * 100).toFixed(2)}%</span>
                </div>
              </div>
              <div className="flex space-x-5 pl-5">
                <div className="flex flex-col items-center">
                  Salud: <span>Fonasa</span>
                </div>
                <div className="flex flex-col items-center">
                  Cargas: <span>0</span>
                </div>
              </div>
            </div>
            <div id="calculo" className="flex justify-around mt-3">
              {/* left */}
              <div className="w-1/2 px-14">
                <div className="flex justify-between">
                  Base: <span>{formatToClp(valorDiaPresente)}</span>
                </div>
                <div className="flex justify-between">
                  Horas Extras: <span>{formatToClp(pagoHoraExtra)}</span>
                </div>
                {/* <div className="flex justify-between">
                  Proporcional: <span>$0</span>
                </div> */}
                <div className="flex justify-between">
                  Grat. Legal: <span>{formatToClp(gratificacion)}</span>
                </div>
                {/* <div className="flex justify-between">
                  Total Bonificaciones: <span>$1.000.000</span>
                </div> */}
                {/* divider start */}
                <div className="w-full h-[1px] mt-1 bg-black/30"></div>
                <div className="flex justify-between py-1">
                  Total Imponible:{" "}
                  <span className="font-semibold">
                    {formatToClp(totalImponible)}
                  </span>
                </div>
                <div className="w-full h-[1px] mb-1 bg-black/30"></div>
                {/* divider end */}
                <div className="flex justify-between">
                  Movilización: <span>{formatToClp(movilizacion)}</span>
                </div>
                <div className="flex justify-between">
                  Colacion: <span>{formatToClp(colacion)}</span>
                </div>
                <div className="flex justify-between">
                  Viatico: <span>{formatToClp(viatico)}</span>
                </div>
                <div className="flex justify-between">
                  Asignacion Familiar:{" "}
                  <span>{formatToClp(asignacionFamiliar)}</span>
                </div>
                {/* divider start */}
                <div className="w-full h-[1px] mt-1 bg-black/30"></div>
                <div className="flex justify-between py-1">
                  Total no Imponible:{" "}
                  <span>{formatToClp(totalNoImponible)}</span>
                </div>
                <div className="w-full h-[1px] mb-1 bg-black/30"></div>
                {/* divider end */}
                <div className="flex justify-between">
                  Total Haberes: <span>{formatToClp(totalHaberes)}</span>
                </div>
              </div>
              {/* right */}
              <div className="w-1/2 px-14">
                <div className="flex justify-between">
                  Prevision: <span>{formatToClp(prevision)}</span>
                </div>
                <div className="flex justify-between">
                  APV: <span>$0</span>
                </div>
                <div className="flex justify-between">
                  Salud: <span>{formatToClp(fonasa)}</span>
                </div>
                <div className="flex justify-between">
                  Adicional Salud: <span>$0</span>
                </div>
                <div className="flex justify-between">
                  Impuesto Unico: <span>$0</span>
                </div>
                <div className="flex justify-between">
                  Seguro de Cesantia: <span>{formatToClp(seguroCesantia)}</span>
                </div>
                {/* divider start */}
                <div className="w-full h-[1px] mt-1 bg-black/30"></div>
                <div className="flex justify-between py-1">
                  Descuentos Previsionales:{" "}
                  <span>{formatToClp(descuentosPrevisionales)}</span>
                </div>
                <div className="w-full h-[1px] mb-1 bg-black/30"></div>
                {/* divider end */}
                <div className="flex justify-between font-semibold">
                  Sueldo Liquido: <span>{formatToClp(liquido)}</span>
                </div>
                <div className="w-full h-[1px] mb-1 mt-1 bg-black/30"></div>
                <div className="flex justify-between">
                  Anticipos: <span>$0</span>
                </div>
                <div className="flex justify-between">
                  Descuentos: <span>{formatToClp(descuento)}</span>
                </div>
                <div className="flex justify-between">
                  Otros: <span>$0</span>
                </div>
                <div className="flex justify-between">
                  Total Descuentos: <span>$0</span>
                </div>
                <div className="w-full h-[1px] mb-1 mt-1 bg-black/30"></div>
                <div className="flex justify-between bg-black/10 rounded-md p-1 font-bold">
                  Liquido a Pagar: <span>{formatToClp(totalLiquido)}</span>
                </div>
                <div className="mt-3">
                  <p className="text-center text-[10px] font-semibold leading-tight">
                    {NumberAsString(totalLiquido)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="employee-data"
            className="border rounded-md text-sm overflow-hidden mt-3"
          >
            <div className="bg-black/20 p-1 flex space-x-10">
              <h2>Fecha de Emision: {`${day}/${month + 1}/${year}`}</h2>
              <h2>Emitido por: DCampuzano</h2>
            </div>
            <div className="flex justify-between px-10 py-5">
              <div className="w-1/2 mt-auto text-center pt-10">
                <div className="w-[70%] mx-auto h-[1px] bg-black/30"></div>
                <div className="mt-1">{`${name} ${last_name}`}</div>
                <div className="text-xs">Recibi Conforme</div>
              </div>
              <div className="w-1/2">
                Recibi a plena conformidad el monto indicado en esta liquidacion
                de sueldo, la cual corresponde plenamente a mi remuneración
                acordada.
              </div>
            </div>
          </div>
          {/* <div>
            <Footnote>
              <p>
                Este documento es una representación impresa de un comprobante
                de remuneración y es válido sin firma.
              </p>
            </Footnote>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
