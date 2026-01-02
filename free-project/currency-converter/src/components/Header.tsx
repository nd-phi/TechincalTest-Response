import React from 'react'
import { useTranslation } from 'react-i18next'

interface HeaderProps {
  onLanguageChange: (lang: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation()

  return (
    <div className="bg-white shadow">
      <div className="container mx-auto px-8 py-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
        <div className="flex gap-2">
          {['en', 'es', 'fr', 'de', 'ja'].map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                i18n.language === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
