import React from 'react'

interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <div className="bg-blue-700 px-6 py-4 dark:bg-gray-700">
        <h2 className="text-xl font-semibold text-white dark:text-gray-100">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}
