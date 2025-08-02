import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: React.ReactNode
  loading?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', loading, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
        {loading && (
          <div className="pointer-events-none absolute inset-y-0 left-7 flex items-center pl-3">{loading}</div>
        )}
        <input
          className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400 ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 dark:border-red-400' : ''} ${props.readOnly ? 'cursor-not-allowed bg-gray-50 dark:bg-gray-600' : ''} ${className} `}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
