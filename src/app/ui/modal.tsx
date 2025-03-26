import { useState } from 'react'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (user: { name: string; email: string; createdAt: string }) => void
}

export default function UserModal({ isOpen, onClose, onSave }: UserModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  if (!isOpen) return null // Якщо модалка закрита — не рендеримо

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Create New Item</h2>
        <p className="text-gray-500 mb-4">
          Fill in the details for the new item
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded-md"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, email, createdAt })}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
