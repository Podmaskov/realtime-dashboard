import type { SensorData, SensorType } from '../types'

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
