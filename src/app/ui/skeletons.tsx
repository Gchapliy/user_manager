export function TableSkeleton() {
  return (
    <table className="min-w-full border rounded-lg animate-pulse">
      <thead>
        <tr className="bg-gray-200 border-b">
          <th className="text-left p-3 text-gray-400">Name</th>
          <th className="text-left p-3 text-gray-400">Email</th>
          <th className="text-left p-3 text-gray-400">Created At</th>
          <th className="text-left p-3 text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }, (_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </tbody>
    </table>
  )
}

function TableRowSkeleton() {
  return (
    <tr className="border-b">
      <td className="p-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="p-3">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      </td>
      <td className="p-3">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </td>
      <td className="p-3 flex gap-2">
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </td>
    </tr>
  )
}
