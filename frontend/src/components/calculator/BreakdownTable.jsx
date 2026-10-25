export default function BreakdownTable({ breakdown }) {
  return (
    <div className="border border-zinc-200 rounded-2xl overflow-hidden shadow-card">
      <table className="w-full">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            {['Factor', 'Finding', 'Effect'].map((h, i) => (
              <th
                key={h}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 whitespace-nowrap
                  ${i === 2 ? 'text-right' : 'text-left'}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {breakdown.map((row, i) => (
            <tr
              key={i}
              className="h-11 border-b border-zinc-100 last:border-0 bg-white hover:bg-zinc-50 transition-colors"
            >
              <td className="px-3 text-body-md text-zinc-500 whitespace-nowrap">{row.factor}</td>
              <td className="px-3 text-body-md text-black font-medium">{row.finding}</td>
              <td className="px-3 text-body-sm text-zinc-500 text-right whitespace-nowrap">{row.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
