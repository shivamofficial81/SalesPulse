// Deterministic sample dataset for the "Try with sample data" flow.
// ~2,400 orders across 12 months for a home & living e-commerce store,
// with a Q4 holiday spike and a July dip.

const YEAR = 2025

const PRODUCTS = [
  { name: 'Ceramic Table Lamp', category: 'Lighting', price: 48.99 },
  { name: 'Linen Throw Pillow Cover', category: 'Decor', price: 22.5 },
  { name: 'Woven Storage Basket', category: 'Storage', price: 34.0 },
  { name: 'Velvet Accent Chair', category: 'Furniture', price: 289.0 },
  { name: 'Bamboo Cutting Board Set', category: 'Kitchen', price: 29.99 },
  { name: 'Cotton Waffle Throw Blanket', category: 'Bedding', price: 39.95 },
  { name: 'Modern Wall Mirror', category: 'Decor', price: 79.0 },
  { name: 'Stoneware Dinnerware Set', category: 'Kitchen', price: 89.99 },
  { name: 'Solid Wood Coffee Table', category: 'Furniture', price: 219.0 },
  { name: 'Scented Soy Candle Trio', category: 'Decor', price: 27.0 },
  { name: 'Memory Foam Bath Mat', category: 'Bath', price: 24.99 },
  { name: 'Rattan Pendant Light', category: 'Lighting', price: 65.0 },
  { name: 'Organic Cotton Sheet Set', category: 'Bedding', price: 69.0 },
  { name: 'Marble Coasters Set of 4', category: 'Decor', price: 19.99 },
  { name: 'Adjustable Bookshelf', category: 'Furniture', price: 149.0 },
]

const REGIONS = [
  { name: 'West', weight: 0.3 },
  { name: 'South', weight: 0.3 },
  { name: 'Midwest', weight: 0.2 },
  { name: 'Northeast', weight: 0.2 },
]

// Relative order volume per month (index 0 = January). July dips,
// Oct/Nov/Dec ramp into a holiday peak.
const MONTH_WEIGHTS = [1.0, 0.9, 1.0, 1.0, 1.05, 0.95, 0.6, 0.9, 1.0, 1.3, 1.6, 1.9]

const TOTAL_ORDERS = 2400

// Small seeded PRNG so the sample dataset is identical on every load.
function mulberry32(seed) {
  let a = seed
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickWeighted(random, items, weightKey) {
  const total = items.reduce((sum, item) => sum + item[weightKey], 0)
  let roll = random() * total
  for (const item of items) {
    roll -= item[weightKey]
    if (roll <= 0) return item
  }
  return items[items.length - 1]
}

function daysInMonth(monthIndex) {
  return new Date(YEAR, monthIndex + 1, 0).getDate()
}

function randomDateInMonth(random, monthIndex) {
  const day = 1 + Math.floor(random() * daysInMonth(monthIndex))
  const month = String(monthIndex + 1).padStart(2, '0')
  const dayStr = String(day).padStart(2, '0')
  return `${YEAR}-${month}-${dayStr}`
}

function randomQuantity(random) {
  // Mostly single-item orders, occasionally 2-4.
  const roll = random()
  if (roll < 0.6) return 1
  if (roll < 0.85) return 2
  if (roll < 0.96) return 3
  return 4
}

function generateSampleOrders() {
  const random = mulberry32(20250101)
  const totalWeight = MONTH_WEIGHTS.reduce((sum, w) => sum + w, 0)
  const orders = []
  let orderNumber = 1

  MONTH_WEIGHTS.forEach((weight, monthIndex) => {
    const monthOrderCount = Math.round((TOTAL_ORDERS * weight) / totalWeight)

    for (let i = 0; i < monthOrderCount; i += 1) {
      const product = pickWeighted(
        random,
        PRODUCTS.map((p) => ({ ...p, weight: 1 })),
        'weight',
      )
      const region = pickWeighted(random, REGIONS, 'weight')
      const quantity = randomQuantity(random)
      // +/-10% price noise to mimic small discounts/promotions.
      const unitPrice = Math.round(product.price * (0.9 + random() * 0.2) * 100) / 100
      const revenue = Math.round(unitPrice * quantity * 100) / 100

      orders.push({
        orderId: `ORD-${String(orderNumber).padStart(5, '0')}`,
        date: randomDateInMonth(random, monthIndex),
        product: product.name,
        category: product.category,
        region: region.name,
        quantity,
        unitPrice,
        revenue,
      })

      orderNumber += 1
    }
  })

  orders.sort((a, b) => a.date.localeCompare(b.date))
  return orders
}

export const sampleOrders = generateSampleOrders()
