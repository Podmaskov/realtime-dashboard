import { useMemo } from 'react'
import { selectReadings, useDashboardStore } from '../store'
import type { SensorData, SensorType } from '../types'
import { getLatestReading } from '../utils/sensorData'

export function useLatestReading(type: SensorType): SensorData | undefined {
  const readings = useDashboardStore(selectReadings)
  return useMemo(() => getLatestReading(readings, type), [readings, type])
}
