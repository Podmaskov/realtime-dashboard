import {
  selectEnabledWidgets,
  selectRefreshIntervalMs,
  selectSetRefreshIntervalMs,
  selectSetTimeRangeMs,
  selectTimeRangeMs,
  selectToggleWidget,
  useDashboardStore,
} from '../../store'
import { REFRESH_INTERVALS_MS, TIME_RANGES_MS, WIDGETS } from '../../types'
import { Toggle } from '../Toggle/Toggle'
import styles from './ConfigPanel.module.css'

export function ConfigPanel() {
  const enabledWidgets = useDashboardStore(selectEnabledWidgets)
  const toggleWidget = useDashboardStore(selectToggleWidget)
  const refreshIntervalMs = useDashboardStore(selectRefreshIntervalMs)
  const setRefreshIntervalMs = useDashboardStore(selectSetRefreshIntervalMs)
  const timeRangeMs = useDashboardStore(selectTimeRangeMs)
  const setTimeRangeMs = useDashboardStore(selectSetTimeRangeMs)

  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>Settings</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Widgets</h3>
        <div className={styles.toggles}>
          {WIDGETS.map((widget) => (
            <Toggle
              key={widget.id}
              label={widget.label}
              checked={enabledWidgets[widget.id]}
              onChange={() => toggleWidget(widget.id)}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Refresh interval</h3>
          <span className={styles.intervalValue}>
            {refreshIntervalMs / 1000}s
          </span>
        </div>
        <input
          type="range"
          className={styles.slider}
          min={0}
          max={REFRESH_INTERVALS_MS.length - 1}
          step={1}
          value={REFRESH_INTERVALS_MS.indexOf(refreshIntervalMs)}
          onChange={(event) => {
            const next = REFRESH_INTERVALS_MS[Number(event.target.value)]
            if (next) setRefreshIntervalMs(next)
          }}
          aria-label="Refresh interval in seconds"
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Time range</h3>
        <div className={styles.segmented}>
          {TIME_RANGES_MS.map((ms) => (
            <button
              key={ms}
              type="button"
              className={styles.segment}
              aria-pressed={ms === timeRangeMs}
              onClick={() => setTimeRangeMs(ms)}
            >
              {ms / 60000} min
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}
