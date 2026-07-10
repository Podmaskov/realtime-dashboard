import type { SensorType } from '../types'

export interface SensorGenerationConfig {
  min: number
  max: number
  maxStep: number
  initial: number
}

export const SENSOR_CONFIG: Record<SensorType, SensorGenerationConfig> = {
  temperature: { min: -10, max: 40, maxStep: 0.5, initial: 21 },
  humidity: { min: 0, max: 100, maxStep: 1.5, initial: 45 },
  pressure: { min: 950, max: 1050, maxStep: 1, initial: 1013 },
}
