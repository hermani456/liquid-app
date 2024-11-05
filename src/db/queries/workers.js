import pool from "@/utils/db";

export const selectWorkersByUserId = async (userId, companyID) => {
  try {
    const { rows } = await pool.query(
      `SELECT w.*
        FROM workers w
        JOIN companies c ON w.company_id = c.id
        WHERE c.user_id = $1 AND w.company_id = $2;`,
      [userId, companyID]
    );
    return rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};


// export const getWorkerByIdAndUserId = async (workerId, userId) => {
//   try {
//     const { rows } = await pool.query(
//       `SELECT w.*
//        FROM workers w
//        JOIN companies c ON w.company_id = c.id
//        WHERE w.id = $1 AND c.user_id = $2;`,
//       [workerId, userId]
//     );
//     return rows[0]; // Return the worker if found
//   } catch (error) {
//     console.error("Error fetching worker", error);
//     throw error;
//   }
// };

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

export const createNewWorker = async (
  userId, company_id, name, last_name, rut, sex, home_address, phone, position, base_salary, email
) => {
  try {
    const companyResult = await pool.query(
      `SELECT user_id FROM companies WHERE id = $1`,
      [company_id]
    );

    if (companyResult.rows.length === 0) {
      throw new Error('Company not found');
    }

    const companyOwnerId = companyResult.rows[0].user_id;
    
    if (companyOwnerId !== userId) {
      throw new Error('You do not have permission to add workers to this company');
    }
    
    const result = await pool.query(
      `INSERT INTO workers (company_id, name, last_name, rut, sex, home_address, phone, position, base_salary, email)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;`,
      [
        company_id,
        name,
        last_name,
        rut,
        sex,
        home_address,
        phone,
        position,
        base_salary,
        email,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

export const deleteWorker = async (userId, workerId) => {
  try {
    const result = await pool.query(
      `SELECT w.id
       FROM workers w
       JOIN companies c ON w.company_id = c.id
       WHERE w.id = $1 AND c.user_id = $2;`,
      [workerId, userId]
    );

    if (result.rows.length === 0) {
      throw new Error('You do not have permission to delete this worker or the worker does not exist.');
    }
    const deletedWorker = await pool.query(
      `DELETE FROM workers
        WHERE id = $1
        RETURNING *;`,
      [workerId]
    );
    return deletedWorker.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}