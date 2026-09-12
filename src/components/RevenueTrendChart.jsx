import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard'
import { formatCurrency, formatCompactCurrency } from '../utils/format'
import './chartCommon.css'
import './RevenueTrendChart.css'

function RevenueTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{point.fullLabel}</p>
      <p className="chart-tooltip-value">{formatCurrency(point.revenue)}</p>
    </div>
  )
}

function RevenueTrendChart({ data }) {
  const chartData = data.map((point) => ({ ...point, fullLabel: point.label }))

  if (chartData.length < 2) {
    return (
      <ChartCard title="Revenue trend" subtitle="Monthly revenue" className="revenue-trend-card">
        <div className="revenue-trend-plot chart-empty">
          <p className="chart-empty-text">
            {chartData.length === 0
              ? 'No orders yet to plot a trend.'
              : 'Add a second month of orders to see a trend line here.'}
          </p>
        </div>
      </ChartCard>
    )
  }

  return (
    <ChartCard title="Revenue trend" subtitle="Monthly revenue" className="revenue-trend-card">
      <div className="revenue-trend-plot">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#E4E6EA" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E4E6EA' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCompactCurrency}
              width={56}
            />
            <Tooltip content={<RevenueTooltip />} cursor={{ stroke: '#D3D6DC', strokeWidth: 1 }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#0F7A4D"
              strokeWidth={2}
              strokeLinecap="round"
              dot={false}
              activeDot={{ r: 5, fill: '#0F7A4D', stroke: '#FFFFFF', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export default RevenueTrendChart
