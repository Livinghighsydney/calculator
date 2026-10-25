import Button from '../ui/Button'

export default function CompetitorToggle({ onSearch, loading }) {
  return (
    <div className="flex items-center justify-between py-3 border-t border-border-crisp mt-1">
      <div>
        <p className="font-inter text-body-md text-text-primary font-medium">Competitor Analysis</p>
        <p className="font-inter text-body-sm text-text-muted mt-0.5">
          Search flatmates.com.au for comparable listings
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={onSearch} disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </Button>
    </div>
  )
}
