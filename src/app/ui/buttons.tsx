'use client'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { parseXLSX } from '@/app/lib/xlsxParser'
import { populateUsers } from '../lib/actions'
import { processDBResult } from '../lib/actionsClient'
import { toast } from 'react-hot-toast'
import { DBResult } from '../lib/defenitions'

export function UploadXLSX({
  loadUsersAction,
}: {
  loadUsersAction: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (file?: File) => {
    if (!file) {
      return
    }
    setLoading(true)
    try {
      const data = await parseXLSX(file)
      if (data && data.length > 0) {
        const result: DBResult = await populateUsers(data)
        loadUsersAction()
        processDBResult(result)
      } else {
        toast.error('Error during uploading. Probably file is empty')
      }
    } catch (error) {
      toast.error('Error during uploading. Try again.')
    }
    setLoading(false)
  }

  return (
    <label className="cursor-pointer inline-flex items-center gap-2 border px-4 py-2 rounded-md text-black bg-white hover:bg-gray-300">
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
        onChange={(e) => {
          handleUpload(e.target.files?.[0])
          e.target.value = ''
        }}
      />
    </label>
  )
}

export function Button({ name, action }: { name: string; action: () => void }) {
  return (
    <button
      onClick={action}
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
    >
      {name}
    </button>
  )
}
