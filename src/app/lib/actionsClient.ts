import toast from 'react-hot-toast'
import { DBResult } from './defenitions'

export function processDBResult(result: DBResult | undefined) {
  if (!result) return
  if (result.isSuccess) {
    toast.success(result.message)
  } else {
    toast.error(result.message)
  }
}
