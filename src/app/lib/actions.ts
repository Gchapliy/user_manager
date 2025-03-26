'use server'
import { User } from '@/app/lib/defenitions'
import { insertUsers, getUsers, deleteAllUsers } from './db'

export async function populateUsers(users: User[]) {
  try {
    await insertUsers(users)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchUsers(): Promise<User[]> {
  return await getUsers()
}

export async function removeAllUsers() {
  await deleteAllUsers()
}

export async function createNewUser() {
  console.log('FUNCTION CREATE NEW USER CALLED!!!')
}
