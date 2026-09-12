function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'short' })
}

export function computeMonthlyRevenue(orders) {
  const totals = new Map()
  for (const order of orders) {
    const month = order.date.slice(0, 7)
    totals.set(month, (totals.get(month) || 0) + order.revenue)
  }
  return Array.from(totals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, label: formatMonthLabel(month), revenue }))
}

export function computeTopProducts(orders, limit = 8) {
  const totals = new Map()
  for (const order of orders) {
    totals.set(order.product, (totals.get(order.product) || 0) + order.revenue)
  }
  return Array.from(totals.entries())
    .map(([product, revenue]) => ({ product, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit)
}

export function computeRegionBreakdown(orders) {
  const totals = new Map()
  for (const order of orders) {
    totals.set(order.region, (totals.get(order.region) || 0) + order.revenue)
  }
  const totalRevenue = orders.reduce((sum, order) => sum + order.revenue, 0)
  return Array.from(totals.entries())
    .map(([region, revenue]) => ({ region, revenue, share: totalRevenue ? revenue / totalRevenue : 0 }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function computeKpiSummary(orders) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.revenue, 0)
  const totalOrders = orders.length
  const aov = totalOrders ? totalRevenue / totalOrders : 0

  const monthly = computeMonthlyRevenue(orders)
  let momGrowth = null
  if (monthly.length >= 2) {
    const last = monthly[monthly.length - 1].revenue
    const previous = monthly[monthly.length - 2].revenue
    momGrowth = previous ? ((last - previous) / previous) * 100 : null
  }

  return { totalRevenue, totalOrders, aov, momGrowth }
}
