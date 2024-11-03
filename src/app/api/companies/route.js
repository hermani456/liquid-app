import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createCompany, selectCompaniesByUserId, editCompany } from "@/db/queries/companies";

export const POST = async (req, res) => {
  const { userId } = getAuth(req);
  const body = await req.json();
  const { name, rut, address, phone } = body;

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

export const GET = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await selectCompaniesByUserId(userId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// export const PUT = async (req, res) => {
//   const { userId } = getAuth(req);
//   const body = await req.json();
//   const { id, userId: bodyUserId, name, rut, address, phone } = body;
//   // const { id, name, rut, address, phone } = body;

//   // if (!id || !name || !rut || !address || !phone) {
//   //   return NextResponse.json(
//   //     { error: "Missing required fields: id, name, rut, address, phone" },
//   //     { status: 400 }
//   //   );
//   // }

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const result = await editCompany(userId, body);
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     console.error("Error updating company:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }