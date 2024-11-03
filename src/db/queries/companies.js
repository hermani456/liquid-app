import pool from "@/utils/db";

export const createCompany = async (userId, company) => {
  try {
    const result = await pool.query(
      `INSERT INTO companies (user_id, name, rut, address, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [userId, company.name, company.rut, company.address, company.phone]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};
