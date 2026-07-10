import { useEffect } from 'react'
import { fetchSensorData } from '../api'
import {
  selectAddReadings,
  selectRefreshIntervalMs,
  selectSetError,
  useDashboardStore,
} from '../store'

// Drives the real-time updates: on the configured interval it fetches the
// latest readings and pushes them (or the error) into the store.
export function useRealtimeSensorData(): void {
  const intervalMs = useDashboardStore(selectRefreshIntervalMs)
  const addReadings = useDashboardStore(selectAddReadings)
  const setError = useDashboardStore(selectSetError)

  useEffect(() => {
    let cancelled = false

    const poll = async () => {
      const result = await fetchSensorData()
      if (cancelled) return

      if (result.status === 'success') {
        addReadings(result.data)
      } else {
        setError(result.error)
      }
    }

    poll()
    const intervalId = setInterval(poll, intervalMs)

    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [intervalMs, addReadings, setError])
}
