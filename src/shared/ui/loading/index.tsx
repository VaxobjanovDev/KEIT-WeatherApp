import React from 'react'

interface LoadingSpinnerProps {
  size?: number
  colorClass?: string
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  colorClass = 'text-white',
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center`}>
      <svg
        className={`animate-spin ${colorClass} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ width: size, height: size }}
      >
        <circle className="opacity-100" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  )
}
