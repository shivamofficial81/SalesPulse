import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard'
import { formatCurrency, formatPercent } from '../utils/format'
import './chartCommon.css'
import './RegionBreakdownChart.css'

// Fixed-order categorical palette (blue, orange, aqua, yellow), validated for
// CVD-safe adjacency via the dataviz skill's validator. "Other" folds any
// regions past the 4th into a neutral gray rather than adding a 5th hue.
const CATEGORICAL_COLORS = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100']
const OTHER_COLOR = '#6B7280'

function buildSegments(regionBreakdown) {
  const top = regionBreakdown.slice(0, 4)
  const rest = regionBreakdown.slice(4)

  const segments = top.map((entry, index) => ({
    key: entry.region,
    label: entry.region,
    revenue: entry.revenue,
    share: entry.share,
    color: CATEGORICAL_COLORS[index],
  }))

  if (rest.length > 0) {
    segments.push({
      key: 'Other',
      label: 'Other',
      revenue: rest.reduce((sum, entry) => sum + entry.revenue, 0),
      share: rest.reduce((sum, entry) => sum + entry.share, 0),
      color: OTHER_COLOR,
    })
  }

  return segments
}

function RegionTooltip({ active, segments }) {
  if (!active) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">Revenue by region</p>
      {segments.map((segment) => (
        <p className="chart-tooltip-row" key={segment.key}>
          <span className="chart-swatch" style={{ background: segment.color }} />
          {segment.label}
          <strong style={{ marginLeft: 'auto' }}>{formatCurrency(segment.revenue)}</strong>
        </p>
      ))}
    </div>
  )
}

function RegionBreakdownChart({ data }) {
  const segments = buildSegments(data)
  const row = segments.reduce((acc, segment) => {
    acc[segment.key] = segment.revenue
    return acc
  }, { name: 'Revenue' })

  return (
    <ChartCard title="Revenue by region" subtitle="Share of total revenue">
      <div className="region-plot">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[row]} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip content={<RegionTooltip segments={segments} />} cursor={{ fill: 'rgba(20, 22, 26, 0.03)' }} />
            {segments.map((segment, index) => {
              const isFirst = index === 0
              const isLast = index === segments.length - 1
              const radius = isFirst ? [4, 0, 0, 4] : isLast ? [0, 4, 4, 0] : 0
              return (
                <Bar
                  key={segment.key}
                  dataKey={segment.key}
                  stackId="region"
                  fill={segment.color}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  radius={radius}
                  maxBarSize={40}
                  isAnimationActive={false}
                />
              )
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="region-list">
        {segments.map((segment) => (
          <li className="region-list-item" key={segment.key}>
            <span className="chart-swatch" style={{ background: segment.color }} />
            <span className="region-list-name">{segment.label}</span>
            <span className="region-list-value">{formatCurrency(segment.revenue)}</span>
            <span className="region-list-share">{formatPercent(segment.share * 100, { decimals: 0 })}</span>
          </li>
        ))}
      </ul>
    </ChartCard>
  )
}

export default RegionBreakdownChart
