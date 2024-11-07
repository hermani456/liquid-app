import pool from "@/utils/db";

export const createCompany = async (userId, company) => {
  try {
    const result = await pool.query(
      `INSERT INTO companies (user_id, name, rut, address, phone, icon)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [userId, company.name, company.rut, company.address, company.phone, company.icon]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

export const selectCompaniesByUserId = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT * FROM companies WHERE user_id = $1`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

// edit company should check if userid is the same as the company that is being edited

export const editCompany = async (userId, company) => {
  try {
    const result = await pool.query(
      `UPDATE companies
        SET name = $1, rut = $2, address = $3, phone = $4
        WHERE user_id = $5 AND id = $6
        RETURNING *`,
      [company.name, company.rut, company.address, company.phone, userId, company.id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

export const deleteCompany = async (userId, companyId) => {
  try {
    const result = await pool.query(
      `DELETE FROM companies WHERE user_id = $1 AND id = $2 RETURNING *`,
      [userId, companyId]
    );
    return result.rows[0];
  }
  catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}