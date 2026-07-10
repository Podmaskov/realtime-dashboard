import { useLatestReading } from '../../hooks'
import { SENSOR_META } from '../../utils/sensorMeta'
import { Card } from '../Card/Card'
import styles from './TemperatureWidget.module.css'

const TYPE = 'temperature'

export function TemperatureWidget() {
  const latest = useLatestReading(TYPE)
  const { label, unit } = SENSOR_META[TYPE]

  return (
    <Card title={label}>
      {latest ? (
        <p className={styles.value}>
          {latest.value}
          <span className={styles.unit}>{unit}</span>
        </p>
      ) : (
        <p className={styles.placeholder}>Waiting for data…</p>
      )}
    </Card>
  )
}
