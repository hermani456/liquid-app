import { NextResponse } from "next/server";
import { FileforgeClient } from "@fileforge/client";
import { compile } from "@fileforge/react-print";
import Template from "@/components/pdf/Template";
import fs from "fs";
import { File } from "formdata-node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ff = new FileforgeClient({
  apiKey: process.env.ONEDOC_API_KEY,
});

export const POST = async (req) => {
  const body = await req.json();
  const { sueldoBase, horasExtras, diasAusentes } = body;
  let dias = 30 - diasAusentes;
  const gratificacion =
    sueldoBase * 0.25 >= 197917 ? 197917 : sueldoBase * 0.25 || 0;
  console.log("sueldo base", sueldoBase);
  const valorDiaTrabajado = sueldoBase / 30;
  console.log("valor dia trabajado", valorDiaTrabajado);
  const valorDiaPresente = valorDiaTrabajado * dias;
  console.log("valor dia presente", valorDiaPresente);
  const valorHoraExtra = Math.round(sueldoBase * 0.0079545);
  const pagoHoraExtra = valorHoraExtra * horasExtras;
  console.log("pagoHoraExtra", pagoHoraExtra);
  console.log("horaExtra", valorHoraExtra);
  console.log(body);

  const totalImponible = valorDiaPresente + pagoHoraExtra + gratificacion;

  const templateProps = {
    ...body,
    dias,
    valorDiaTrabajado,
    pagoHoraExtra,
    gratificacion,
    totalImponible,
  };

  const HTML = await compile(<Template {...templateProps} />);

  const pdfStream = await ff.pdf.generate(
    [
      new File([HTML], "index.html", {
        type: "text/html",
      }),
    ],
    {
      options: {
        host: false,
        test: false,
      },
    },
    {
      timeoutInSeconds: 30,
    }
  );

  const pdfFile = pdfStream.pipe(fs.createWriteStream("output.pdf"));

  // if (pdfFile) {
  //   return NextResponse.json("pdf created", { status: 200 });
  // }

  const chunks = [];

  for await (const chunk of pdfStream) {
    chunks.push(chunk);
  }

  const pdfBuffer = Buffer.concat(chunks);

  const { data, error } = await resend.emails.send({
    from: "LiquidApp <send@yme.cl>",
    to: body.email,
    subject: "Liquidación de sueldo",
    text: "Liquidación de sueldo",
    attachments: [
      {
        filename: "liquidacion.pdf",
        content: pdfBuffer.toString("base64"),
        encoding: "base64",
        contentType: "application/pdf",
      },
    ],
  });

  if(data) {
    console.log(data)
    return NextResponse.json("email sent", { status: 200 });
  }

  if (error) {
    console.log(error);
  }

  return NextResponse.json("email sent", { status: 200 });
};
