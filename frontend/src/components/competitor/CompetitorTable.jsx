import Badge from '../ui/Badge'
import Card from '../ui/Card'

function marketPosition(yourPrice, prices) {
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  if (yourPrice < min) return { variant: 'amber', label: 'Underpriced' }
  if (yourPrice > max) return { variant: 'rose', label: 'Above market' }
  return { variant: 'emerald', label: 'In range' }
}

export default function CompetitorTable({ competitors, yourPrice }) {
  const prices = competitors.filter((c) => c.price).map((c) => c.price)
  const hasPrices = prices.length > 0
  const position = hasPrices
    ? marketPosition(yourPrice, prices)
    : { variant: 'slate', label: 'No price data' }
  const min = hasPrices ? Math.min(...prices) : null
  const max = hasPrices ? Math.max(...prices) : null

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-crisp">
        <p className="font-inter text-label-md text-text-secondary uppercase tracking-wide">Competitor Listings</p>
        <Badge variant={position.variant}>{position.label}</Badge>
      </div>

      {hasPrices && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-canvas border-b border-border-crisp">
          <span className="font-inter text-body-sm text-text-secondary">Market range: ${min}–${max}/wk</span>
          <span className="font-inter text-body-sm font-medium text-text-primary">Your price: ${yourPrice}/wk</span>
        </div>
      )}

      {competitors.length === 0 ? (
        <p className="px-4 py-6 font-inter text-body-sm text-text-muted text-center">No listings found for this search.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-crisp">
              <th className="px-4 py-2 font-inter text-label-sm text-text-secondary uppercase tracking-wide text-left">Listing</th>
              <th className="px-4 py-2 font-inter text-label-sm text-text-secondary uppercase tracking-wide text-right">Price</th>
              <th className="px-4 py-2 font-inter text-label-sm text-text-secondary uppercase tracking-wide text-right">Link</th>
            </tr>
          </thead>
          <tbody>
            {competitors.reduce((rows, c, i) => {
              const prevSource = i > 0 ? competitors[i - 1].source : null
              if (c.source !== prevSource) {
                rows.push(
                  <tr key={`src-${c.source}`} className="bg-canvas border-b border-border-crisp">
                    <td colSpan={3} className="px-4 py-1.5 font-inter text-label-sm text-text-muted uppercase tracking-wide">
                      {c.source}
                    </td>
                  </tr>
                )
              }
              rows.push(
                <tr key={i} className="border-b border-border-crisp last:border-0 hover:bg-canvas transition-colors">
                  <td className="px-4 py-3 font-inter text-body-md text-text-primary">{c.description}</td>
                  <td className="px-4 py-3 font-inter text-numeric-md text-text-primary text-right tabular-nums">
                    {c.price ? `$${c.price}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href={c.url} target="_blank" rel="noreferrer"
                      className="font-inter text-body-sm text-indigo-text hover:underline">
                      View ↗
                    </a>
                  </td>
                </tr>
              )
              return rows
            }, [])}
          </tbody>
        </table>
      )}
    </Card>
  )
}
