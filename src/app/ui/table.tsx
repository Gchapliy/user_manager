'use client'
import { User } from '@/app/lib/defenitions'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeleteUserModal from './deleteModal'
import { useState } from 'react'
import { formatDate } from '../lib/utils'
import { removeUserById } from '../lib/actions'
import { DBResult } from '@/app/lib/defenitions'
import toast from 'react-hot-toast'
import { processDBResult } from '../lib/actionsClient'

interface TableProps {
  users: User[]
  isLoaded: boolean
  loadUsersAction: () => void
}

export default function Table({
  users,
  isLoaded,
  loadUsersAction,
}: TableProps) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [userId, setUserId] = useState(0)

  const handleDeleteUser = async () => {
    try {
      const result: DBResult = await removeUserById(userId)
      setIsModalDeleteOpen(false)
      processDBResult(result)
    } catch (error) {
      console.log(error)
      toast.error(`Unfortunatelly some error has happened. Try again`)
    }
  }

  const handleDeleteModal = async (userId?: number) => {
    if (userId) {
      setIsModalDeleteOpen(true)
      setUserId(userId)
    } else {
      toast.error('Some problem with user')
    }
  }

  return (
    <div>
      <table className="min-w-full border rounded-lg">
        <thead>
          <tr className="bg-white border-b">
            <th className="text-left p-3 text-gray-400">Name</th>
            <th className="text-left p-3 text-gray-400">Email</th>
            <th className="text-left p-3 text-gray-400">Created At</th>
            <th className="text-left p-3 text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3 text-black">{user.name}</td>
              <td className="p-3 text-black">{user.email}</td>
              <td className="p-3 text-black">{formatDate(user.createdAt)}</td>
              <td className="p-3 text-black flex gap-2">
                <button className="border p-2 rounded-md hover:bg-gray-300">
                  <PencilSquareIcon className="w-4" />
                </button>
                <button
                  onClick={() => handleDeleteModal(user.id)}
                  className="border p-2 rounded-md hover:bg-gray-300"
                >
                  <TrashIcon className="w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoaded && users.length === 0 && (
        <div className="text-black text-center mt-4">
          Users data is empty. Let's add new one.
        </div>
      )}
      <DeleteUserModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        action={handleDeleteUser}
        loadUsersAction={loadUsersAction}
      />
    </div>
  )
}
