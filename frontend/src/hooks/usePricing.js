import { useState } from 'react'
import { calculatePrice } from '../services/api'

export function usePricing() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const calculate = async (formData) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const payload = {
        room_type:    formData.roomType,
        suburb:       formData.suburb,
        size:         formData.size,
        quality:      formData.quality,
        cleveland_st: formData.clevelandSt,
        large_house:  formData.largeHouse,
        large_batch:  formData.largeBatch,
        empty_now: formData.emptyNow !== '' ? +formData.emptyNow : null,
        days_14:   formData.days14   !== '' ? +formData.days14   : null,
        days_28:   formData.days28   !== '' ? +formData.days28   : null,
      }
      const { data } = await calculatePrice(payload)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { result, loading, error, calculate }
}
