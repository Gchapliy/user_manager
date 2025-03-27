import { useState } from 'react'
import { formatDate } from '../lib/utils'
import { validateUser, createUser } from '../lib/actions'
import { Xmark } from './icons'
import toast from 'react-hot-toast'
import { DBResult } from '../lib/defenitions'
import { processDBResult } from '../lib/actionsClient'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  loadUsersAction: () => void
}

export default function UserModal({
  isOpen,
  onClose,
  loadUsersAction,
}: UserModalProps) {
  const currentDate = formatDate(new Date())
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState(currentDate)
  const [isPersisting, setPersisting] = useState(false)

  const errorsInitialState = {
    errors: {
      name: [] as string[],
      email: [] as string[],
    },
    message: '',
  }
  const [errors, setErrors] = useState(errorsInitialState)

  const handleSave = async () => {
    const validateErrors = await validateUser({
      name: name,
      email: email,
    })
    if (validateErrors && validateErrors.errors) {
      setErrors({
        errors: {
          name: validateErrors.errors.name || [],
          email: validateErrors.errors.email || [],
        },
        message: validateErrors.message,
      })
    } else {
      try {
        setPersisting(true)
        const result: DBResult = await createUser({
          name: name,
          email: email,
          createdAt: new Date(createdAt),
        })
        processDBResult(result)
      } catch (error) {
        toast.error(`Unfortunatelly some error has happened. Try again`)
      } finally {
        setPersisting(false)
        handleClose()
        loadUsersAction()
      }
    }
  }

  const handleClose = async () => {
    setErrors(errorsInitialState)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-white/1">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-black hover:text-gray-500"
        >
          <Xmark className={'w-5 h-5'} />
        </button>
        <h2 className="text-lg text-black font-semibold">Create New Item</h2>
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
              className="w-full border p-2 rounded-md text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {errors.errors.name &&
                errors.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {errors.errors.email &&
              errors.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded-md text-black"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              max={currentDate}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleSave}
            type="submit"
            className="px-4 py-2 bg-black hover:bg-gray-700 text-white flex items-center justify-center rounded-md"
          >
            {isPersisting ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              <span>Save</span>
            )}
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 border rounded-md text-black hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
