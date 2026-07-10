import { useSensorStats } from '../../hooks'
import { SENSOR_META } from '../../utils/sensorMeta'
import { Card } from '../Card/Card'
import styles from './PressureWidget.module.css'

const TYPE = 'pressure'

export function PressureWidget() {
  const stats = useSensorStats(TYPE)
  const { label, unit } = SENSOR_META[TYPE]

  const items = stats
    ? [
        { key: 'Min', value: stats.min },
        { key: 'Avg', value: stats.avg },
        { key: 'Max', value: stats.max },
      ]
    : null

  return (
    <Card title={label}>
      {items ? (
        <dl className={styles.stats}>
          {items.map(({ key, value }) => (
            <div key={key} className={styles.stat}>
              <dt className={styles.label}>{key}</dt>
              <dd className={styles.value}>
                {value}
                <span className={styles.unit}>{unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className={styles.placeholder}>Waiting for data…</p>
      )}
    </Card>
  )
}
