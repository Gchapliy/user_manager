import { useState } from 'react'
import toast from 'react-hot-toast'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  action: () => void
  loadUsersAction: () => void
  message?: string
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  action,
  loadUsersAction,
  message,
}: DeleteModalProps) {
  const [isDeleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    action()
    setDeleting(false)
    onClose()
    loadUsersAction()
    if (message) toast.success(message)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-white/1">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-lg text-black font-semibold">
          Are you sure about deleting?
        </h2>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-black hover:bg-gray-700 text-white flex items-center justify-center rounded-md"
          >
            {isDeleting ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              <span>Delete</span>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-black hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
