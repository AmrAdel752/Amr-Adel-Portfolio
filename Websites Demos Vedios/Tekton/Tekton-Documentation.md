# Tekton

**Auto Spare Parts E-Commerce Platform with a Full Admin Dashboard — Angular + Tailwind CSS**

A two-sided project built for a real client: a customer-facing storefront for browsing and requesting quotes on auto spare parts, paired with a complete admin dashboard that gives the store owner full control over products, categories, brands, and incoming requests — no code changes needed to run the business.

---

## Overview

Tekton is a full e-commerce platform for a car spare-parts business, covering both sides of the product: the public storefront customers browse, and the private admin dashboard staff use to manage it. It was built for a real client engagement (not ultimately purchased) and is presented here as a complete, working two-part system.

- **Type:** Full-stack-style front-end project — public storefront + admin dashboard (client project, portfolio use)
- **Status:** Demo — catalogue, quote requests, and admin data are demo/sample content
- **Visual direction:** Dark, high-contrast automotive theme with red accent; light theme and full English/Arabic (RTL) support on both storefront and dashboard

## Tech Stack

- Angular
- Tailwind CSS

---

## Part 1 — Customer Storefront

### Home
- Hero ("High-Quality Auto Spare Parts") with trust stats (2,500+ genuine parts, 10+ trusted brands, 12 years in business, 800+ workshops served)
- Full **light/dark theme** and **English/Arabic (RTL)** toggle — layout mirrors correctly in Arabic, not just translated text

### Products & Featured Parts
- "Best Spare Parts" featured grid on the homepage
- Full **Products** catalogue with a filter sidebar (category, brand, car model)
- Product detail pages with part number, compatible vehicle, price, quantity selector, specifications tab, and a direct **"Ask about this part on WhatsApp"** action

### Quote-Based Cart ("Add to Quote")
- Instead of a traditional buy-now cart, products are added to a **Quote Cart** — customers review the parts they need, then submit their details (name, phone, email, company) to request pricing and availability from the sales team
- This RFQ (request-for-quote) flow fits a B2B/wholesale auto-parts business better than instant checkout

### Offers
- Dedicated "Current Offers" page highlighting parts with special pricing, each badged "Special Offer"

### Wishlist
- Saved-for-later items, separate from the quote cart

### About
- Brand story section ("Automotive expertise built on heavy-duty reliability") with "Talk to our team" / "Browse the catalog" CTAs
- Mission-style narrative ("Built by people who know engines, not just inventory")

### Trust & Social Proof
- "Why Choose TEKTON?" value props (Genuine Products, Quality Guarantee, Fast Shipping, 24/7 Support)
- Trusted-brand logo strip and a "What Garages Say About Us" testimonials section

### Contact
- Inquiry form (phone, email, department, message) for direct sales contact

---

## Part 2 — Admin Dashboard

A private, authenticated back office that gives the store owner full control over the storefront's content without touching code.

### Authentication
- Dedicated admin sign-in, separate from the customer-facing site

### Dashboard Overview
- At-a-glance metrics: total products, featured count, items on offer, new quote requests, unread messages, newsletter subscribers, category/brand counts
- "Quote Requests — Last 6 Months" chart and a "Most Requested Parts" panel
- Recent quote requests table (customer, items, status, date)
- Full **dark mode** support in the dashboard itself

### Product Management
- Create and edit products with **bilingual fields** (English & Arabic name and description side by side)
- Category, brand, and compatible car model assignment
- **Image management** — upload and set a primary product image
- **Specifications management** — structured spec fields per product
- Toggle a product as **Featured** or **On Offer** directly from the edit screen

### Categories & Brands Management
- Full CRUD tables for both categories and brands, each with bilingual naming, slug, and active/inactive status
- Inline create forms for adding new categories or brands on the spot

### Quote Requests & Contact Messages
- Dedicated inbox-style views for incoming quote requests and contact-form messages

### Settings
- Change password and manage store administrator accounts

---

## Pages / Sections

| Area | Section | Purpose |
|---|---|---|
| Storefront | Home | Hero, trust stats, featured parts |
| Storefront | Products | Filterable catalogue & detail pages |
| Storefront | Quote Cart | RFQ-style request flow |
| Storefront | Offers / Wishlist | Promotions & saved items |
| Storefront | About / Contact | Brand story & inquiries |
| Admin | Dashboard | Analytics & recent activity |
| Admin | Products | Create/edit, images, specs, bilingual content |
| Admin | Categories / Brands | Full CRUD management |
| Admin | Quote Requests / Messages | Incoming customer requests |
| Admin | Settings | Password & admin accounts |

## Notes for Portfolio Presentation

- Built for a real client; the engagement did not convert to a purchase, so this is presented as a portfolio case study rather than a live product.
- Product catalogue, quote requests, and dashboard metrics are demo/sample data.
- The quote-based cart (rather than instant checkout) reflects a deliberate choice suited to a B2B auto-parts sales model.
- Companion video walkthrough available (`Tekton-Demo-FAST`), covering both the storefront and the admin dashboard.

---
*Documentation prepared for portfolio use — Amr Adel*
