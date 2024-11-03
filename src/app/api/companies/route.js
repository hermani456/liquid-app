import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createCompany } from "@/db/queries/companies";

export const POST = async (req, res) => {
  const { userId } = getAuth(req);
  const body = await req.json();
  const { name, rut, address, phone } = body;

  // Validate that all required properties are present
  if (!name || !rut || !address || !phone) {
    return NextResponse.json(
      { error: "Missing required fields: name, rut, address, phone" },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await createCompany(userId, body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error inserting company:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
