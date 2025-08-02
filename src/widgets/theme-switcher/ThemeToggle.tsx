import React from 'react'
import { useTheme } from '../../app/providers/theme/ThemeContext.tsx'
import { MoonIcon, SunIcon } from '../../shared/icons/index.tsx'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-50 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  )
}
