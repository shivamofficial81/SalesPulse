import './ChartCard.css'

function ChartCard({ title, subtitle, className = '', children }) {
  return (
    <div className={`chart-card ${className}`.trim()}>
      <div className="chart-card-header">
        <h3 className="chart-card-title">{title}</h3>
        {subtitle ? <p className="chart-card-subtitle">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  )
}

export default ChartCard
