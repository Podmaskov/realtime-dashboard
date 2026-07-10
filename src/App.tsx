import { ConfigPanel, Dashboard } from './components'
import { useRealtimeSensorData } from './hooks'
import styles from './App.module.css'

function App() {
  useRealtimeSensorData()

  return (
    <div className={styles.app}>
      <ConfigPanel />
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Real-Time Dashboard</h1>
        </header>
        <main className={styles.main}>
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App
