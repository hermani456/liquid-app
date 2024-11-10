import pool from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createUser = async () => {
  let userExists = false;
  let userCreated = false;
  try {
    const {
      id,
      firstName,
      lastName,
      emailAddresses: [{ emailAddress }],
    } = await currentUser();

    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    const {
      rows: [user],
    } = await pool.query("SELECT id FROM users WHERE id = $1", [id]);

    if (user) {
      userExists = true;
    } else {
      const result = await pool.query(
        "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *",
        [id, fullName, emailAddress]
      );
      userCreated = result.rowCount > 0;
    }
  } catch (e) {
    console.error("Failed to create user:", e);
    throw e;
  } finally {
    if (userExists || userCreated) {
      redirect("/dashboard");
    }
  }
};

const page = async () => {
  await createUser();
  return <div>Creating user...</div>;
};

export default page;
