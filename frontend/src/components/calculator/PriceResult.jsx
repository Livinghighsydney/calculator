import Card from '../ui/Card'
import BreakdownTable from './BreakdownTable'

export default function PriceResult({ result }) {
  return (
    <div className="flex flex-col gap-4">

      <Card className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Recommended Price
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-headline-xl text-black font-tnum">
            ${result.recommended_price}
          </span>
          <span className="text-body-lg text-zinc-400">/ week</span>
        </div>
        <p className="text-body-sm text-zinc-400 mt-1.5">
          Range: ${result.price_range.min}–${result.price_range.max} / week
        </p>
      </Card>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Why this price
        </p>
        <BreakdownTable breakdown={result.breakdown} />
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
          AI Summary
        </p>
        <p className="text-body-md text-black leading-relaxed">
          {result.ai_summary}
        </p>
      </div>

    </div>
  )
}
