import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguagesIcon } from '../../shared/icons'

const languages = [
  { code: 'en', label: 'en' },
  { code: 'ru', label: 'ru' },
  { code: 'uz', label: 'uz' },
  { code: 'ko', label: 'ko' }
]

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation('main')
  const currentLanguage = i18n.language
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  console.log(currentLanguage)
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng)
    setMenuOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <div className="fixed right-4 top-20 z-50" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
        aria-label="Toggle language menu"
      >
        <LanguagesIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-[120px] rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                currentLanguage === lang.code
                  ? 'font-semibold text-blue-600 dark:text-blue-400'
                  : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {t(lang.label)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
