import { useEffect } from 'react'
import { selectError, selectSetError, useDashboardStore } from '../../store'
import styles from './ErrorToast.module.css'

const AUTO_DISMISS_MS = 4000

export function ErrorToast() {
  const error = useDashboardStore(selectError)
  const setError = useDashboardStore(selectSetError)

  useEffect(() => {
    if (!error) return
    const timeoutId = setTimeout(() => setError(null), AUTO_DISMISS_MS)
    return () => clearTimeout(timeoutId)
  }, [error, setError])

  if (!error) return null

  return (
    <div className={styles.toast} role="alert">
      <span className={styles.icon} aria-hidden="true">
        ⚠
      </span>
      <span className={styles.message}>{error}</span>
      <button
        type="button"
        className={styles.close}
        onClick={() => setError(null)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
