import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getWorkerByIdAndUserId, updateWorker } from "@/db/queries/workers";

export const PUT = async (req, { params }) => {
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

  const { id } = params;

  try {
    const body = await req.json();

    const {
      name,
      last_name,
      rut,
      sex,
      home_address,
      phone,
      position,
      base_salary,
      email,
    } = body;

    // TODO Uncomment when frontend handling of worker authorization
    // const worker = await getWorkerByIdAndUserId(id, userId);

    // if (!worker) {
    //   return NextResponse.json({ error: "Worker not found or unauthorized" }, { status: 403 });
    // }

    const result = await updateWorker(
      id,
      name,
      last_name,
      rut,
      sex,
      home_address,
      phone,
      position,
      base_salary,
      email
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating worker:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};