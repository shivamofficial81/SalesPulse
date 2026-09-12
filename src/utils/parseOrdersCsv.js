import Papa from 'papaparse'

const COLUMN_ALIASES = {
  orderId: ['orderid', 'order id', 'id', 'order #', 'order number'],
  date: ['date', 'orderdate', 'order date', 'transaction date', 'purchase date', 'created at'],
  product: ['product', 'item', 'productname', 'product name', 'item name', 'title', 'sku'],
  category: ['category', 'productcategory', 'product category'],
  region: ['region', 'state', 'area', 'province', 'territory', 'shipping region'],
  quantity: ['quantity', 'qty', 'qty ordered'],
  unitPrice: ['unitprice', 'unit price', 'price', 'item price', 'sale price'],
  revenue: ['revenue', 'total', 'amount', 'ordertotal', 'order total', 'sales', 'net sales', 'grand total', 'line total'],
}

function normalizeHeader(header) {
  return header.trim().toLowerCase().replace(/[\s_]+/g, ' ')
}

function buildColumnMap(fields) {
  const normalized = fields.map((field) => ({ original: field, normalized: normalizeHeader(field) }))
  const map = {}
  for (const [key, aliases] of Object.entries(COLUMN_ALIASES)) {
    const match = normalized.find((field) => aliases.includes(field.normalized))
    if (match) map[key] = match.original
  }
  return map
}

function normalizeDate(rawDate) {
  const parsed = new Date(rawDate)
  if (Number.isNaN(parsed.getTime())) return null
  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const GENERIC_ERROR = "That CSV doesn't look like an orders export. We need at least a date column and a price or revenue column."
const EMPTY_ERROR = "We couldn't find any valid order rows in that file."
const READ_ERROR = "That file couldn't be read. Make sure it's a valid CSV export."

export function parseOrdersCsv(file) {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const fields = results.meta.fields || []
        const columnMap = buildColumnMap(fields)

        if (!columnMap.date || (!columnMap.revenue && !columnMap.unitPrice)) {
          resolve({ orders: null, error: GENERIC_ERROR })
          return
        }

        const orders = []
        results.data.forEach((row, index) => {
          const date = normalizeDate(row[columnMap.date])
          if (!date) return

          const quantity = columnMap.quantity ? Number(row[columnMap.quantity]) || 1 : 1
          const unitPrice = columnMap.unitPrice ? Number(row[columnMap.unitPrice]) || 0 : 0
          const revenue = columnMap.revenue ? Number(row[columnMap.revenue]) || 0 : quantity * unitPrice
          if (!revenue) return

          orders.push({
            orderId: columnMap.orderId ? String(row[columnMap.orderId]) : `ROW-${index + 1}`,
            date,
            product: columnMap.product ? String(row[columnMap.product]) : 'Unknown product',
            category: columnMap.category ? String(row[columnMap.category]) : 'Uncategorized',
            region: columnMap.region ? String(row[columnMap.region]) : 'Unknown',
            quantity,
            unitPrice: unitPrice || (quantity ? revenue / quantity : revenue),
            revenue,
          })
        })

        if (orders.length === 0) {
          resolve({ orders: null, error: EMPTY_ERROR })
          return
        }

        resolve({ orders, error: null })
      },
      error: () => resolve({ orders: null, error: READ_ERROR }),
    })
  })
}
