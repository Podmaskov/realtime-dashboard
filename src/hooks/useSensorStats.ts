import { useMemo } from 'react'
import type { SensorStats, SensorType } from '../types'
import { computeStats } from '../utils/sensorData'
import { useReadingsInWindow } from './useReadingsInWindow'

export function useSensorStats(type: SensorType): SensorStats | null {
  const readings = useReadingsInWindow(type)
  return useMemo(() => computeStats(readings), [readings])
}
