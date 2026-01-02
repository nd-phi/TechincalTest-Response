import React from 'react'
import { useTranslation } from 'react-i18next'
import { CURRENCY_CODES } from '../constants/currencies'

interface ConverterProps {
  fromCurrency: string
  toCurrency: string
  fromAmount: string
  toAmount: string
  loading: boolean
  error: string | null
  exchangeRate: number | null
  onFromCurrencyChange: (currency: string) => void
  onToCurrencyChange: (currency: string) => void
  onFromAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSwapCurrencies: () => void
  onConvert: () => void
  onRetry: () => void
}

export const Converter: React.FC<ConverterProps> = ({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  loading,
  error,
  exchangeRate,
  onFromCurrencyChange,
  onToCurrencyChange,
  onFromAmountChange,
  onToAmountChange,
  onSwapCurrencies,
  onConvert,
  onRetry,
}) => {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Convert</h2>

      {/* Error Message with Retry */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={onRetry}
            disabled={loading}
            className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors text-sm font-semibold"
          >
            {loading ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      )}

      {/* Exchange Rate Display */}
      {exchangeRate && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-center">
          <p className="text-sm text-gray-600">
            1 {fromCurrency} ={' '}
            <span className="font-bold text-blue-600">{exchangeRate.toFixed(2)}</span> {toCurrency}
          </p>
        </div>
      )}

      {/* From Currency Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">{t('labels.fromCurrency')}</label>
        <select
          value={fromCurrency}
          onChange={(e) => onFromCurrencyChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        >
          {CURRENCY_CODES.map((code) => (
            <option key={code} value={code}>
              {code} - {t(`currencies.${code}.name`)}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={fromAmount}
          onChange={onFromAmountChange}
          placeholder="0.00"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">{t(`currencies.${fromCurrency}.symbol`)}</p>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={onSwapCurrencies}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2"
        >
          {loading ? '⟳ Loading...' : '⇄ Swap'}
        </button>
      </div>

      {/* To Currency Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">{t('labels.toCurrency')}</label>
        <select
          value={toCurrency}
          onChange={(e) => onToCurrencyChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        >
          {CURRENCY_CODES.map((code) => (
            <option key={code} value={code}>
              {code} - {t(`currencies.${code}.name`)}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={toAmount}
          onChange={onToAmountChange}
          placeholder="0.00"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">{t(`currencies.${toCurrency}.symbol`)}</p>
      </div>

      {/* Convert Button */}
      <button
        onClick={onConvert}
        disabled={loading || !exchangeRate}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors font-bold text-lg"
      >
        {t('labels.convert') || 'Convert'}
      </button>
    </div>
  )
}
