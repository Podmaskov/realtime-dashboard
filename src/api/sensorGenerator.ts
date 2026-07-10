import { SENSOR_TYPES, type SensorData, type SensorType } from '../types'
import { clamp, randomInRange, roundTo } from '../utils/number'
import { SENSOR_CONFIG } from '../utils/sensorConfig'

// Last value per sensor, so readings drift smoothly instead of
// jumping to unrelated values on every tick.
const lastValues: Record<SensorType, number> = {
  temperature: SENSOR_CONFIG.temperature.initial,
  humidity: SENSOR_CONFIG.humidity.initial,
  pressure: SENSOR_CONFIG.pressure.initial,
}

let nextId = 1

function nextValue(type: SensorType): number {
  const { min, max, maxStep } = SENSOR_CONFIG[type]
  const drifted = lastValues[type] + randomInRange(-maxStep, maxStep)
  const value = clamp(drifted, min, max)
  lastValues[type] = value
  return roundTo(value, 2)
}

export function generateReadings(): SensorData[] {
  const timestamp = new Date().toISOString()
  return SENSOR_TYPES.map((type) => ({
    id: nextId++,
    type,
    value: nextValue(type),
    timestamp,
  }))
}
