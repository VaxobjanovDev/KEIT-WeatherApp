import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, SearchIcon } from '../../icons'

interface AutocompleteOption {
  id: number
  name: string
}

interface AutocompleteProps {
  label: string
  options: AutocompleteOption[]
  value?: AutocompleteOption | null
  onChange: (option: AutocompleteOption | null) => void
  placeholder?: string
  error?: string
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Search...',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayValue, setDisplayValue] = useState(value?.name || '')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    setDisplayValue(value?.name || '')
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
        setDisplayValue(value?.name || '')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)
    setSearchTerm(inputValue)
    setIsOpen(true)
  }

  const handleOptionSelect = (option: AutocompleteOption) => {
    onChange(option)
    setDisplayValue(option.name)
    setSearchTerm('')
    setIsOpen(false)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSearchTerm(displayValue)
    }
  }

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            className={`w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400 ${error ? 'border-red-500 dark:border-red-400' : ''} `}
            placeholder={placeholder}
          />
          <button type="button" onClick={handleToggle} className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const selected = value?.id === option?.id
                const buttonClasses = `w-full px-4 py-3 text-left text-gray-900 dark:text-gray-100 focus:outline-none transition-colors duration-150 ${
                  selected
                    ? 'bg-blue-100 dark:bg-gray-600' // Classes for a selected button
                    : 'hover:bg-blue-50 dark:hover:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-700' // Classes for a normal button
                }`
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className={buttonClasses}
                  >
                    {option.name}
                  </button>
                )
              })
            ) : (
              <div className="px-4 py-3 text-gray-500 dark:text-gray-400">No options found</div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
