import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { editCompany } from "@/db/queries/companies";

export const PUT = async (req, { params }) => {
  const { userId } = getAuth(req);
  const { id } = params;
  const body = await req.json();
  const { user_id } = body;

  if (userId !== user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await editCompany(userId, body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};