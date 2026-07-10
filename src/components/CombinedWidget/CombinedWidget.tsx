import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAllReadingsInWindow } from '../../hooks'
import type { SensorType } from '../../types'
import { toCombinedChartPoints } from '../../utils/sensorData'
import { SENSOR_META } from '../../utils/sensorMeta'
import { formatTime } from '../../utils/time'
import { Card } from '../Card/Card'
import { CombinedTooltip } from './CombinedTooltip'
import styles from './CombinedWidget.module.css'

const COMBINED_TYPES: SensorType[] = ['temperature', 'humidity']

export function CombinedWidget() {
  const readings = useAllReadingsInWindow()
  const points = useMemo(() => toCombinedChartPoints(readings), [readings])
  const [visibleTypes, setVisibleTypes] = useState<SensorType[]>(COMBINED_TYPES)

  const toggleType = (type: SensorType) => {
    setVisibleTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    )
  }

  const hasChart = points.length > 0 && visibleTypes.length > 0

  return (
    <Card title="Combined">
      <div className={styles.toggles}>
        {COMBINED_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={styles.toggle}
            aria-pressed={visibleTypes.includes(type)}
            onClick={() => toggleType(type)}
          >
            <span
              className={styles.dot}
              style={{ background: SENSOR_META[type].color }}
              aria-hidden="true"
            />
            {SENSOR_META[type].label}
          </button>
        ))}
      </div>

      {hasChart ? (
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={points}
              margin={{ top: 8, right: 8, bottom: 4, left: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                horizontal={false}
              />
              <XAxis
                dataKey="time"
                tickFormatter={(value) => formatTime(Number(value))}
                minTickGap={48}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                stroke="var(--color-border)"
              />
              {visibleTypes.map((type, index) => (
                <YAxis
                  key={type}
                  yAxisId={type}
                  orientation={index % 2 === 0 ? 'left' : 'right'}
                  domain={['auto', 'auto']}
                  width={44}
                  tickFormatter={(value) => `${value}${SENSOR_META[type].unit}`}
                  tick={{ fontSize: 12, fill: SENSOR_META[type].color }}
                  stroke="var(--color-border)"
                />
              ))}
              <Tooltip content={<CombinedTooltip />} />
              {visibleTypes.map((type) => (
                <Line
                  key={type}
                  yAxisId={type}
                  type="monotone"
                  dataKey={type}
                  name={SENSOR_META[type].label}
                  stroke={SENSOR_META[type].color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className={styles.placeholder}>
          {visibleTypes.length === 0
            ? 'Select at least one type.'
            : 'Waiting for data…'}
        </p>
      )}
    </Card>
  )
}
