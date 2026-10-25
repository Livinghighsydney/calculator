import { useState } from 'react'

import RoomForm from '../components/calculator/RoomForm'
import PriceResult from '../components/calculator/PriceResult'
import CompetitorToggle from '../components/competitor/CompetitorToggle'
import CompetitorTable from '../components/competitor/CompetitorTable'
import { usePricing } from '../hooks/usePricing'
import { useCompetitor } from '../hooks/useCompetitor'

export default function Calculator() {
  const { result, loading: priceLoading, error: priceError, calculate } = usePricing()
  const { competitors, loading: compLoading, search, reset: resetCompetitors } = useCompetitor()
  const [lastForm, setLastForm] = useState(null)
  const [pricingMonth, setPricingMonth] = useState(new Date().getMonth() + 1)

  const handleCalculate = (formData) => {
    setLastForm(formData)
    resetCompetitors()
    calculate(formData)
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <h1 className="text-base font-extrabold text-black tracking-tight">Sydney Room Pricing Calculator</h1>

        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">

          {/* Form panel */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-card p-5">
            <RoomForm
              onSubmit={handleCalculate}
              loading={priceLoading}
              pricingMonth={pricingMonth}
              onMonthChange={setPricingMonth}
            />
          </div>

          {/* Result panel */}
          <div>
            {!result && !priceLoading && (
              <div className="flex items-center justify-center border border-dashed border-zinc-300 rounded-2xl" style={{ minHeight: '300px' }}>
                <div className="text-center px-8">
                  <p className="text-sm text-zinc-500">Fill in the room details on the left</p>
                  <p className="text-xs text-zinc-400 mt-1">and press Calculate Price to get a recommendation.</p>
                </div>
              </div>
            )}
            {priceLoading && (
              <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
                <p className="text-sm text-zinc-500 animate-pulse">Calculating…</p>
              </div>
            )}
            {priceError && (
              <div className="p-4 rounded-2xl border border-red-200 bg-red-50">
                <p className="text-sm text-red-600">{priceError}</p>
              </div>
            )}
            {result && !priceLoading && (
              <div className="flex flex-col gap-4">
                <PriceResult result={result} />
                {!competitors && (
                  <CompetitorToggle onSearch={() => search(lastForm)} loading={compLoading} />
                )}
                {competitors && <CompetitorTable competitors={competitors} yourPrice={result.recommended_price} />}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
