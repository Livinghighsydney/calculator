export const ROOM_TYPES = [
  { value: 'standard',            label: 'Standard',            description: 'Shared kitchen and bathroom' },
  { value: 'very_small_standard', label: 'Very Small Standard', description: 'Single bed only — shared kitchen and bathroom' },
  { value: 'ensuite',             label: 'Ensuite',             description: 'Private room with own bathroom' },
  { value: 'studio',              label: 'Studio',              description: 'Own bathroom and kitchenette inside the room' },
]

export const LOCATION_DEMAND = [
  { value: 'low',     label: 'Low' },
  { value: 'average', label: 'Average' },
  { value: 'high',    label: 'High' },
]

export const SIZES = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

// Step 5: Assess Quality — features from the pricing infographic
// Staff checks these after watching the room video / 360 tour
export const QUALITY_FEATURES = [
  { key: 'timber_floors',  label: 'Timber floorboards',      older: 'Dated carpet' },
  { key: 'fresh_paint',    label: 'Freshly painted walls',   older: 'Painted brick / older finish' },
  { key: 'modern_light',   label: 'Modern / natural light',  older: 'Old-style fixtures' },
  { key: 'good_windows',   label: 'Period or modern windows', older: 'Aluminium frame' },
  { key: 'keypad_lock',    label: 'Keypad smart lock',       older: 'Standard door lock' },
]

// 3+ modern features = Modern quality tier
export function deriveQuality(features) {
  const count = QUALITY_FEATURES.filter(f => features[f.key]).length
  return count >= 3 ? 'modern' : 'older'
}

// Thresholds from the "How to Price Rooms" doc
export const LARGE_BATCH_THRESHOLDS = {
  emptyNow: 10,
  days14: 25,
  days28: 60,
}

export function isLargeBatch({ emptyNow, days14, days28 }) {
  return (
    emptyNow > LARGE_BATCH_THRESHOLDS.emptyNow ||
    days14   > LARGE_BATCH_THRESHOLDS.days14   ||
    days28   > LARGE_BATCH_THRESHOLDS.days28
  )
}
