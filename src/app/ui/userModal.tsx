import { useEffect, useState } from 'react'
import { formatDate, formatDateForMySQL } from '../lib/utils'
import { validateUser, createUser, updateUserData } from '../lib/actions'
import { Xmark } from './icons'
import toast from 'react-hot-toast'
import { DBResult, User } from '../lib/defenitions'
import { processDBResult } from '../lib/actionsClient'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  loadUsersAction: () => void
  user?: User
}

export default function UserModal({
  isOpen,
  onClose,
  loadUsersAction,
  user,
}: UserModalProps) {
  const currentDate = formatDate(new Date())
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState(currentDate)
  const [isPersisting, setPersisting] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    if (user && !isChanging) {
      setIsUpdate(true)
      setName(user.name)
      setEmail(user.email)
      setCreatedAt(formatDate(user.createdAt))
    }
  })

  const errorsInitialState = {
    errors: {
      name: [] as string[],
      email: [] as string[],
    },
    message: '',
  }
  const [errors, setErrors] = useState(errorsInitialState)

  const handleUserData = async () => {
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
        let result: DBResult | undefined = undefined
        if (user) {
          result = await updateUserData({
            id: user.id,
            name: name,
            email: email,
            createdAt: new Date(createdAt),
          })
        } else {
          result = await createUser({
            name: name,
            email: email,
            createdAt: new Date(createdAt),
          })
        }
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

  const handleOnChange = async (action: () => void) => {
    setIsChanging(true)
    action()
  }

  const handleClose = async () => {
    setErrors(errorsInitialState)
    setIsChanging(false)
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
        <h2 className="text-lg text-black font-semibold">
          {isUpdate ? 'Update user data' : 'Create New Item'}
        </h2>
        <p className="text-gray-500 mb-4">Fill in the details for the item</p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-md text-black"
              value={name}
              onChange={(e) =>
                handleOnChange(() => {
                  setName(e.target.value)
                })
              }
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
              onChange={(e) =>
                handleOnChange(() => {
                  setEmail(e.target.value)
                })
              }
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
              onChange={(e) =>
                handleOnChange(() => {
                  setCreatedAt(e.target.value)
                })
              }
              max={currentDate}
            />
          </div>
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {errors.message && (
            <p className="mt-2 text-sm text-red-500">{errors.message}</p>
          )}
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleUserData}
            type="submit"
            className="px-4 py-2 bg-black hover:bg-gray-700 text-white flex items-center justify-center rounded-md"
          >
            {isPersisting ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              <span>{isUpdate ? 'Update' : 'Save'}</span>
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
