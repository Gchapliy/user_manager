'use client'
import { User, DBResult } from '@/app/lib/defenitions'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeleteUserModal from './deleteModal'
import { useState } from 'react'
import { formatDate } from '../lib/utils'
import { removeUserById } from '../lib/actions'
import toast from 'react-hot-toast'
import { processDBResult } from '../lib/actionsClient'
import { IconButton } from './buttons'
import UserModal from './userModal'

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
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [userState, setUserState] = useState<User>({
    id: 0,
    name: '',
    email: '',
    createdAt: new Date(),
  })

  const handleDeleteUser = async () => {
    try {
      if (userState.id) {
        const result: DBResult = await removeUserById(userState.id)
        setIsModalDeleteOpen(false)
        processDBResult(result)
      } else {
        toast.error('Some problem with user')
      }
    } catch (error) {
      console.log(error)
      toast.error(`Unfortunatelly some error has happened. Try again`)
    }
  }

  const handleModal = async (user: User, action: () => void) => {
    setUserState(user)
    action()
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
                <IconButton
                  icon={<PencilSquareIcon className="w-4" />}
                  action={() =>
                    handleModal(user, () => setIsModalEditOpen(true))
                  }
                />
                <IconButton
                  icon={<TrashIcon className="w-4" />}
                  action={() =>
                    handleModal(user, () => setIsModalDeleteOpen(true))
                  }
                />
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
      <UserModal
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        loadUsersAction={loadUsersAction}
        user={userState}
      />
    </div>
  )
}
