import type { SensorData, SensorStats, SensorType } from '../types'
import { roundTo } from './number'

export function getLatestReading(
  readings: SensorData[],
  type: SensorType,
): SensorData | undefined {
  return readings.findLast((reading) => reading.type === type)
}

export function getAllReadingsInWindow(
  readings: SensorData[],
  windowMs: number,
): SensorData[] {
  const cutoff = Date.now() - windowMs
  return readings.filter(
    (reading) => new Date(reading.timestamp).getTime() >= cutoff,
  )
}

export function getReadingsInWindow(
  readings: SensorData[],
  type: SensorType,
  windowMs: number,
): SensorData[] {
  return getAllReadingsInWindow(readings, windowMs).filter(
    (reading) => reading.type === type,
  )
}

interface ChartPoint {
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
  }
}

type CombinedPoint = { time: number } & Partial<Record<SensorType, number>>

export function toCombinedChartPoints(readings: SensorData[]): CombinedPoint[] {
  const byTime = new Map<number, CombinedPoint>()
  for (const reading of readings) {
    const time = new Date(reading.timestamp).getTime()
    let point = byTime.get(time)
    if (!point) {
      point = { time }
      byTime.set(time, point)
    }
    point[reading.type] = reading.value
  }
  return [...byTime.values()]
}
