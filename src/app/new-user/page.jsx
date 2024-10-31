import pool from "@/utils/db";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";


const createUser = async () => {
    console.log('creating user')
    let client;
    try {
        const { id, firstName, lastName, emailAddresses } = await currentUser()
        console.log('Fetched current user:', id)
        
        client = await pool.connect()
        console.log('Database connection established')

        await client.query('BEGIN')
        console.log('Transaction started')

        const { rows: [user] } = await client.query('SELECT * FROM users WHERE id = $1', [id])
        console.log('User query executed')

        if (!user) {
            await client.query('INSERT INTO users (id, name, email) VALUES ($1, $2, $3)', [id, firstName + " " + lastName, emailAddresses[0].emailAddress])
            console.log('User inserted')
        }

        await client.query('COMMIT')
        console.log('Transaction committed')

    } catch (e) {
        if (client) {
            await client.query('ROLLBACK')
            console.log('Transaction rolled back')
        }
        console.error('Error in createUser:', e)
        throw e
    } finally {
        if (client) {
            client.release()
            console.log('Database connection released')
        }
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
