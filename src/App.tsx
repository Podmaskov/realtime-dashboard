import { useRealtimeSensorData } from './hooks'
import styles from './App.module.css'

function App() {
  useRealtimeSensorData()

  return (
    <div className={styles.app}>
      <h1>Real-Time Dashboard</h1>
    </div>
  )
}

export default App
