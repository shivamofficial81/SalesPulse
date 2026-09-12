import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [orders, setOrders] = useState(null)
  const [sourceLabel, setSourceLabel] = useState('')

  function handleDataReady(data, label) {
    setOrders(data)
    setSourceLabel(label)
  }

  function handleReset() {
    setOrders(null)
    setSourceLabel('')
  }

  return (
    <div className="app">
      {orders ? (
        <Dashboard orders={orders} sourceLabel={sourceLabel} onReset={handleReset} />
      ) : (
        <LandingPage onDataReady={handleDataReady} />
      )}
    </div>
  )
}

export default App
