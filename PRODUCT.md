# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 18, JavaScript (no TypeScript). Recharts for charts, PapaParse for CSV parsing. Plain CSS / inline styles only: no Tailwind, no CSS custom properties, no UI component libraries. Must run fully offline after `npm install`. Node v20.16.0 on Windows; commands must work in PowerShell.

## Users

Small business owners with zero technical knowledge who run an e-commerce store and want to understand their own sales performance at a glance. They are not analysts: they will not tolerate jargon, ambiguous charts, or a setup process. They arrive either with their own orders CSV export or wanting to see the product work on realistic sample data first.

## Product Purpose

SalesPulse is a single-page e-commerce KPI dashboard. A user uploads an orders CSV (or tries sample data) and immediately sees revenue, orders, AOV, and month-over-month growth, a 12-month revenue trend, top products, a region breakdown, and a handful of plain-English business observations generated from their own data. Success is a business owner understanding their store's health in under a minute without reading documentation.

## Positioning

This is a portfolio demo (built for an Upwork portfolio), not a hosted SaaS product: there is no login, no database, no persistence across sessions, and no multi-file upload. Its differentiator versus a generic "upload a CSV, get a chart" tool is that every screen is designed to look convincing and screenshot-ready as a finished product, and the insights panel translates raw numbers into plain-English observations rather than leaving that interpretation to the user.

## Operating Context

Single session, single file, client-side only: a user uploads one CSV or clicks "Try with sample data," and the app parses and visualizes it entirely in the browser. There is no backend, no accounts, and nothing persists after the tab closes.

## Capabilities and Constraints

**In scope (v1):** CSV upload with drag-and-drop, a "Try with sample data" fallback, KPI cards (revenue, orders, AOV, MoM growth with up/down arrows), a 12-month revenue trend line chart, a top-8-products horizontal bar chart, a region breakdown chart, an auto-generated insights panel (3-4 observations), and friendly handling of malformed CSVs.

**Explicitly out of scope:** login/auth, a database, dark mode, exporting data, multi-file upload. These should be politely refused if requested mid-build.

**Currency:** displayed in USD ($) by default since clients are assumed US-based, but can be changed per the end client's own preference.

## Brand Commitments

Product name is "SalesPulse." No existing logo, color palette, or type system yet; the visual identity is being established as part of this build (see DESIGN.md once created).

## Evidence on Hand

No real client CSV data exists yet. A deterministic sample dataset lives at `src/data/sampleData.js`: ~2,400 orders across 12 months of 2025 for a home & living e-commerce store, 15 products, 4 US regions (West/South/Midwest/Northeast), with a seasonal Q4 spike and a July dip. This is the only data the "Try with sample data" flow may use; do not fabricate additional sample datasets elsewhere.

## Product Principles

1. Every screen must look good in a screenshot, since the app itself is the portfolio piece being sold.
2. Zero technical knowledge should be required of the end user at any step; prefer plain language over dashboard jargon.
3. The product must work with no setup beyond `npm install` and no network dependency once running.
4. Keep strictly to v1 scope; do not add login, persistence, exports, or multi-file upload even if it seems like a natural extension.
5. Friendly, specific error handling beats silent failure, especially for malformed CSV uploads.

## Accessibility & Inclusion

No formal accessibility standard was specified, but the primary audience (non-technical small business owners) implies a general requirement for a low-friction, low-jargon, forgiving interface. No additional accessibility constraints have been confirmed yet.
