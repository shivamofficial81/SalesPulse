import './Header.css'

function PulseMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect width="34" height="34" rx="8" fill="#0F7A4D" />
      <path
        d="M7 18h4l2.5-7L18 24l2.5-10 2 4H27"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Header() {
  return (
    <header className="sp-header">
      <div className="sp-header-brand">
        <PulseMark />
        <div className="sp-header-text">
          <span className="sp-header-name">SalesPulse</span>
          <span className="sp-header-tagline">Understand your store's sales in one upload</span>
        </div>
      </div>
      <span className="sp-header-note">No account needed</span>
    </header>
  )
}

export default Header
