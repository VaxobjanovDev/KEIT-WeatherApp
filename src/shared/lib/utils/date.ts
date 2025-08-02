import { format, subMinutes } from 'date-fns'

export function formatDateForApi(date: Date): string {
  return format(date, 'yyyyMMdd')
}

export function formatTimeForApi(date: Date): string {
  // Subtract 10 minutes from the selected time before sending to API
  const adjustedTime = subMinutes(date, 10)
  return format(adjustedTime, 'HHmm')
}

export function isToday(date: Date): boolean {
  const today = new Date()
  const inputDate = new Date(date)
  return inputDate.toDateString() === today.toDateString()
}

export function isTodayStrict(dateString: string): boolean {
  const inputDate = new Date(dateString)
  const today = new Date()

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  )
}
