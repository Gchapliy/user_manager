export type User = {
  id?: number
  name: string
  email: string
  createdAt: Date
}

export type DBResult<T = void> = {
  message: string
  isSuccess: boolean
  result?: T
}
