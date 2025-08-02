import React, { useEffect } from 'react'
import { CancelIcon, AlertIcon, CheckCircleIcon, AlertTriangleIcon } from '../../icons'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface NotificationProps {
  type: NotificationType
  title: string
  message: string
  isVisible: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseDelay?: number
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose])

  if (!isVisible) return null

  const icons = {
    success: <CheckCircleIcon className="h-6 w-6" />,
    error: <AlertIcon className="h-6 w-6" />,
    warning: <AlertTriangleIcon className="h-6 w-6" />,
    info: <AlertIcon className="h-6 w-6" />
  }

  const styles = {
    success: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    warning:
      'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
  }

  const iconStyles = {
    success: 'text-green-500 dark:text-green-400',
    error: 'text-red-500 dark:text-red-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    info: 'text-blue-500 dark:text-blue-400'
  }

  return (
    <div className="animate-in slide-in-from-right fixed right-4 top-4 z-50 w-96 duration-300">
      <div className={`rounded-lg border p-4 shadow-lg ${styles[type]}`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${iconStyles[type]}`}>{icons[type]}</div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <CancelIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
