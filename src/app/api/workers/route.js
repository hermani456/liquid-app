import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { selectWorkersByUserId, updateWorker } from "@/db/queries/workers";

export const GET = async (req, res) => {
  const { userId } = getAuth(req);
  const result = await selectWorkersByUserId(userId);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(result, { status: 200 });
};

export const PUT = async (req) => {
  const { userId } = getAuth(req);

  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const body = await req.json();
    console.log("body", body);
    const { id, name, last_name, rut, sex, home_address, phone, position, base_salary, email } = body;

    const result = await updateWorker({
      id,
      name,
      last_name,
      rut,
      sex,
      home_address,
      phone,
      position,
      base_salary,
      email,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating worker:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};