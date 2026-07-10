import { create, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createSensorDataSlice, type SensorDataSlice } from './sensorDataSlice'
import { createSettingsSlice, type SettingsSlice } from './settingsSlice'

export type RootStore = SettingsSlice & SensorDataSlice

export type StoreSlice<T> = StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  T
>

export const useDashboardStore = create<RootStore>()(
  devtools(
    (...a) => ({
      ...createSettingsSlice(...a),
      ...createSensorDataSlice(...a),
    }),
    { name: 'DashboardStore', enabled: import.meta.env.DEV },
  ),
)
