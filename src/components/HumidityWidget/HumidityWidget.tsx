import { useMemo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useReadingsInWindow } from '../../hooks'
import { toChartPoints } from '../../utils/sensorData'
import { SENSOR_META } from '../../utils/sensorMeta'
import { formatTime } from '../../utils/time'
import { Card } from '../Card/Card'
import { ChartTooltip } from '../ChartTooltip/ChartTooltip'
import styles from './HumidityWidget.module.css'

const TYPE = 'humidity'

export function HumidityWidget() {
  const readings = useReadingsInWindow(TYPE)
  const data = useMemo(() => toChartPoints(readings), [readings])
  const { label, unit, color } = SENSOR_META[TYPE]

  return (
    <Card title={label}>
      {data.length > 0 ? (
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 12, bottom: 4, left: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis
                dataKey="time"
                tickFormatter={(value) => formatTime(Number(value))}
                minTickGap={48}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                stroke="var(--color-border)"
              />
              <YAxis
                width={44}
                domain={['auto', 'auto']}
                tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                stroke="var(--color-border)"
              />
              <Tooltip content={<ChartTooltip unit={unit} />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className={styles.placeholder}>Waiting for data…</p>
      )}
    </Card>
  )
}
