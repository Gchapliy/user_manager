import { User } from '@/app/lib/defenitions'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function Table({
  users,
  isLoaded,
}: {
  users: User[]
  isLoaded: boolean
}) {
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
              <td className="p-3 text-black">
                {user.createdAt.toISOString().split('T')[0]}
              </td>
              <td className="p-3 text-black flex gap-2">
                <button className="border p-2 rounded-md">
                  <PencilSquareIcon className="w-4" />
                </button>
                <button className="border p-2 rounded-md">
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
    </div>
  )
}
