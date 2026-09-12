import { useRef, useState } from 'react'
import { parseOrdersCsv } from '../utils/parseOrdersCsv'
import './UploadZone.css'

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="zone-icon">
      <path d="M12 15V4M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 15v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="zone-icon zone-spinner">
      <circle cx="12" cy="12" r="9" stroke="#E4E6EA" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="status-icon status-icon-error">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="16.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function isCsvFile(file) {
  return /\.csv$/i.test(file.name)
}

function UploadZone({ onDataReady }) {
  const [status, setStatus] = useState('idle')
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef(null)

  async function acceptFile(candidate) {
    if (!candidate) return

    if (!isCsvFile(candidate)) {
      setError("That doesn't look like a CSV. Export your orders as a .csv file and try again.")
      setStatus('error')
      return
    }

    setFileName(candidate.name)
    setStatus('parsing')

    const result = await parseOrdersCsv(candidate)
    if (!result.orders) {
      setError(result.error)
      setStatus('error')
      return
    }

    onDataReady(result.orders, candidate.name)
  }

  function reset() {
    setStatus('idle')
    setError('')
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }

  function openPicker() {
    inputRef.current?.click()
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragActive(false)
    acceptFile(event.dataTransfer.files?.[0])
  }

  function handleZoneKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPicker()
    }
  }

  const isInteractive = status === 'idle' || status === 'error'

  return (
    <div className="upload-zone-wrap">
      <div
        className={`upload-zone status-${status}${isDragActive ? ' drag-active' : ''}`}
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-label="Upload a CSV file of your orders"
        onClick={isInteractive ? openPicker : undefined}
        onKeyDown={isInteractive ? handleZoneKeyDown : undefined}
        onDragOver={(event) => {
          event.preventDefault()
          if (isInteractive) setIsDragActive(true)
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={isInteractive ? handleDrop : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="upload-zone-input"
          onChange={(event) => acceptFile(event.target.files?.[0])}
          tabIndex={-1}
        />

        {status === 'parsing' ? (
          <div className="zone-content">
            <SpinnerIcon />
            <p className="zone-title">Reading {fileName}</p>
            <p className="zone-subtitle">This only takes a moment</p>
          </div>
        ) : status === 'error' ? (
          <div className="zone-content">
            <AlertIcon />
            <p className="zone-title">Couldn't read that file</p>
            <p className="zone-subtitle">{error}</p>
            <button type="button" className="zone-link" onClick={(event) => { event.stopPropagation(); reset() }}>
              Try again
            </button>
          </div>
        ) : (
          <div className="zone-content">
            <UploadIcon />
            <p className="zone-title">Drag your orders CSV here</p>
            <p className="zone-subtitle">or click to browse your files</p>
            <p className="zone-hint">Exported from Shopify, WooCommerce, or your own spreadsheet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadZone
