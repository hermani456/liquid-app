import pool from "@/utils/db";

const page = async() => {
    const client = await pool.connect()
    const { rows } = await client.query('SELECT * FROM users')
    client.release()
    console.log(rows)
  return (
    <div>{rows.map(item => (
        <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.email}</p>
        </div>
    ))}</div>
  )
}

export default page