import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import ChartCard from './ChartCard'
import { formatCurrency, formatCompactCurrency } from '../utils/format'
import './chartCommon.css'
import './TopProductsChart.css'

function ProductTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{point.product}</p>
      <p className="chart-tooltip-value">{formatCurrency(point.revenue)}</p>
    </div>
  )
}

function truncateLabel(text, max = 22) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

function ProductTick({ x, y, payload }) {
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fontSize={12.5} fill="#14161A">
      {truncateLabel(payload.value)}
    </text>
  )
}

function renderValueLabel(props) {
  const { x, y, width, height, value } = props
  return (
    <text
      x={x + width + 8}
      y={y + height / 2}
      dy={4}
      fontSize={12}
      fill="#6B7280"
    >
      {formatCompactCurrency(value)}
    </text>
  )
}

function TopProductsChart({ data }) {
  const chartHeight = Math.max(240, data.length * 34)

  return (
    <ChartCard title="Top products" subtitle="By revenue">
      <div className="top-products-plot" style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 56, bottom: 0, left: 0 }}
            barCategoryGap={10}
          >
            <CartesianGrid stroke="#E4E6EA" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="product"
              width={168}
              tick={<ProductTick />}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ProductTooltip />} cursor={{ fill: 'rgba(15, 122, 77, 0.06)' }} />
            <Bar dataKey="revenue" fill="#0F7A4D" radius={[0, 4, 4, 0]} maxBarSize={22} isAnimationActive={false}>
              <LabelList dataKey="revenue" content={renderValueLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export default TopProductsChart
