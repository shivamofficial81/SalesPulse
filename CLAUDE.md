# SalesPulse — Project Context

## What this is
A client-facing demo: an e-commerce KPI dashboard for my Upwork portfolio.
Target audience: small business owners with zero technical knowledge.

## Stack (do not deviate)
- Vite + React 18, JavaScript (no TypeScript)
- Recharts for all charts, PapaParse for CSV parsing
- Styling: plain CSS / inline styles only. No Tailwind, no CSS variables,
  no UI libraries. Must run offline after npm install.
- Node v20.16.0 on Windows — all commands must work in PowerShell.

## Design rules
- Look: clean, modern SaaS (think Stripe/Linear aesthetic), light theme
- Every screen must look good in a screenshot — this IS the portfolio
- Mobile-responsive
- Currency shown in USD ($) — clients are US-based by default. Can change currency according to their own preference.

## Features (v1 scope — nothing more)
1. Landing state: upload CSV + "Try with sample data" button
2. KPI cards: revenue, orders, AOV, MoM growth with up/down arrows
3. Revenue trend line chart (12 months)
4. Top products horizontal bar chart (top 8)
5. Region breakdown chart
6. Insights panel: 3-4 auto-generated plain-English business observations
7. Friendly error handling for malformed CSVs

## Out of scope (refuse politely if I ask mid-build)
Login, database, dark mode, exports, multi-file upload