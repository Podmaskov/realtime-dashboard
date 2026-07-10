import { formatTime } from '../../utils/time'
import styles from './ChartTooltip.module.css'

interface ChartTooltipPayloadItem {
  value?: number | string
}

interface ChartTooltipProps {
  active?: boolean
  payload?: ChartTooltipPayloadItem[]
  label?: number | string
  unit: string
}

export function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: ChartTooltipProps) {
  const point = payload?.[0]
  if (!active || !point || point.value === undefined) return null

  return (
    <div className={styles.tooltip}>
      <span className={styles.time}>{formatTime(Number(label))}</span>
      <span className={styles.value}>
        {point.value}
        {unit}
      </span>
    </div>
  )
}
