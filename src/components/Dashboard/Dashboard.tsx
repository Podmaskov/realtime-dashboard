import { Card } from '../Card/Card'
import styles from './Dashboard.module.css'

export function Dashboard() {
  return (
    <div className={styles.grid}>
      <Card title="Temperature">
        <p className={styles.placeholder}>—</p>
      </Card>
      <Card title="Humidity">
        <p className={styles.placeholder}>—</p>
      </Card>
      <Card title="Pressure">
        <p className={styles.placeholder}>—</p>
      </Card>
    </div>
  )
}
