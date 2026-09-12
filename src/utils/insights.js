import { computeMonthlyRevenue, computeTopProducts, computeRegionBreakdown } from './analytics'
import { formatCurrency, formatPercent } from './format'

const MIN_NOTABLE_DIP_PERCENT = 5
const HEAVY_CONCENTRATION_PERCENT = 50

function buildTrajectoryInsight(monthly) {
  if (monthly.length < 3) return null

  let streak = 0
  let direction = null
  for (let i = monthly.length - 1; i > 0; i -= 1) {
    const diff = monthly[i].revenue - monthly[i - 1].revenue
    if (diff === 0) break
    const dir = diff > 0 ? 'up' : 'down'
    if (direction === null) direction = dir
    if (dir !== direction) break
    streak += 1
  }

  if (streak < 2) return null

  const verb = direction === 'up' ? 'climbed' : 'slipped'
  const monthsWord = streak === 1 ? 'month' : 'months'
  const latest = monthly[monthly.length - 1].label

  const observation = `Revenue has ${verb} for ${streak} straight ${monthsWord}, through ${latest}.`
  const action = direction === 'up'
    ? `Keep an eye on inventory and staffing so you can keep up with demand into next month.`
    : `Worth digging into recent pricing, marketing, or seasonal factors behind the slide before it continues.`

  return { id: 'trajectory', text: `${observation} ${action}` }
}

function buildSlowestMonthInsight(monthly) {
  if (monthly.length < 2) return null

  const average = monthly.reduce((sum, month) => sum + month.revenue, 0) / monthly.length
  if (!average) return null

  const slowest = monthly.reduce((min, month) => (month.revenue < min.revenue ? month : min), monthly[0])
  const dipPercent = ((average - slowest.revenue) / average) * 100
  if (dipPercent < MIN_NOTABLE_DIP_PERCENT) return null

  const observation = `${slowest.label} was your quietest month, ${formatPercent(dipPercent, { decimals: 0 })} below your average month.`
  const action = `Consider a promotion or bundle around ${slowest.label} to smooth out that dip.`

  return { id: 'slowest-month', text: `${observation} ${action}` }
}

function buildRegionInsight(regionBreakdown) {
  if (!regionBreakdown.length) return null

  const top = regionBreakdown[0]

  if (regionBreakdown.length === 1) {
    const observation = `All of your revenue so far comes from ${top.region}.`
    const action = `Consider expanding marketing to reach customers in other regions too.`
    return { id: 'region', text: `${observation} ${action}` }
  }

  const weakest = regionBreakdown[regionBreakdown.length - 1]
  const observation = `${top.region} is your strongest region, driving ${formatPercent(top.share * 100, { decimals: 0 })} of revenue (${formatCurrency(top.revenue)}).`
  const action = `Worth testing targeted ads in ${weakest.region}, your weakest region, to help it catch up.`

  return { id: 'region', text: `${observation} ${action}` }
}

function buildConcentrationInsight(topProducts, totalRevenue) {
  if (!topProducts.length || !totalRevenue) return null

  const top = topProducts.slice(0, 3)
  const topRevenue = top.reduce((sum, product) => sum + product.revenue, 0)
  const share = (topRevenue / totalRevenue) * 100

  const names = top.map((product) => product.product)
  const label = names.length === 1
    ? names[0]
    : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`

  const verb = top.length === 1 ? 'brings' : 'bring'
  const observation = `Your top ${top.length === 1 ? 'product' : `${top.length} products`} - ${label} - ${verb} in ${formatPercent(share, { decimals: 0 })} of total revenue.`
  const action = share >= HEAVY_CONCENTRATION_PERCENT
    ? top.length === 1
      ? `That's your entire product mix riding on one item - consider adding and promoting more products to spread the risk.`
      : `That's a lot of dependency on a few items - consider promoting mid-tier products to spread the risk.`
    : `Consider promoting a few more products to broaden that mix further.`

  return { id: 'concentration', text: `${observation} ${action}` }
}

export function generateInsights(orders) {
  if (!orders?.length) return []

  const monthly = computeMonthlyRevenue(orders)
  const topProducts = computeTopProducts(orders, 3)
  const regionBreakdown = computeRegionBreakdown(orders)
  const totalRevenue = orders.reduce((sum, order) => sum + order.revenue, 0)

  const candidates = [
    buildTrajectoryInsight(monthly),
    buildSlowestMonthInsight(monthly),
    buildRegionInsight(regionBreakdown),
    buildConcentrationInsight(topProducts, totalRevenue),
  ]

  return candidates.filter(Boolean).slice(0, 4)
}
