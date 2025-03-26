'use client'
import { Button, UploadXLSX } from './ui/buttons'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { User } from '@/app/lib/defenitions'
import { fetchUsers, removeAllUsers, createNewUser } from './lib/actions'
import Table from './ui/table'
import { TableSkeleton } from './ui/skeletons'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadusers() {
      setLoading(true)
      const response = await fetchUsers()
      setUsers(response)
      setLoading(false)
      setLoaded(true)
    }

    loadusers()
  }, [])

  return (
    <div className="min-h-screen p-6 bg-white shadow-md">
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="flex justify-end gap-2 items-center mb-4">
        <Button
          name="Create New"
          action={createNewUser}
          message="New user has been created"
          setUsers={() => {
            setUsers([])
          }}
        />
        <Button
          name="Delete All"
          action={removeAllUsers}
          message="All users has been deleted"
          setUsers={() => {
            setUsers([])
          }}
        />
        <UploadXLSX setUsers={setUsers} />
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table users={users} isLoaded={isLoaded} />
      )}
    </div>
  )
}
