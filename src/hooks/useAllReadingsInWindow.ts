import { useMemo } from 'react'
import { selectReadings, selectTimeRangeMs, useDashboardStore } from '../store'
import type { SensorData } from '../types'
import { getAllReadingsInWindow } from '../utils/sensorData'

export function useAllReadingsInWindow(): SensorData[] {
  const readings = useDashboardStore(selectReadings)
  const windowMs = useDashboardStore(selectTimeRangeMs)
  return useMemo(
    () => getAllReadingsInWindow(readings, windowMs),
    [readings, windowMs],
  )
}
