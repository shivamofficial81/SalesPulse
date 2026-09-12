import { generateInsights } from '../utils/insights'
import './InsightsPanel.css'

function InsightsPanel({ orders }) {
  const insights = generateInsights(orders)
  if (!insights.length) return null

  return (
    <div className="insights-panel">
      <h3 className="insights-title">What this means for your business</h3>
      <ul className="insights-list">
        {insights.map((insight) => (
          <li className="insights-item" key={insight.id}>
            {insight.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InsightsPanel
