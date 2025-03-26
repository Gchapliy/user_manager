import * as XLSX from 'xlsx'
import { User } from '@/app/lib/defenitions'

export async function parseXLSX(file: File): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        const users: User[] = XLSX.utils
          .sheet_to_json(sheet)
          .map((row: any) => ({
            id: Number(row.ID),
            name: String(row.Name),
            email: String(row.Email),
            createdAt: new Date(row['Created At']),
          }))
        resolve(users)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => reject(error)

    reader.readAsArrayBuffer(file)
  })
}
