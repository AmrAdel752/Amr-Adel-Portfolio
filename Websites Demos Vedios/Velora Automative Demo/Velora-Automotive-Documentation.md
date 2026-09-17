# Velora Automotive

**Premium Vehicle Showroom & Service Platform — Concept Demo**

A front-end-only automotive showroom and service booking concept, built to demonstrate a premium, dark-themed dealership experience: browsing a curated vehicle inventory, comparing models, and moving from interest to a service or purchase request — all without a real backend.

---

## Overview

Velora Automotive is a static demo site for a fictional premium car dealership and service center. It focuses on the two things a modern automotive site needs to get right: making it easy to **browse and compare vehicles**, and making it easy to **turn interest into a request** (buy, sell, or book a service) — while giving the business side (support, FAQs, fleet management) equal visual weight.

- **Type:** Front-end concept / portfolio project
- **Status:** Demo — content and forms are illustrative, no live backend or payment processing
- **Visual direction:** Dark automotive theme with gold accents

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)

## Key Features

### Vehicle Inventory
- Searchable, filterable vehicle listings (make/model, body type, price range, year, fuel type, transmission)
- Featured vs. full inventory views
- Sort and refine controls with an active-filters summary

### Vehicle Listings & Cards
- **Quick View** modal — full specs, gallery, and pricing without leaving the grid
- **Compare** — add up to a limited set of vehicles side by side
- **Favorites** — saved via `localStorage`, with a persistent "Saved" counter in the nav
- Toast notification system for actions (saved, compared, added)

### Vehicle Detail Pages
- Full specs (year, mileage, transmission, fuel type, body type, colour, horsepower)
- Feature list (e.g. OLED display, magnetic ride control, rear entertainment)
- Photo gallery

### Request Flow
- Unified request form covering three intents: **Buy a Vehicle**, **Sell a Vehicle**, **Book a Service**
- Context-aware fields (e.g. vehicle make/model for a buy request, service type for a booking)
- Response-time expectations shown to the user (e.g. "Demo: 1 day")

### Services
- Service categories: Pre-Purchase Inspection, Workshop Diagnostics, Routine Maintenance, Detailing & Protection
- "How It Works" process strip: Discover → Request → Support → Collect

### Business / Fleet Tools
- Fleet visibility panel aimed at business customers: preventive maintenance, scheduled service, vehicle health reports, fleet tracking, priority booking
- Dedicated "Plan Fleet Support" call to action

### Support & FAQ
- Common-question accordion (e.g. pre-purchase inspections, fleet support, financing)
- Dedicated contact/support panel

### About
- Company story and process explanation ("More Than a Showroom")

## Pages / Sections

| Section | Purpose |
|---|---|
| Home | Hero, featured inventory, value props |
| Vehicles | Full searchable/filterable inventory |
| Vehicle Detail | Quick View & full detail pages |
| Services | Inspection, diagnostics, maintenance, detailing |
| Business/Fleet | Fleet visibility & support panel |
| About | Company story |
| Support | FAQ & contact |
| Contact / Request | Buy · Sell · Book a Service form |

## Notes for Portfolio Presentation

- All inventory, pricing, and customer data are fictional and clearly labelled as demo content.
- No real transactions, authentication, or payment flows are wired up — this is a **front-end demonstration** of UX, layout, and interaction design.
- Intended deployment: GitHub Pages / Vercel.
- Companion video walkthrough available (`Velora_Automotive_Demo`).

---
*Documentation prepared for portfolio use — Amr Adel*
