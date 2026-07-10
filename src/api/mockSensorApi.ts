import type { ApiResult, SensorData } from '../types'
import { randomInRange } from '../utils/number'
import { generateReadings } from './sensorGenerator'

const ERROR_RATE = 0.1
const MIN_LATENCY_MS = 100
const MAX_LATENCY_MS = 400

const ERROR_MESSAGES = [
  'Failed to reach sensor gateway',
  'Sensor request timed out',
  'Unexpected sensor service error',
]

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const randomErrorMessage = (): string => {
  const index = Math.floor(Math.random() * ERROR_MESSAGES.length)
  return ERROR_MESSAGES[index] ?? 'Unknown error'
}

export async function fetchSensorData(): Promise<ApiResult<SensorData[]>> {
  await delay(randomInRange(MIN_LATENCY_MS, MAX_LATENCY_MS))

  if (Math.random() < ERROR_RATE) {
    return { status: 'error', error: randomErrorMessage() }
  }

  return { status: 'success', data: generateReadings() }
}
