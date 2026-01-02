# i18n Configuration Documentation

## Overview
This project uses **i18next** and **react-i18next** for internationalization (i18n) support. The application supports 5 languages and defines the top 5 most popular currencies.

## Directory Structure

```
src/
├── i18n.ts                 # i18n configuration and initialization
├── locales/                # Translation files directory
│   ├── en/
│   │   └── translation.json
│   ├── es/
│   │   └── translation.json
│   ├── fr/
│   │   └── translation.json
│   ├── de/
│   │   └── translation.json
│   └── ja/
│       └── translation.json
└── constants/
    └── currencies.ts       # Currency definitions and constants
```

## Top 5 Most Popular Currencies

The application defines and uses the following 5 most popular currencies:

1. **USD** - United States Dollar ($)
2. **EUR** - Euro (€)
3. **GBP** - British Pound (£)
4. **JPY** - Japanese Yen (¥)
5. **CHF** - Swiss Franc (CHF)

## Configuration Files

### `src/i18n.ts`
- Initializes i18next with all language resources
- Exports `TOP_5_CURRENCIES` constant for easy access
- Sets default language to English ('en')
- Configures interpolation to work with React

### `src/constants/currencies.ts`
- Defines `TOP_5_CURRENCIES` object with all currency codes
- Exports `CurrencyCode` TypeScript type for type safety
- Provides `CURRENCY_CODES` array for iteration
- Sets default from/to currencies (USD → EUR)

### `src/locales/[language]/translation.json`
Each language file contains:
- `title`: Translated application title
- `currencies`: Object containing:
  - `code`: Currency code (e.g., 'USD')
  - `name`: Translated currency name
  - `symbol`: Currency symbol
- `labels`: UI labels in the respective language
  - `fromCurrency`: "From" label
  - `toCurrency`: "To" label
  - `amount`: "Amount" label
  - `result`: "Result" label
  - `selectCurrency`: "Select Currency" label

## Supported Languages

- **en** - English
- **es** - Spanish
- **fr** - French
- **de** - German
- **ja** - Japanese

## Usage in Components

### Accessing Translations
```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  // Use translations
  const title = t('title');
  const currencyName = t(`currencies.USD.name`);
  
  // Change language
  i18n.changeLanguage('es');
}
```

### Using Currency Constants
```typescript
import { CURRENCY_CODES, TOP_5_CURRENCIES } from './constants/currencies';

// Iterate through currencies
CURRENCY_CODES.forEach(code => {
  console.log(code); // USD, EUR, GBP, JPY, CHF
});

// Type-safe currency codes
const currency: typeof TOP_5_CURRENCIES[keyof typeof TOP_5_CURRENCIES] = 'USD';
```

## Adding New Languages

1. Create a new folder in `src/locales/` with the language code (e.g., `it` for Italian)
2. Create a `translation.json` file with the same structure as existing files
3. Update `src/i18n.ts`:
   - Import the new translation
   - Add it to the `resources` object
4. Update the language selector in `App.tsx` if needed

## Adding New Currency Strings

1. Update all files in `src/locales/[language]/translation.json`
2. Update `src/constants/currencies.ts` if adding new currency codes
3. The string will be automatically available via `t('key')`

## Best Practices

- Always use the translation key structure: `t('section.subsection.key')`
- Keep currency codes consistent across all files
- Use TypeScript types for currency codes to prevent typos
- Place UI strings in translation files, not hardcoded in components
- Use the currency constants from `constants/currencies.ts` instead of hardcoding values
