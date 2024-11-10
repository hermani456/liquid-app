import pool from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createUser = async () => {
  let createdUser = false;
  try {
    const { id, firstName, lastName, emailAddresses } = await currentUser();

    const {
      rows: [user],
    } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (!user) {
      const result = await pool.query(
        "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
        [id, firstName + " " + lastName, emailAddresses[0].emailAddress]
      );
      createdUser = result.rowCount > 0;
    }
  } catch (e) {
    console.error("Failed to create user:", e);
    throw e;
  } finally {
    if (user || createdUser) {
      redirect("/dashboard");
    }
  }
};

const page = async () => {
  await createUser();
  return <div>Creating user...</div>;
};

export default page;
