# Tashtip

**A Full Finishing & Renovation Platform — Graduation Project (Graded A) — ASP.NET Core**

An Arabic (RTL) platform connecting homeowners with unit-finishing services: browse real design work in 2D, 3D, and interactive 360° panorama, get an instant cost estimate, book a site inspection, and track the order through to completion — with a full admin back office running the whole operation behind it.

---

## Overview

Tashtip ("تشطيب" — "finishing") is a three-sided platform built as a university graduation project: a public marketing/portfolio site for prospective clients, an authenticated client dashboard for tracking orders and costs, and a full admin dashboard for staff to manage units, inspections, users, and reporting. The project was graded **A**.

- **Type:** Full-stack graduation project (portfolio use)
- **Status:** Demo — content, pricing, and accounts are project/demo data
- **Language/Direction:** Arabic (RTL)
- **Visual direction:** Clean white UI with a teal/green primary accent

## Tech Stack

- ASP.NET Core

---

## Part 1 — Public Site

### Home
- Hero introducing the platform ("مع Tashtip" — "With Tashtip")

### Services & Partners
- Finishing package tiers presented as service cards, with a strip of partner/material brand logos

### Portfolio Gallery
- Filterable showcase of completed work by room type: Terraces, Kitchen, Toilet, Dressing, Master, Rooms, Living, Reception

### Unit Details
- Per-unit listing page: category, city, executing engineer, price, seller, date added
- **2D photo gallery** and a **"Book Your Unit Now"** call to action

### 360° Panorama Viewer
- A genuine interactive 360° panorama viewer for touring a unit's interior — pan and zoom, not just a static photo — alongside standard 2D/3D photo tabs

### Expert Team
- Meet-the-team section introducing the engineers behind the designs

### Pricing Plans
- Four tiers — **Extras, Lux, Super Lux, Ultra Super Lux** — each listing included features and a starting price

### FAQ
- Common questions about the platform and process

### Authentication
- Account creation and login

---

## Part 2 — Client Dashboard

Once logged in, a client gets a private dashboard to manage their own finishing journey.

### Book an Inspection
- Schedule a site visit with an engineer directly from the dashboard — pick a date, time, and add notes

### Cost Calculator
- Enter unit details (area in m², finishing level, city) to get an **instant estimated cost range**, with a direct path to book an inspection for an exact quote

### Order & Inspection Tracking
- Dashboard sidebar gives the client access to their orders, inspections, and account details in one place — the core "track your order and its cost" experience the platform is built around

---

## Part 3 — Admin Dashboard

A complete back office for staff to run the business.

### Dashboard
- Overview stats (orders, clients, appointments) and reporting widgets for at-a-glance monitoring

### Inspection Appointments
- Manage and schedule client inspection requests

### Unit Management
- Full CRUD for unit listings — details, images, pricing, and status

### Interior Design Management
- Manage the 2D/3D content and interior design assets attached to each unit

### Users & Permissions
- Role-based account management distinguishing **Admin** and **Customer** roles, with account status and contact details

## Pages / Sections

| Area | Section | Purpose |
|---|---|---|
| Public | Home / Services / Gallery | Marketing & portfolio |
| Public | Unit Details / 360° Viewer | Explore a specific unit |
| Public | Pricing / FAQ / Team | Trust & decision support |
| Client | Book Inspection | Schedule a site visit |
| Client | Cost Calculator | Instant budget estimate |
| Client | My Orders / Inspections | Track progress & cost |
| Admin | Dashboard | Business overview & reporting |
| Admin | Units / Interior Design | Content & listing management |
| Admin | Inspections | Appointment scheduling |
| Admin | Users & Permissions | Role-based account control |

## Notes for Portfolio Presentation

- Graduation project, graded **A**; all units, pricing, and accounts shown are project/demo data.
- The 360° panorama viewer and the instant cost calculator are the two standout technical features — genuine interactive tools, not static content.
- The platform covers three distinct user roles (visitor, client, admin) in one cohesive system.
- Companion video walkthrough available (`Tashtip-Demo-FAST`), covering the public site, client dashboard, and admin dashboard.

---
*Documentation prepared for portfolio use — Amr Adel*
