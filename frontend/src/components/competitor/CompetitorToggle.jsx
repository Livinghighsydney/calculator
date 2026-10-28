import { useState } from 'react'
import Button from '../ui/Button'

export default function CompetitorToggle({ onSearch, loading }) {
  const [suburb, setSuburb] = useState('')

  return (
    <div className="flex flex-col gap-2.5 py-3 border-t border-border-crisp mt-1">
      <div>
        <p className="font-inter text-body-md text-text-primary font-medium">Competitor Analysis</p>
        <p className="font-inter text-body-sm text-text-muted mt-0.5">
          Search Flatmates, FlatmatesFinder and realestate.com.au for comparable listings.
        </p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={suburb}
          onChange={e => setSuburb(e.target.value)}
          placeholder="Suburb (e.g. Redfern)"
          className="flex-1 h-9 px-3 rounded-xl border border-zinc-200 bg-white text-sm text-black
            focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
        />
        <Button variant="secondary" size="sm" onClick={() => onSearch(suburb)} disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </Button>
      </div>
    </div>
  )
}
