import Badge from '../ui/Badge'

function getSeasonFromMonth(month) {
  return month >= 4 && month <= 8 ? 'winter' : 'summer'
}

export default function SeasonBadge({ month }) {
  const m = month || (new Date().getMonth() + 1)
  const season = getSeasonFromMonth(m)
  return (
    <Badge variant={season === 'winter' ? 'indigo' : 'slate'}>
      {season === 'summer' ? '☀' : '❄'} {season === 'summer' ? 'Summer' : 'Winter'} pricing
    </Badge>
  )
}
