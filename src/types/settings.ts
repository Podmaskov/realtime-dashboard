export const WIDGETS = [
  { id: 'temperature', label: 'Temperature' },
  { id: 'humidity', label: 'Humidity' },
  { id: 'pressure', label: 'Pressure' },
  { id: 'combined', label: 'Combined' },
] as const

export type WidgetId = (typeof WIDGETS)[number]['id']

export const REFRESH_INTERVALS_MS = [1000, 2000, 3000, 4000, 5000] as const

export type RefreshIntervalMs = (typeof REFRESH_INTERVALS_MS)[number]

export const TIME_RANGES_MS = [60_000, 300_000, 600_000] as const

export type TimeRangeMs = (typeof TIME_RANGES_MS)[number]

export interface DashboardSettings {
  enabledWidgets: Record<WidgetId, boolean>
  refreshIntervalMs: RefreshIntervalMs
  timeRangeMs: TimeRangeMs
}
