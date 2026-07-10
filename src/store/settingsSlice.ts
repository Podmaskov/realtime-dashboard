import type {
  DashboardSettings,
  RefreshIntervalMs,
  TimeRangeMs,
  WidgetId,
} from '../types'
import type { RootStore, StoreSlice } from './store'

export type SettingsSlice = DashboardSettings & {
  toggleWidget: (id: WidgetId) => void
  setRefreshIntervalMs: (ms: RefreshIntervalMs) => void
  setTimeRangeMs: (ms: TimeRangeMs) => void
}

const initialSettings: DashboardSettings = {
  enabledWidgets: { temperature: true, humidity: true, pressure: true },
  refreshIntervalMs: 2000,
  timeRangeMs: 300_000,
}

export const createSettingsSlice: StoreSlice<SettingsSlice> = (set) => ({
  ...initialSettings,

  toggleWidget: (id) =>
    set(
      (state) => ({
        enabledWidgets: {
          ...state.enabledWidgets,
          [id]: !state.enabledWidgets[id],
        },
      }),
      false,
      'settings/toggleWidget',
    ),

  setRefreshIntervalMs: (ms) =>
    set({ refreshIntervalMs: ms }, false, 'settings/setRefreshIntervalMs'),

  setTimeRangeMs: (ms) =>
    set({ timeRangeMs: ms }, false, 'settings/setTimeRangeMs'),
})

export const selectEnabledWidgets = (state: RootStore) => state.enabledWidgets
export const selectRefreshIntervalMs = (state: RootStore) =>
  state.refreshIntervalMs
export const selectTimeRangeMs = (state: RootStore) => state.timeRangeMs

export const selectToggleWidget = (state: RootStore) => state.toggleWidget
export const selectSetRefreshIntervalMs = (state: RootStore) =>
  state.setRefreshIntervalMs
export const selectSetTimeRangeMs = (state: RootStore) => state.setTimeRangeMs
