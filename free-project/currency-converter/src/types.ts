/**
 * Application-wide type definitions and interfaces
 */

/**
 * Conversion history record
 */
export interface ConversionHistory {
  id: string
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  rate: number
  timestamp: Date
}

/**
 * Exchange rate API response cached in memory and localStorage
 */
export interface CachedRates {
  [baseCurrency: string]: {
    rates: { [currency: string]: number }
    timestamp: number
  }
}

/**
 * State object returned by useExchangeRate hook
 */
export interface ExchangeRateState {
  rate: number | null
  loading: boolean
  error: string | null
}
