export function formatDateForMySQL(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
