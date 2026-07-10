import { HumidityWidget } from '../HumidityWidget/HumidityWidget'
import { PressureWidget } from '../PressureWidget/PressureWidget'
import { TemperatureWidget } from '../TemperatureWidget/TemperatureWidget'
import styles from './Dashboard.module.css'

export function Dashboard() {
  return (
    <div className={styles.grid}>
      <TemperatureWidget />
      <HumidityWidget />
      <PressureWidget />
    </div>
  )
}
