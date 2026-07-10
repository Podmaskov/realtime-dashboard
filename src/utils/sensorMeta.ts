import type { SensorType } from '../types'

export interface SensorMeta {
  label: string
  unit: string
  color: string
}

export const SENSOR_META: Record<SensorType, SensorMeta> = {
  temperature: { label: 'Temperature', unit: '°C', color: '#ef4444' },
  humidity: { label: 'Humidity', unit: '%', color: '#3b82f6' },
  pressure: { label: 'Pressure', unit: 'hPa', color: '#8b5cf6' },
}
