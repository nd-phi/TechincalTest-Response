import React from 'react'
import { ConversionHistory } from '../types'

interface HistoryPanelProps {
  history: ConversionHistory[]
  onClearHistory: () => void
  onSelectHistory?: (item: ConversionHistory) => void
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onClearHistory,
  onSelectHistory,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">History</h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No conversions yet</p>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistory?.(item)}
              className="border-l-4 border-blue-500 bg-gray-50 p-3 rounded cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  {item.fromAmount.toFixed(2)} {item.fromCurrency}
                </span>
                <span className="text-gray-600">→</span>
                <span className="font-semibold text-gray-800">
                  {item.toAmount.toFixed(2)} {item.toCurrency}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Rate: {item.rate.toFixed(6)} | {item.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
