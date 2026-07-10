import { selectEnabledWidgets, useDashboardStore } from '../../store'
import { CombinedWidget } from '../CombinedWidget/CombinedWidget'
import { HumidityWidget } from '../HumidityWidget/HumidityWidget'
import { PressureWidget } from '../PressureWidget/PressureWidget'
import { TemperatureWidget } from '../TemperatureWidget/TemperatureWidget'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const enabledWidgets = useDashboardStore(selectEnabledWidgets)
  const hasEnabled = Object.values(enabledWidgets).some(Boolean)

  if (!hasEnabled) {
    return <p className={styles.empty}>All widgets are disabled.</p>
  }

  return (
    <div className={styles.grid}>
      {enabledWidgets.temperature && <TemperatureWidget />}
      {enabledWidgets.humidity && <HumidityWidget />}
      {enabledWidgets.pressure && <PressureWidget />}
      {enabledWidgets.combined && <CombinedWidget />}
    </div>
  )
}
