'use client'
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { parseXLSX } from '@/app/lib/xlsxParser'
import { populateUsers } from '../lib/actions'
import { toast } from 'react-hot-toast'

export function UploadXLSX({ setUsers }: { setUsers: (users: any) => void }) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (file?: File) => {
    if (!file) {
      return
    }
    setLoading(true)
    try {
      const data = await parseXLSX(file)
      if (data && data.length > 0) {
        await populateUsers(data)
        setUsers(data)
        toast.success('File uploaded successfully')
      } else {
        toast.error('Error during uploading. Probably file is empty')
      }
    } catch (error) {
      toast.error('Error during uploading. Try again.')
    }
    setLoading(false)
  }

  return (
    <label className="cursor-pointer inline-flex items-center gap-2 border px-4 py-2 rounded-md text-black bg-white hover:bg-gray-100">
      {loading ? (
        <span className="animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4"></span>
      ) : (
        <ArrowUpTrayIcon className="w-4 h-4" />
      )}
      <span>{loading ? 'Uploading...' : 'Upload XLSX'}</span>
      <input
        type="file"
        accept=".xlsx"
        className="hidden"
        onChange={(e) => handleUpload(e.target.files?.[0])}
      />
    </label>
  )
}

export function Button({
  name,
  action,
  message,
  setUsers,
}: {
  name: string
  action: () => void
  message: string
  setUsers: () => void
}) {
  const handleOnClick = async function () {
    await action()
    setUsers()
    toast.success(message)
  }

  return (
    <button
      onClick={handleOnClick}
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
    >
      {name}
    </button>
  )
}
