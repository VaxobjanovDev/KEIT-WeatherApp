import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarIcon, TimeIcon } from '../../icons'

interface DateTimePickerProps {
  date: string
  time: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  dateError?: string
  timeError?: string
  onDateRestrictionWarning?: () => void
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
  onDateRestrictionWarning
}) => {
  const { t } = useTranslation('home')
  const today = new Date().toISOString().split('T')[0]
  const dateInputRef = useRef<HTMLInputElement>(null)
  const clockInputRef = useRef<HTMLInputElement>(null)

  const handleDateIconClick = () => {
    const inputElement = dateInputRef.current as HTMLInputElement
    if (dateInputRef.current) {
      // Browser support: prefer showPicker, fallback to focus
      if ('showPicker' in dateInputRef.current) {
        inputElement.showPicker()
      } else {
        inputElement.focus()
      }
    }
  }

  const handleClockIconClick = () => {
    const inputElement = clockInputRef.current as HTMLInputElement
    if (clockInputRef.current) {
      // Browser support: prefer showPicker, fallback to focus
      if ('showPicker' in clockInputRef.current) {
        inputElement.showPicker()
      } else {
        inputElement.focus()
      }
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value

    // If user tries to select a date other than today, show warning and reset to today
    if (selectedDate !== today) {
      if (onDateRestrictionWarning) {
        onDateRestrictionWarning()
      }
      // Reset to today
      onDateChange(today)
      return
    }

    onDateChange(selectedDate)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('Date')}</label>
        <div className="relative">
          <CalendarIcon
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            onClick={handleDateIconClick}
          />
          <input
            ref={dateInputRef}
            type="date"
            value={date}
            onChange={handleDateChange}
            className={`w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400 ${dateError ? 'border-red-500 dark:border-red-400' : ''} `}
          />
        </div>
        {dateError && <p className="text-sm text-red-600 dark:text-red-400">{dateError}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('Time')}</label>
        <div className="relative">
          <TimeIcon
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            onClick={handleClockIconClick}
          />
          <input
            ref={clockInputRef}
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className={`w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400 ${timeError ? 'border-red-500 dark:border-red-400' : ''} `}
          />
        </div>
        {timeError && <p className="text-sm text-red-600 dark:text-red-400">{timeError}</p>}
      </div>
    </div>
  )
}
