import type { SensorType } from './sensor'

export type WidgetId = SensorType

export const REFRESH_INTERVALS_MS = [1000, 2000, 3000, 4000, 5000] as const

export type RefreshIntervalMs = (typeof REFRESH_INTERVALS_MS)[number]

export type TimeRangeMs = 60_000 | 300_000 | 600_000

export interface DashboardSettings {
  enabledWidgets: Record<WidgetId, boolean>
  refreshIntervalMs: RefreshIntervalMs
  timeRangeMs: TimeRangeMs
}
