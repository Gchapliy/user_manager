import mysql, { Connection } from 'mysql2/promise'
import { User } from './defenitions'

export async function dbConnect(): Promise<Connection> {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  })
  return connection
}

export async function executeQuery(query: string, values: any[] = []) {
  const connection = await dbConnect()
  const [results] = await connection.execute(query, values)
  connection.end()
  return results
}

export async function seedDatabase() {
  await executeQuery(`
           CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `)
}

export async function getUsers(): Promise<User[]> {
  const connection = await dbConnect()
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    'SELECT id, name, email, createdAt FROM users'
  )

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: new Date(row.createdAt),
  }))
}

export async function insertUsers(users: User[]) {
  const connection = await dbConnect()

  const placeholders = users.map(() => '(?, ?, ?)').join(', ')

  const values = users.flatMap((user) => [
    user.name,
    user.email,
    formatDateForMySQL(user.createdAt),
  ])
  const sql = `
    INSERT INTO users (name, email, createdAt)
    VALUES ${placeholders}
    ON DUPLICATE KEY UPDATE email = VALUES(email)
  `

  await connection.execute(sql, values)
  connection.end()
}

function formatDateForMySQL(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}
