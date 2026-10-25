import { useState, useEffect } from 'react'
import api from '../services/api'

export function useKB() {
  const [properties, setProperties] = useState([])
  const [rooms, setRooms] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [loadingProps, setLoadingProps] = useState(true)
  const [loadingRooms, setLoadingRooms] = useState(false)

  useEffect(() => {
    api.get('/api/kb/properties')
      .then(r => setProperties(r.data))
      .catch(() => setProperties([]))
      .finally(() => setLoadingProps(false))
  }, [])

  const selectProperty = async (property) => {
    setSelectedProperty(property)
    setSelectedRoom(null)
    setRooms([])
    if (!property) return
    setLoadingRooms(true)
    try {
      const { data } = await api.get(`/api/kb/properties/${property.id}/rooms`)
      setRooms(data)
    } catch {
      setRooms([])
    } finally {
      setLoadingRooms(false)
    }
  }

  const selectRoom = (room) => setSelectedRoom(room)

  return {
    properties, rooms,
    selectedProperty, selectedRoom,
    loadingProps, loadingRooms,
    selectProperty, selectRoom,
  }
}
