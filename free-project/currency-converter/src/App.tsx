import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useExchangeRate } from './hooks/useExchangeRate'
import { ConversionHistory } from './types'
import { Header } from './components/Header'
import { HistoryPanel } from './components/HistoryPanel'
import { Converter } from './components/Converter'
import { FutureFeatures } from './components/FutureFeatures'

function formatCurrency(value: string): string {
  // Remove non-digit characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '')

  // Handle empty or invalid input
  if (!numericValue) return ''

  // Split by decimal point and limit to 2 decimal places
  const parts = numericValue.split('.')
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decimalPart = parts[1] ? parts[1].substring(0, 2) : ''

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart
}

function parseCurrencyValue(value: string): number {
  const numericValue = value.replace(/[^\d.]/g, '')
  return numericValue ? parseFloat(numericValue) : 0
}

function App() {
  const { i18n } = useTranslation()
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [history, setHistory] = useState<ConversionHistory[]>([])

  // Use custom hook for exchange rate fetching with 24-hour caching
  const { rate: exchangeRate, loading, error } = useExchangeRate(fromCurrency, toCurrency)

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setFromAmount(formatted)
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setToAmount(formatted)
  }

  const handleConvert = () => {
    const fromValue = parseCurrencyValue(fromAmount)

    if (fromValue > 0 && exchangeRate) {
      // Calculate the converted amount
      const convertedValue = (fromValue * exchangeRate).toFixed(2)
      setToAmount(formatCurrency(convertedValue))

      // Add to history
      const conversion: ConversionHistory = {
        id: Date.now().toString(),
        fromCurrency,
        toCurrency,
        fromAmount: fromValue,
        toAmount: parseFloat(convertedValue),
        rate: exchangeRate,
        timestamp: new Date(),
      }

      setHistory([conversion, ...history])
    }
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    const temp = fromAmount
    setFromAmount(toAmount)
    setToAmount(temp)
    // The hook will automatically fetch the swapped rate
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  const handleSelectHistory = (item: ConversionHistory) => {
    setFromCurrency(item.fromCurrency)
    setToCurrency(item.toCurrency)
    setFromAmount(formatCurrency(item.fromAmount.toString()))
    setToAmount(formatCurrency(item.toAmount.toString()))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLanguageChange={handleLanguageChange} />

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          <HistoryPanel
            history={history}
            onClearHistory={handleClearHistory}
            onSelectHistory={handleSelectHistory}
          />

          <Converter
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            fromAmount={fromAmount}
            toAmount={toAmount}
            loading={loading}
            error={error}
            exchangeRate={exchangeRate}
            onFromCurrencyChange={setFromCurrency}
            onToCurrencyChange={setToCurrency}
            onFromAmountChange={handleFromAmountChange}
            onToAmountChange={handleToAmountChange}
            onSwapCurrencies={handleSwapCurrencies}
            onConvert={handleConvert}
            onRetry={() => {
              const temp = toCurrency
              setToCurrency(fromCurrency)
              setTimeout(() => setToCurrency(temp), 100)
            }}
          />

          <FutureFeatures />
        </div>
      </div>
    </div>
  )
}

export default App
