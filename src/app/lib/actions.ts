'use server'
import { DBResult, User } from '@/app/lib/defenitions'
import {
  insertUsers,
  getUsers,
  deleteAllUsers,
  insertUser,
  deleteUserById,
  retrieveUserById,
  updateUser,
} from './db'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

export async function validateUser({
  name,
  email,
}: {
  name: string
  email: string
}) {
  const validatedFields = userSchema.safeParse({
    name: name,
    email: email,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    }
  }

  return {}
}
export async function getUserById(userId: number): Promise<DBResult> {
  return await retrieveUserById(userId)
}

export async function createUser(user: User): Promise<DBResult> {
  return await insertUser(user)
}

export async function updateUserData(user: User): Promise<DBResult> {
  return await updateUser(user)
}

export async function populateUsers(users: User[]): Promise<DBResult> {
  return await insertUsers(users)
}

export async function fetchUsers(): Promise<User[]> {
  return await getUsers()
}

export async function removeAllUsers() {
  await deleteAllUsers()
}

export async function removeUserById(userId: number): Promise<DBResult> {
  return await deleteUserById(userId)
}
