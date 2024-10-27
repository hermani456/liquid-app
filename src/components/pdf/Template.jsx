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
        </div>
      </Tailwind>
    </div>
  );
};

export default page;
