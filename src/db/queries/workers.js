import pool from "@/utils/db";

export const selectWorkersByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT w.*
        FROM workers w
        JOIN companies c ON w.company_id = c.id
        WHERE c.user_id = $1 AND w.company_id = 1;`,
    [userId]
  );
  return rows;
};
