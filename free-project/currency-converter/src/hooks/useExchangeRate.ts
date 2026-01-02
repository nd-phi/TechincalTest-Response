import { useState, useEffect, useRef } from 'react'
import { CachedRates, ExchangeRateState } from '../types'

// Cache rates in localStorage and memory
const CACHE_KEY = 'currency_exchange_rates_cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

/**
 * Custom hook to fetch and cache exchange rates
 * Rates are cached for 24 hours and only refetched when expired
 * @param baseCurrency - The base currency code (e.g., 'USD')
 * @param targetCurrency - The target currency code (e.g., 'EUR')
 * @returns Object containing rate, loading state, and error message
 */
export const useExchangeRate = (
  baseCurrency: string,
  targetCurrency: string
): ExchangeRateState => {
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cacheRef = useRef<CachedRates>({})

  // Initialize cache from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        cacheRef.current = JSON.parse(cached)
      }
    } catch (err) {
      console.error('Error loading cache from localStorage:', err)
    }
  }, [])

  // Check if cached rates are still valid (not older than 24 hours)
  const isCacheValid = (baseCurrency: string): boolean => {
    const cached = cacheRef.current[baseCurrency]
    if (!cached) return false
    const now = Date.now()
    return now - cached.timestamp < CACHE_DURATION
  }

  // Save cache to localStorage
  const saveCache = () => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheRef.current))
    } catch (err) {
      console.error('Error saving cache to localStorage:', err)
    }
  }

  // Fetch rates from API
  const fetchRates = async (base: string, target: string) => {
    // Check cache first
    if (isCacheValid(base)) {
      const cachedRate = cacheRef.current[base].rates[target]
      if (cachedRate) {
        setRate(cachedRate)
        setError(null)
        setLoading(false)
        return
      }
    }

    // Cache miss or expired, fetch from API
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: any = await response.json()

      // Validate response
      if (data.result === 'error') {
        throw new Error(data['error-type'] || 'Failed to fetch exchange rates')
      }

      if (!data.rates || !data.rates[target]) {
        throw new Error('Invalid currency or no rates available')
      }

      // Update cache
      cacheRef.current[base] = {
        rates: data.rates,
        timestamp: Date.now(),
      }
      saveCache()

      // Set the target rate
      const fetchedRate = data.rates[target]
      setRate(fetchedRate)
      setError(null)
    } catch (err: any) {
      console.error('Exchange rate fetch error:', err)
      setError(err.message || 'Failed to fetch exchange rate')
      setRate(null)
    } finally {
      setLoading(false)
    }
  }

  // Effect hook to fetch rates when currencies change
  useEffect(() => {
    if (!baseCurrency || !targetCurrency || baseCurrency === targetCurrency) {
      setRate(null)
      return
    }

    fetchRates(baseCurrency, targetCurrency)
  }, [baseCurrency, targetCurrency])

  return { rate, loading, error }
}
