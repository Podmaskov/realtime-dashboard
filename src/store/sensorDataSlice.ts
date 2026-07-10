import type { SensorData } from '../types'
import type { RootStore, StoreSlice } from './store'

// Keep at most the largest selectable window (10 min) of readings, so changing
// the view range never drops data we already collected.
const MAX_HISTORY_MS = 10 * 60 * 1000

export type SensorDataSlice = {
  readings: SensorData[]
  error: string | null
  addReadings: (readings: SensorData[]) => void
  setError: (error: string | null) => void
}

export const createSensorDataSlice: StoreSlice<SensorDataSlice> = (set) => ({
  readings: [],
  error: null,

  addReadings: (readings) =>
    set(
      (state) => {
        const cutoff = Date.now() - MAX_HISTORY_MS
        const next = [...state.readings, ...readings].filter(
          (reading) => new Date(reading.timestamp).getTime() >= cutoff,
        )
        return { readings: next, error: null }
      },
      false,
      'sensorData/addReadings',
    ),

  setError: (error) => set({ error }, false, 'sensorData/setError'),
})

export const selectReadings = (state: RootStore) => state.readings
export const selectError = (state: RootStore) => state.error

export const selectAddReadings = (state: RootStore) => state.addReadings
export const selectSetError = (state: RootStore) => state.setError
