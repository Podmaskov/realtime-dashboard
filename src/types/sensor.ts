export const SENSOR_TYPES = ['temperature', 'humidity', 'pressure'] as const

export type SensorType = (typeof SENSOR_TYPES)[number]

export interface SensorData {
  id: number
  type: SensorType
  value: number
  timestamp: string // ISO 8601
}

export interface SensorStats {
  min: number
  max: number
  avg: number
  count: number
}
