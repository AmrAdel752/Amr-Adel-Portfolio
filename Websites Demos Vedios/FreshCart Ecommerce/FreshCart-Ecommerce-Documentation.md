# FreshCart

**A Full-Featured E-Commerce Platform — Angular 20 + Tailwind CSS + Stripe**

A grocery-and-everyday-essentials storefront built as a complete, modern Angular application — covering the full shopper journey from browsing and cart management through to a real Stripe-powered checkout, with bilingual (English/Arabic RTL) support and dark mode built in.

---

## Overview

FreshCart is a feature-rich e-commerce front end demonstrating a production-style shopping experience: authentication, category/brand browsing, product catalogue, cart, order history, and a real payment integration. It's built with Angular 20 and styled with Tailwind CSS, and uses Stripe for checkout.

- **Type:** Front-end e-commerce application (portfolio project)
- **Status:** Demo — product catalogue and orders are demo/sample data; Stripe checkout is a real, functioning payment integration
- **Visual direction:** Clean white UI with a green primary brand colour; light and dark themes

## Tech Stack

- Angular 20
- Tailwind CSS
- Stripe (payment integration)

## Key Features

### Authentication
- Login and Register forms with validation

### Home
- Hero banner and quick entry points into shopping
- "Shop Popular Categories" and "Popular Products" sections surfaced right on the homepage

### Internationalization & Theming
- **English / Arabic (RTL)** language toggle — the entire layout mirrors correctly in Arabic, not just the text
- **Light / Dark mode** toggle
- Persistent cart badge and signed-in user indicator in the navbar

### Categories
- Full category grid: Music, Men's Fashion, Women's Fashion, SuperMarket, Baby & Toys, Home, Children's Books, Beauty & Health, Mobiles, Electronics

### Brands
- Dedicated brand directory with search, spanning electronics (Canon, Dell, Lenovo, Sony, Huawei), fashion (Puma, Nike, Adidas, Reebok, Skechers), and home appliances (Beko, Kenwood, Philips, Toshiba)

### Products
- Full product catalogue with category tagging, pricing, and star ratings
- **Add to Cart** with a live toast confirmation ("Cart Operational — Cart Item Updated Successfully")

### Shopping Cart
- Quantity steppers, per-item removal, running subtotal
- Order Summary panel with subtotal, shipping, and total price, and a clear "Proceed to Checkout" action

### My Orders
- Order history table (Order ID, Date, Items, Total, Payment, Delivery) with a clean empty state for new accounts

### Shipping & Checkout
- Shipping Details form with live field validation (address, phone, city) and **address autocomplete suggestions**
- Explicit "You'll be redirected to our payment partner to pay securely" messaging before handoff to Stripe

### Stripe Payment Integration
- Real embedded Stripe payment element supporting **Card, Apple Pay, Google Pay, and Link**
- Full billing flow: contact information, card details, cardholder name, country/region, "save my information for faster checkout"

## Pages / Sections

| Section | Purpose |
|---|---|
| Login / Register | Authentication |
| Home | Hero, popular categories & products |
| Categories | Full category browse |
| Brands | Brand directory with search |
| Products | Full catalogue |
| Cart | Quantity management & order summary |
| My Orders | Order history |
| Checkout | Shipping details + Stripe payment |

## Notes for Portfolio Presentation

- Product catalogue, brand data, and order history are demo/sample data.
- The Stripe checkout is a genuine, working payment integration (test mode) — a strong technical highlight, since it covers real card entry, Apple Pay, Google Pay, and Link, not just a static mockup.
- The English/Arabic RTL toggle demonstrates full bilingual layout support, not just text translation.
- Companion video walkthrough available (`FreshCart-Ecommerce-Demo-FAST`).

---
*Documentation prepared for portfolio use — Amr Adel*
