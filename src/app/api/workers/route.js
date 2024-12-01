import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createNewWorker } from "@/db/queries/workers";

export const POST = async (req, res) => {
  const { userId } = getAuth(req);
  const body = await req.json();

  const { rut } = body;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sanatizedRut = rut.replace(/[.-]/g, "");

  try {
    const result = await createNewWorker(userId, { ...body, rut: sanatizedRut });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error inserting worker:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
