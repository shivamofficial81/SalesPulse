// Static 20-row example CSV so new users can see the expected column
// format, or use it as a quick test file. Independent of sampleData.js
// (which drives the full "Try with sample data" dashboard).

const SAMPLE_ROWS = [
  ['2025-01-03', 'Ceramic Table Lamp', 48.99, 'West'],
  ['2025-01-05', 'Linen Throw Pillow Cover', 45.0, 'South'],
  ['2025-01-08', 'Woven Storage Basket', 34.0, 'Midwest'],
  ['2025-01-11', 'Velvet Accent Chair', 289.0, 'Northeast'],
  ['2025-01-14', 'Bamboo Cutting Board Set', 29.99, 'West'],
  ['2025-01-17', 'Cotton Waffle Throw Blanket', 79.9, 'South'],
  ['2025-01-19', 'Modern Wall Mirror', 79.0, 'Midwest'],
  ['2025-01-22', 'Stoneware Dinnerware Set', 89.99, 'Northeast'],
  ['2025-01-25', 'Scented Soy Candle Trio', 54.0, 'West'],
  ['2025-01-28', 'Memory Foam Bath Mat', 24.99, 'South'],
  ['2025-02-01', 'Rattan Pendant Light', 65.0, 'Midwest'],
  ['2025-02-04', 'Organic Cotton Sheet Set', 69.0, 'Northeast'],
  ['2025-02-07', 'Marble Coasters Set of 4', 39.98, 'West'],
  ['2025-02-10', 'Adjustable Bookshelf', 149.0, 'South'],
  ['2025-02-13', 'Ceramic Table Lamp', 97.98, 'Midwest'],
  ['2025-02-16', 'Woven Storage Basket', 34.0, 'Northeast'],
  ['2025-02-19', 'Velvet Accent Chair', 289.0, 'West'],
  ['2025-02-22', 'Bamboo Cutting Board Set', 59.98, 'South'],
  ['2025-02-25', 'Modern Wall Mirror', 79.0, 'Midwest'],
  ['2025-02-28', 'Scented Soy Candle Trio', 27.0, 'Northeast'],
]

export function buildSampleCsv() {
  const header = 'date,product,amount,region'
  const lines = SAMPLE_ROWS.map(([date, product, amount, region]) => {
    const safeProduct = product.includes(',') ? `"${product}"` : product
    return `${date},${safeProduct},${amount},${region}`
  })
  return [header, ...lines].join('\n')
}

export function downloadSampleCsv() {
  const blob = new Blob([buildSampleCsv()], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'salespulse-sample-orders.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
