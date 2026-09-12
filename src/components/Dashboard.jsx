import { useMemo } from 'react'
import Header from './Header'
import KpiCard from './KpiCard'
import RevenueTrendChart from './RevenueTrendChart'
import TopProductsChart from './TopProductsChart'
import RegionBreakdownChart from './RegionBreakdownChart'
import InsightsPanel from './InsightsPanel'
import { computeKpiSummary, computeMonthlyRevenue, computeTopProducts, computeRegionBreakdown } from '../utils/analytics'
import { formatCompactCurrency, formatNumber, formatCurrency, formatPercent } from '../utils/format'
import './Dashboard.css'

function Dashboard({ orders, sourceLabel, onReset }) {
  const kpis = useMemo(() => computeKpiSummary(orders), [orders])
  const monthlyRevenue = useMemo(() => computeMonthlyRevenue(orders), [orders])
  const topProducts = useMemo(() => computeTopProducts(orders, 8), [orders])
  const regionBreakdown = useMemo(() => computeRegionBreakdown(orders), [orders])

  const momTrend = kpis.momGrowth === null
    ? null
    : { direction: kpis.momGrowth >= 0 ? 'up' : 'down', text: 'vs last month' }

  return (
    <>
      <Header />
      <main className="dashboard">
        <div className="dashboard-toolbar">
          <p className="dashboard-source">
            Showing {formatNumber(orders.length)} orders from {sourceLabel}
          </p>
          <button type="button" className="dashboard-reset" onClick={onReset}>
            Back to upload
          </button>
        </div>

        <div className="kpi-row">
          <KpiCard label="Total revenue" value={formatCompactCurrency(kpis.totalRevenue)} />
          <KpiCard label="Orders" value={formatNumber(kpis.totalOrders)} />
          <KpiCard label="Average order value" value={formatCurrency(kpis.aov, { decimals: 2 })} />
          <KpiCard
            label="Growth"
            value={kpis.momGrowth === null ? '—' : formatPercent(kpis.momGrowth, { signed: true })}
            trend={momTrend}
          />
        </div>

        <div className="insights-row">
          <InsightsPanel orders={orders} />
        </div>

        <div className="charts-grid">
          <RevenueTrendChart data={monthlyRevenue} />
          <TopProductsChart data={topProducts} />
          <RegionBreakdownChart data={regionBreakdown} />
        </div>
      </main>
    </>
  )
}

export default Dashboard
