import { useState } from 'react'
import Select from '../ui/Select'
import SegmentedControl from '../ui/SegmentedControl'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { ROOM_TYPES, LOCATION_DEMAND, SIZES, QUALITY_FEATURES, deriveQuality, isLargeBatch } from '../../constants/options'

const MONTHS = [
  { value: 1,  label: 'January' },  { value: 2,  label: 'February' },
  { value: 3,  label: 'March' },    { value: 4,  label: 'April' },
  { value: 5,  label: 'May' },      { value: 6,  label: 'June' },
  { value: 7,  label: 'July' },     { value: 8,  label: 'August' },
  { value: 9,  label: 'September' },{ value: 10, label: 'October' },
  { value: 11, label: 'November' }, { value: 12, label: 'December' },
]

const INITIAL_QUALITY = Object.fromEntries(QUALITY_FEATURES.map(f => [f.key, false]))
const INITIAL = {
  roomType: '', locationDemand: 'average', size: 'medium',
  clevelandSt: false, largeHouse: false,
  balcony: false, veryOld: false, poorBathroomRatio: false,
  emptyNow: '', days14: '', days28: '',
  ...INITIAL_QUALITY,
}

const FLAGS = [
  { key: 'balcony',           label: 'Has balcony / outdoor space',      hint: '+$20/wk' },
  { key: 'veryOld',           label: 'Very old / deteriorating building', hint: 'Large penalty ↓' },
  { key: 'poorBathroomRatio', label: '5+ rooms per bathroom',             hint: 'Penalty ↓' },
  { key: 'clevelandSt',       label: 'Cleveland Street property',         hint: 'Penalty ↓' },
  { key: 'largeHouse',        label: '20+ room house',                    hint: 'Penalty ↓' },
]

const VACANCY_FIELDS = [
  { key: 'emptyNow', label: 'Empty now',          hint: '>10 = large' },
  { key: 'days14',   label: 'Filling in 14 days', hint: '>25 = large' },
  { key: 'days28',   label: 'Filling in 28 days', hint: '>60 = large' },
]

export default function RoomForm({ onSubmit, loading, pricingMonth, onMonthChange }) {
  const [form, setForm] = useState(INITIAL)
  const set = key => val => setForm(f => ({ ...f, [key]: val }))

  const qualityFeatures = Object.fromEntries(QUALITY_FEATURES.map(f => [f.key, form[f.key]]))
  const qualityScore = QUALITY_FEATURES.filter(f => form[f.key]).length
  const quality = deriveQuality(qualityFeatures)
  const vacancyFilled = form.emptyNow !== '' && form.days14 !== '' && form.days28 !== ''
  const largeBatch = vacancyFilled && isLargeBatch({ emptyNow: +form.emptyNow, days14: +form.days14, days28: +form.days28 })
  const valid = form.roomType && vacancyFilled

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ ...form, quality, largeBatch, month: pricingMonth })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* 1 · Vacancy Load */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">1 · Vacancy Load</label>
          {vacancyFilled && <Badge variant={largeBatch ? 'amber' : 'emerald'}>{largeBatch ? 'Large batch' : 'Normal batch'}</Badge>}
        </div>
        {VACANCY_FIELDS.map(({ key, label, hint }) => (
          <div key={key} className="flex items-center gap-3">
            <label className="text-sm text-zinc-500 w-36 shrink-0">{label}</label>
            <input type="number" min="0" value={form[key]} onChange={e => set(key)(e.target.value)} placeholder="0"
              className="w-20 h-9 px-3 rounded-xl border border-zinc-200 bg-white text-sm text-black
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
            <span className="text-xs text-zinc-400">{hint}</span>
          </div>
        ))}
      </div>

      {/* 2 · Pricing Month */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">2 · Pricing Month</label>
        <div className="relative">
          <select
            value={pricingMonth}
            onChange={e => onMonthChange(Number(e.target.value))}
            className="w-full h-9 pl-3 pr-8 bg-white text-sm text-black font-medium
              border border-zinc-200 rounded-xl appearance-none cursor-pointer
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
          >
            {MONTHS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="text-zinc-400" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* 3 · Room Type & Size */}
      <Select label="3 · Room Type" options={ROOM_TYPES} value={form.roomType} onChange={set('roomType')} placeholder="Select room type" />
      <SegmentedControl label="Room Size" options={SIZES} value={form.size} onChange={set('size')} />

      {/* 4 · Location Demand */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">4 · Location Demand</label>
        <p className="text-xs text-zinc-400 -mt-0.5">How sought-after is this location based on your knowledge?</p>
        <SegmentedControl options={LOCATION_DEMAND} value={form.locationDemand} onChange={set('locationDemand')} />
      </div>

      {/* 5 · Quality Assessment */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">5 · Quality Assessment</label>
          {qualityScore > 0 && (
            <Badge variant={quality === 'modern' ? 'emerald' : 'amber'}>
              {qualityScore}/5 · {quality === 'modern' ? 'Modern' : 'Older style'}
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {QUALITY_FEATURES.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={form[key]} onChange={e => set(key)(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 accent-black cursor-pointer shrink-0" />
              <span className="text-sm text-black group-hover:text-zinc-600 transition-colors leading-snug">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6 · House Flags */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">6 · House Flags</label>
        {FLAGS.map(({ key, label, hint }) => (
          <label key={key} className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form[key]} onChange={e => set(key)(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 accent-black cursor-pointer shrink-0" />
              <span className="text-sm text-black group-hover:text-zinc-600 transition-colors">{label}</span>
            </div>
            <span className="text-xs text-zinc-400 shrink-0 ml-2">{hint}</span>
          </label>
        ))}
      </div>

      <div className="pt-1 border-t border-zinc-100">
        <Button type="submit" size="lg" disabled={!valid || loading} className="w-full">
          {loading ? 'Calculating…' : 'Calculate Price'}
        </Button>
      </div>
    </form>
  )
}
