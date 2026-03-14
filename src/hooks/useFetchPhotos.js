import { useState, useEffect } from 'react'

function useFetchPhotos(limit = 30) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchPhotos = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?limit=${limit}`
        )

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (!cancelled) {
          setPhotos(data)
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof TypeError) {
            setError('Network error — please check your connection.')
          } else {
            setError(err.message || 'Something went wrong.')
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    return () => {
      cancelled = true
    }
  }, [limit])

  return { photos, loading, error }
}

export default useFetchPhotos