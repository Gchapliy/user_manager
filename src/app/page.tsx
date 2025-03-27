'use client'
import { Button, UploadXLSX } from './ui/buttons'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { User } from '@/app/lib/defenitions'
import { fetchUsers, removeAllUsers } from './lib/actions'
import Table from './ui/table'
import { TableSkeleton } from './ui/skeletons'
import UserModal from './ui/userModal'
import DeleteUserModal from './ui/deleteModal'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  async function loadusers() {
    setLoading(true)
    const response = await fetchUsers()
    setUsers(response)
    setLoading(false)
    setLoaded(true)
  }

  useEffect(() => {
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
          action={() => {
            setIsModalCreateOpen(true)
          }}
        />
        <Button
          name="Delete All"
          action={() => {
            setIsModalDeleteOpen(true)
          }}
        />
        <UploadXLSX loadUsersAction={loadusers} />
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table users={users} isLoaded={isLoaded} loadUsersAction={loadusers} />
      )}
      <UserModal
        isOpen={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
        loadUsersAction={loadusers}
      />
      <DeleteUserModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        action={() => removeAllUsers()}
        loadUsersAction={loadusers}
        message="All users have been deleted"
      />
    </div>
  )
}
