import { useState, useRef, useEffect } from 'react'

function SearchableSelect({ options, value, onChange, placeholder, disabled }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find(o => o.id === value)

  const filtered = query.trim()
    ? options.filter(o => o.title.toLowerCase().includes(query.toLowerCase()))
    : options

  // Close on outside click
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (option) => {
    onChange(option)
    setQuery('')
    setOpen(false)
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setOpen(true)
    if (!e.target.value) onChange(null)
  }

  const handleFocus = () => { if (!disabled) setOpen(true) }

  return (
    <div ref={ref} className="relative">
      <div className={`flex items-center h-9 px-3 rounded border bg-white transition-all
        ${open ? 'border-indigo-accent shadow-[0_0_0_2px_rgba(79,70,229,0.15)]' : 'border-border-crisp'}
        ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="text"
          value={open ? query : (selected?.title ?? '')}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-inter text-body-md text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        {/* Chevron */}
        <svg className={`w-4 h-4 text-text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border-crisp rounded-lg shadow-elevated max-h-56 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-3 py-2 font-inter text-body-sm text-text-muted">No properties found</p>
          ) : (
            filtered.map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => handleSelect(o)}
                className={`w-full text-left px-3 py-2 font-inter text-body-md hover:bg-canvas transition-colors
                  ${o.id === value ? 'text-indigo-text font-medium bg-indigo-subtle' : 'text-text-primary'}`}
              >
                {o.title}
                {o.suburb && <span className="ml-1.5 text-text-muted text-body-sm">· {o.suburb}</span>}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default function PropertyRoomSelector({
  properties, rooms, selectedProperty, selectedRoom,
  loadingProps, loadingRooms, onSelectProperty, onSelectRoom,
}) {
  return (
    <div className="flex flex-col gap-3">

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="font-inter text-label-sm text-on-surface-variant uppercase tracking-wide">Property</label>
          {!loadingProps && properties.length > 0 && (
            <span className="font-inter text-body-sm text-text-muted">{properties.length} properties</span>
          )}
        </div>
        <SearchableSelect
          options={properties}
          value={selectedProperty?.id ?? null}
          onChange={onSelectProperty}
          placeholder={loadingProps ? 'Loading properties…' : 'Search or select a property'}
          disabled={loadingProps}
        />
      </div>

      {selectedProperty && (
        <div className="flex flex-col gap-1.5">
          <label className="font-inter text-label-sm text-on-surface-variant uppercase tracking-wide">Room</label>
          {loadingRooms ? (
            <p className="font-inter text-body-sm text-text-muted animate-pulse">Loading rooms…</p>
          ) : rooms.length === 0 ? (
            <p className="font-inter text-body-sm text-text-muted">No room tours found — fill quality manually below.</p>
          ) : (
            <select
              value={selectedRoom?.uuid ?? ''}
              onChange={e => onSelectRoom(rooms.find(r => r.uuid === e.target.value) || null)}
              className="h-9 px-3 rounded border border-border-crisp bg-white font-inter text-body-md text-text-primary
                focus:outline-none focus:border-indigo-accent focus:shadow-[0_0_0_2px_rgba(79,70,229,0.15)]"
            >
              <option value="">Select room</option>
              {rooms.map(r => <option key={r.uuid} value={r.uuid}>{r.label}</option>)}
            </select>
          )}
        </div>
      )}

      {selectedRoom?.image_url && (
        <div className="rounded-lg overflow-hidden border border-border-crisp">
          <img src={selectedRoom.image_url} alt={selectedRoom.label} className="w-full h-40 object-cover" />
          <p className="px-3 py-1.5 font-inter text-body-sm text-text-muted bg-canvas">
            {selectedRoom.label} · 360° tour preview · Claude will assess quality from this image
          </p>
        </div>
      )}
    </div>
  )
}
