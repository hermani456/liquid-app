import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
   connectionString: process.env.POSTGRES_URL,
   ssl: {
      rejectUnauthorized: true,
      ca: process.env.DB_SSL_CA
   },
});
// const pool = new Pool({
//    user: process.env.PGUSER,
//    host: process.env.PGHOST,
//    database: process.env.PGDATABASE,
//    password: process.env.PGPASSWORD,
//    port: process.env.PGPORT,
// });

export default pool;