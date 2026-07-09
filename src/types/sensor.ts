export type SensorType = 'temperature' | 'humidity' | 'pressure'

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
