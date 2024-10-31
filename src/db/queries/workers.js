import pool from "@/utils/db";

export const selectWorkersByUserId = async (userId) => {
  try {
    const { rows } = await pool.query(
      `SELECT w.*
        FROM workers w
        JOIN companies c ON w.company_id = c.id
        WHERE c.user_id = $1 AND w.company_id = 1;`,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};

export const getWorkerByIdAndUserId = async (workerId, userId) => {
  try {
    const { rows } = await pool.query(
      `SELECT w.*
       FROM workers w
       JOIN companies c ON w.company_id = c.id
       WHERE w.id = $1 AND c.user_id = $2;`,
      [workerId, userId]
    );
    return rows[0]; // Return the worker if found
  } catch (error) {
    console.error('Error fetching worker', error);
    throw error;
  }
};

export const updateWorker = async (
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
) => {
  try {
    const result = await pool.query(
      `UPDATE workers
        SET name = $1, last_name = $2, rut = $3, sex = $4, home_address = $5, phone = $6,
            position = $7, base_salary = $8, email = $9
        WHERE id = $10
        RETURNING *;`,
      [
        name,
        last_name,
        rut,
        sex,
        home_address,
        phone,
        position,
        base_salary,
        email,
        id,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};