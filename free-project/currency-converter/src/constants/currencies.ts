/**
 * Currency Constants
 * Defines the top 5 most popular currencies for the converter
 */

export const TOP_5_CURRENCIES = {
  USD: 'USD', // United States Dollar
  EUR: 'EUR', // Euro
  GBP: 'GBP', // British Pound
  JPY: 'JPY', // Japanese Yen
  CHF: 'CHF', // Swiss Franc
} as const

export type CurrencyCode = (typeof TOP_5_CURRENCIES)[keyof typeof TOP_5_CURRENCIES]

/**
 * Array of currency codes for easy iteration
 */
export const CURRENCY_CODES: CurrencyCode[] = Object.values(TOP_5_CURRENCIES)

/**
 * Default currencies for conversion
 */
export const DEFAULT_FROM_CURRENCY: CurrencyCode = 'USD'
export const DEFAULT_TO_CURRENCY: CurrencyCode = 'EUR'
