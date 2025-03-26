export function TableSkeleton() {
  return (
    <table className="min-w-full border rounded-lg">
      <thead>
        <tr className="bg-white border-b">
          {/* <th className="text-left p-3 text-gray-400">Name</th> */}
          <th className="text-left p-3 text-gray-400">LOADING</th>
          <th className="text-left p-3 text-gray-400">Email</th>
          <th className="text-left p-3 text-gray-400">Created At</th>
          <th className="text-left p-3 text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="p-3 text-black"></td>
          <td className="p-3 text-black"></td>
          <td className="p-3 text-black"></td>
          <td className="p-3 text-black flex gap-2">
            <button className="border p-2 rounded-md"></button>
            <button className="border p-2 rounded-md"></button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  )
}
