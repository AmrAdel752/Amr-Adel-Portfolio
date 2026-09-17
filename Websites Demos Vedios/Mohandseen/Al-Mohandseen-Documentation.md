# Al-Mohandseen (المهندسين)

**A Construction Materials Marketplace with Request-for-Quote Ordering — ASP.NET Core**

An Arabic (RTL) B2B-style marketplace connecting buyers with construction materials and tools — cement, ready-mix concrete, steel, sand, blocks — through a request-for-quote flow rather than a standard checkout, paired with a full admin back office to manage the catalogue and incoming requests.

---

## Overview

Al-Mohandseen ("The Engineers") is a freelance client project built for a graduation team: a construction-materials marketplace positioning itself as "Egypt's largest building materials market." Buyers browse products and categories, request price quotes on specific materials, and track their own requests, while admins manage the full product catalogue and monitor incoming demand.

- **Type:** Freelance client project, built for a graduation team (portfolio use)
- **Status:** Demo — catalogue and requests shown are project/demo data
- **Language/Direction:** Arabic (RTL)
- **Visual direction:** Clean white UI with a construction-site hero image and a deep green primary accent

## Tech Stack

- ASP.NET Core

## Key Features

### Home
- Hero ("Largest Construction Market in Egypt") with trust stats (24/7 request fulfillment, 7 main categories, 12 available materials)
- Quick category pills for jumping straight into a material type: Electrical Materials, Sand & Raw Materials, Tiles & Bricks, Ready-Mix Concrete, Cement, Steel & Metals

### Product Catalogue
- Featured Products grid on the homepage
- Full product listing with category filtering and search
- Product detail pages showing price, unit, and a direct request action (e.g. Ready-Mix Concrete at 2,200 EGP/m³)

### Request a Price Quote (RFQ)
- Instead of an instant-buy cart, buyers submit a structured quote request: material needed, quantity, unit, preferred payment terms (cash/installments), and additional notes
- This mirrors how construction-materials procurement actually works — pricing and availability are confirmed before purchase

### Contact
- Direct inquiry form for general questions, alongside company contact details in the footer

### Authentication
- Registration and secure login (built on ASP.NET Core Identity)

---

## Client Account Area

### My Requests
- A dedicated page where a logged-in buyer can see the status of all the price-quote requests they've submitted, with a clear empty state and a direct "Request a Quote Now" prompt when they have none yet

---

## Admin Dashboard

### Dashboard Overview
- At-a-glance stats: new quote requests, pending orders, total products, total customers
- Recent price-quote requests panel for quick triage

### Product Management
- Full CRUD product table — name, category, price — with inline edit/delete actions, covering the entire catalogue

### Quote Requests & Orders
- Dedicated views for incoming price-quote requests and orders, separate from the public-facing catalogue

## Pages / Sections

| Area | Section | Purpose |
|---|---|---|
| Public | Home / Products | Browse the materials catalogue |
| Public | Product Detail | Pricing & request-a-quote |
| Public | Contact | General inquiries |
| Client | My Requests | Track submitted quote requests |
| Admin | Dashboard | Business overview |
| Admin | Products | Full catalogue CRUD |
| Admin | Quote Requests / Orders | Incoming demand management |

## Notes for Portfolio Presentation

- Built as a freelance engagement for a graduation team; product catalogue, requests, and stats shown are project/demo data.
- The request-for-quote model (rather than instant checkout) reflects a deliberate fit for a construction-materials buying process, where pricing depends on quantity, delivery, and payment terms.
- Companion video walkthrough available (`Al-Mohandseen-Demo-FAST`), covering the public storefront, client request-tracking, and the admin dashboard.

---
*Documentation prepared for portfolio use — Amr Adel*
