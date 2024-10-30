import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { selectWorkersByUserId } from "@/db/queries/workers";

export const GET = async (req, res) => {
  const { userId } = getAuth(req);
  const result = await selectWorkersByUserId(userId);

  if (!userId) {
    return NextResponse.json(
      { error: "not authorize" },
      { status: 401 }
    );
  }

  return NextResponse.json({ workers: result }, { status: 200 });
};
