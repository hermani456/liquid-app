import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { postNewWorker } from "@/db/queries/workers";


export const POST = async (req, res) => {
  // const { userId } = getAuth(req);
  const body = await req.json();
  console.log(body)
  const {
    company_id, name, last_name, rut, sex, home_address, phone, position, base_salary, email
  } = body;

  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const result = await postNewWorker(
      company_id, name, last_name, rut, sex, home_address, phone, position, base_salary, email
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error inserting worker:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
