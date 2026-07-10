import { useMemo } from 'react'
import { selectReadings, selectTimeRangeMs, useDashboardStore } from '../store'
import type { SensorData, SensorType } from '../types'
import { getReadingsInWindow } from '../utils/sensorData'

export function useReadingsInWindow(type: SensorType): SensorData[] {
  const readings = useDashboardStore(selectReadings)
  const windowMs = useDashboardStore(selectTimeRangeMs)
  return useMemo(
    () => getReadingsInWindow(readings, type, windowMs),
    [readings, type, windowMs],
  )
}
