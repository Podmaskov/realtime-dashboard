import { Card } from '../Card/Card'
import { TemperatureWidget } from '../TemperatureWidget/TemperatureWidget'
import styles from './Dashboard.module.css'

export function Dashboard() {
  return (
    <div className={styles.grid}>
      <TemperatureWidget />
      <Card title="Humidity">
        <p className={styles.placeholder}>—</p>
      </Card>
      <Card title="Pressure">
        <p className={styles.placeholder}>—</p>
      </Card>
    </div>
  )
}
