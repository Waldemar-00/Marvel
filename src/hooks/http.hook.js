import { useState, useCallback } from 'react'
export const useHttp = () => {
  const [loading, setloading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    setloading(true)
    try {
      const response = fetch(url, { method, body, headers })
      if (!response.ok) {
        throw new Error(`Could not fetch data on URL: ${url}, status: ${response.status}`)
      }
      const data = await response.json()
      setloading(false)
      return data
    } catch (e) {
      setloading(false)
      setError(e.message)
      throw e
    }
  }, [])
  const clearError = useCallback(() => setError(null), [])
  return {request, clearError, loading, error}
}