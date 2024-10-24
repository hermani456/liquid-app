import { NextResponse } from "next/server";
import { FileforgeClient } from "@fileforge/client";
import { compile } from "@fileforge/react-print";
import Template from "@/components/pdf/Template";
import fs from "fs";
import { File } from "formdata-node";


const ff = new FileforgeClient({
  apiKey: process.env.ONEDOC_API_KEY,
});

export const POST = async (req) => {
  const HTML = await compile(<Template />);

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

  const data =  pdfStream.pipe(fs.createWriteStream("output.pdf"));

  if(data){
    return NextResponse.json("pdf created", { status: 200 });
  }

  // const chunks = [];

  // for await (const chunk of pdfStream) {
  //   chunks.push(chunk);
  // }

  // const pdfBuffer = Buffer.concat(chunks);


  // if (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  // }

  // if (data) {
  //   return NextResponse.json("Email sent", { status: 200 });
  // }
};
