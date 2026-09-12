import Header from './Header'
import UploadZone from './UploadZone'
import { sampleOrders } from '../data/sampleData'
import { downloadSampleCsv } from '../utils/sampleCsv'
import './LandingPage.css'

function LandingPage({ onDataReady }) {
  return (
    <>
      <Header />
      <main className="landing">
        <div className="landing-grid">
          <div className="landing-copy">
            <h1 className="landing-headline">Drop in your orders. See what matters.</h1>
            <p className="landing-subtext">
              Revenue, growth, top products, and regions, from a single CSV. No login, no setup.
            </p>

            <div className="landing-cta">
              <button
                type="button"
                className="sample-button"
                onClick={() => onDataReady(sampleOrders, 'sample data')}
              >
                Try with sample data
              </button>
              <p className="sample-caption">
                {sampleOrders.length.toLocaleString()} example orders across 12 months
              </p>
            </div>
          </div>

          <div className="upload-column">
            <UploadZone onDataReady={onDataReady} />
            <div className="upload-meta">
              <p className="upload-format-hint">
                Needs a date and amount column. Product and region are optional and unlock more charts.
              </p>
              <button type="button" className="upload-sample-link" onClick={downloadSampleCsv}>
                Download sample CSV
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default LandingPage
