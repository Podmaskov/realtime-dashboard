import { Card } from '../Card/Card'
import { HumidityWidget } from '../HumidityWidget/HumidityWidget'
import { TemperatureWidget } from '../TemperatureWidget/TemperatureWidget'
import styles from './Dashboard.module.css'

export function Dashboard() {
  return (
    <div className={styles.grid}>
      <TemperatureWidget />
      <HumidityWidget />
      <Card title="Pressure">
        <p className={styles.placeholder}>—</p>
      </Card>
    </div>
  )
}
