import { useState, useRef, useEffect } from 'react'

const Chevron = () => (
  <svg className="shrink-0 text-zinc-400" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function NativeSelect({ options, value, onChange, placeholder }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full h-9 pl-3 pr-8 bg-white text-sm text-black font-medium
          border border-zinc-200 rounded-xl appearance-none cursor-pointer
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all">
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><Chevron /></span>
    </div>
  )
}

function RichSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`w-full h-9 pl-3 pr-3 flex items-center justify-between gap-2 bg-white rounded-xl border transition-all
          ${open ? 'border-black ring-1 ring-black' : 'border-zinc-200 hover:border-zinc-300'}
          focus:outline-none`}>
        <span className="text-sm truncate">
          {selected
            ? <><span className="text-black font-medium">{selected.label}</span><span className="text-zinc-400"> — {selected.description}</span></>
            : <span className="text-zinc-400">{placeholder}</span>}
        </span>
        <Chevron />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-zinc-200 rounded-xl shadow-elevated overflow-hidden">
          {options.map(o => (
            <button key={o.value} type="button"
              onClick={() => { onChange(o.value); setOpen(false) }}
              className={`w-full text-left px-3 py-2.5 transition-colors
                ${o.value === value ? 'bg-zinc-100' : 'hover:bg-zinc-50'}`}>
              <p className={`text-sm font-semibold ${o.value === value ? 'text-black' : 'text-black'}`}>
                {o.label}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{o.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Select({ label, options, value, onChange, placeholder = 'Select...' }) {
  const hasDescriptions = options.some(o => o.description)
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{label}</label>
      )}
      {hasDescriptions
        ? <RichSelect options={options} value={value} onChange={onChange} placeholder={placeholder} />
        : <NativeSelect options={options} value={value} onChange={onChange} placeholder={placeholder} />}
    </div>
  )
}
