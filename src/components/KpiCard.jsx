import './KpiCard.css'

function TrendArrow({ direction }) {
  const path = direction === 'up' ? 'M6 3l4 6H2z' : 'M6 9L2 3h8z'
  return (
    <svg viewBox="0 0 12 12" className="kpi-arrow" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  )
}

function KpiCard({ label, value, trend }) {
  return (
    <div className="kpi-card">
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">{value}</p>
      {trend ? (
        <p className={`kpi-trend kpi-trend-${trend.direction}`}>
          <TrendArrow direction={trend.direction} />
          {trend.text}
        </p>
      ) : null}
    </div>
  )
}

export default KpiCard
