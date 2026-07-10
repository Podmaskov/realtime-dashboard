import type { SensorData, SensorType } from '../types'

export function getLatestReading(
  readings: SensorData[],
  type: SensorType,
): SensorData | undefined {
  return readings.findLast((reading) => reading.type === type)
}
