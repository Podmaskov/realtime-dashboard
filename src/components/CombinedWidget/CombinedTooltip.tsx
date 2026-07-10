import { SENSOR_META } from '../../utils/sensorMeta'
import { formatTime } from '../../utils/time'
import type { SensorType } from '../../types'
import styles from './CombinedTooltip.module.css'

interface CombinedTooltipItem {
  dataKey?: SensorType
  value?: number
  color?: string
}

interface CombinedTooltipProps {
  active?: boolean
  payload?: CombinedTooltipItem[]
  label?: number | string
}

export function CombinedTooltip({
  active,
  payload,
  label,
}: CombinedTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className={styles.tooltip}>
      <span className={styles.time}>{formatTime(Number(label))}</span>
      {payload.map((item) => {
        if (item.dataKey === undefined || item.value === undefined) return null
        const meta = SENSOR_META[item.dataKey]
        return (
          <span key={item.dataKey} className={styles.row}>
            <span
              className={styles.dot}
              style={{ background: item.color }}
              aria-hidden="true"
            />
            <span className={styles.name}>{meta.label}</span>
            <span className={styles.value}>
              {item.value}
              {meta.unit}
            </span>
          </span>
        )
      })}
    </div>
  )
}
