export default function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
          {label}
        </label>
      )}
      <div className="flex p-0.5 bg-zinc-100 border border-zinc-200 rounded-xl gap-0.5">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 h-7 px-3 rounded-lg text-xs font-semibold tracking-tight transition-all ${
              value === opt.value
                ? 'bg-white border border-zinc-200 text-black shadow-sm'
                : 'text-zinc-500 hover:text-black'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
