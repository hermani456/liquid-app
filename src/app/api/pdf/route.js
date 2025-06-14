import { NextResponse } from "next/server";
import ReactPDFTemplate from "@/components/pdf/ReactPDFTemplate";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req) => {
  const body = await req.json();
  const { sueldoBase, horasExtras, diasAusentes, afp, descuento } = body;
  let dias = 30 - diasAusentes;
  const gratificacion =
    sueldoBase * 0.25 >= 197917 ? 197917 : sueldoBase * 0.25 || 0;
  const valorDiaTrabajado = sueldoBase / 30;
  const valorDiaPresente = Math.round(valorDiaTrabajado * dias)
  const valorHoraExtra = Math.round(sueldoBase * 0.0079545);
  const pagoHoraExtra = valorHoraExtra * horasExtras;
  const salud = valorDiaPresente * 0.07;
  const totalImponible = valorDiaPresente + pagoHoraExtra + gratificacion;
  const seguroCesantia = totalImponible * 0.006;
  const fonasa = totalImponible * 0.07;
  const prevision = Math.round(totalImponible * afp?.value)
  const descuentosPrevisionales = prevision + seguroCesantia + fonasa;
  const liquido = totalImponible - descuentosPrevisionales;
  const totalLiquido = liquido - Number(descuento);

  const templateProps = {
    ...body,
    valorDiaPresente,
    dias,
    valorDiaTrabajado,
    pagoHoraExtra,
    gratificacion,
    totalImponible,
    salud,
    prevision,
    seguroCesantia,
    fonasa,
    descuentosPrevisionales,
    liquido,
    totalLiquido
  };

  try {
    // Generate PDF using @react-pdf/renderer
    const pdfBuffer = await renderToBuffer(<ReactPDFTemplate {...templateProps} />);
    
    // Send email with the PDF attachment
    const { data, error } = await resend.emails.send({
      from: "LiquidApp <send@hermani.tech>",
      to: body.email,
      subject: "Liquidación de sueldo",
      text: "Se adjunta su liquidación de sueldo en formato PDF.",
      attachments: [
        {
          filename: "liquidacion.pdf",
          content: pdfBuffer.toString("base64"),
          encoding: "base64",
          contentType: "application/pdf",
        },
      ],
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
    
    console.log("Email sent successfully:", data);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error generating or sending PDF:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
