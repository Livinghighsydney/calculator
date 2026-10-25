import { useState } from 'react'
import { fetchCompetitors } from '../services/api'

export function useCompetitor() {
  const [competitors, setCompetitors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await fetchCompetitors({
        room_type: formData.roomType,
        suburb:    formData.suburb,
      })
      setCompetitors(data.competitors)
    } catch (err) {
      setError(err.response?.data?.detail || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setCompetitors(null); setError(null) }

  return { competitors, loading, error, search, reset }
}
