'use client'
import { UploadXLSX } from './ui/buttons'
import { Toaster } from 'react-hot-toast'
import { Suspense, useEffect, useState } from 'react'
import { User } from '@/app/lib/defenitions'
import { fetchUsers } from './lib/actions'
import Table from './ui/table'
import { TableSkeleton } from './ui/skeletons'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function loadusers() {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const response = await fetchUsers()
      setUsers(response)
    }

    loadusers()
  }, [])

  return (
    <div className="min-h-screen p-6 bg-white shadow-md">
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="flex justify-end gap-2 items-center mb-4">
        <button className="bg-black text-white px-4 py-2 rounded-md">
          Create New
        </button>
        <UploadXLSX setUsers={setUsers} />
      </div>
      <Table users={users} />
    </div>
  )
}
