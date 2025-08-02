import React, { createContext, useCallback, useState } from 'react'
import { Notification, NotificationType } from '../../../shared/ui/notification/Notification.tsx'

interface NotificationState {
  type: NotificationType
  title: string
  message: string
  autoClose?: boolean
  autoCloseDelay?: number
}

interface NotificationContextType {
  notify: (data: NotificationState) => void
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [notification, setNotification] = useState<NotificationState>({
    type: 'info',
    title: '',
    message: '',
    autoClose: true,
    autoCloseDelay: 5000
  })

  const notify = useCallback((data: NotificationState) => {
    setNotification({ ...data })
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Notification
        type={notification.type}
        title={notification.title}
        message={notification.message}
        isVisible={isVisible}
        onClose={handleClose}
        autoClose={notification.autoClose}
        autoCloseDelay={notification.autoCloseDelay}
      />
    </NotificationContext.Provider>
  )
}
