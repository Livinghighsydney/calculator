import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
})

export const calculatePrice = (payload) => api.post('/api/pricing', payload)
export const fetchCompetitors = (payload) => api.post('/api/competitors', payload)

export default api
