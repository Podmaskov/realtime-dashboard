import type { SensorData, SensorStats, SensorType } from '../types'
import { roundTo } from './number'

export function getLatestReading(
  readings: SensorData[],
  type: SensorType,
): SensorData | undefined {
  return readings.findLast((reading) => reading.type === type)
}

export function getReadingsInWindow(
  readings: SensorData[],
  type: SensorType,
  windowMs: number,
): SensorData[] {
  const cutoff = Date.now() - windowMs
  return readings.filter(
    (reading) =>
      reading.type === type && new Date(reading.timestamp).getTime() >= cutoff,
  )
}

export interface ChartPoint {
  time: number
  value: number
}

export function toChartPoints(readings: SensorData[]): ChartPoint[] {
  return readings.map((reading) => ({
    time: new Date(reading.timestamp).getTime(),
    value: reading.value,
  }))
}

export function computeStats(readings: SensorData[]): SensorStats | null {
  if (readings.length === 0) return null

  const values = readings.map((reading) => reading.value)
  const sum = values.reduce((acc, value) => acc + value, 0)

  return {
    min: roundTo(Math.min(...values), 2),
    max: roundTo(Math.max(...values), 2),
    avg: roundTo(sum / values.length, 2),
    count: values.length,
  }
}
