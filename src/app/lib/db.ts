import mysql, { Connection } from 'mysql2/promise'
import { DBResult, User } from './defenitions'
import { formatDateForMySQL } from './utils'

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

export async function deleteAllUsers() {
  await executeQuery(`DELETE FROM users;`)
}

export async function getUsers(): Promise<User[]> {
  const connection = await dbConnect()
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    'SELECT id, name, email, createdAt FROM users'
  )
  console.log(rows)
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: new Date(row.createdAt),
  }))
}

async function checkUserByParameter(
  parameter: any,
  parameterName: string
): Promise<boolean> {
  const connection = await dbConnect()
  const sql = `SELECT id, name, email, createdAt FROM users WHERE ${parameterName} = ?`
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(sql, [
    parameter,
  ])

  if (!Array.isArray(rows) || rows.length === 0) {
    return false
  }

  return true
}

export async function insertUsers(users: User[]): Promise<DBResult> {
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

  await executeQuery(sql, values)
  return { message: 'File uploaded successfully', isSuccess: true }
}

export async function insertUser(user: User): Promise<DBResult> {
  const userInDB = await checkUserByParameter(user.email, 'email')

  if (userInDB) {
    return {
      message: 'User is already existed',
      isSuccess: false,
    }
  }

  await executeQuery(
    'INSERT INTO users (name, email, createdAt) VALUES (?, ?, ?)',
    [user.name, user.email, formatDateForMySQL(user.createdAt)]
  )

  return {
    message: 'User successfully created',
    isSuccess: true,
  }
}

export async function deleteUserById(userId: number): Promise<DBResult> {
  const parameterName = 'id'
  const isExisted = await checkUserByParameter(userId, parameterName)

  console.log('userID: ', userId)
  if (!isExisted) {
    return { message: 'User is not existed', isSuccess: false }
  }

  const sql = `DELETE FROM users WHERE ${parameterName} = ?`

  await executeQuery(sql, [userId])
  return { message: 'User has been successfuly deleted', isSuccess: true }
}

export async function retrieveUserById(userId: number): Promise<DBResult> {
  return { message: 'User has been successfuly deleted', isSuccess: true }
}
