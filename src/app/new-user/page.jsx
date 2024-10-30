import pool from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";


const createUser = async () => {
    console.log('creating user')
    const { id, firstName, lastName, emailAddresses } = await currentUser()
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const
            { rows: [user] } = await client.query('SELECT * FROM users WHERE id = $1', [id])
        if (!user) {
            await client.query('INSERT INTO users (id, name, email) VALUES ($1, $2, $3)', [id, firstName + " " + lastName, emailAddresses[0].emailAddress])
        }
        await client.query('COMMIT')

    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    }
    finally {
        client.release()
    }

    redirect('/dashboard')
}


const page = async() => {
    await createUser()
  return (
    <div>
    </div>
  )
}

export default page
