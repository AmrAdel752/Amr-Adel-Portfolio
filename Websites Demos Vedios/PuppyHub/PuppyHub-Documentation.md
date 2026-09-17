# PuppyHub

**A Pet Marketplace & Care-Services Platform — ASP.NET Core MVC**

A two-sided platform for the pet world: buyers find puppies, kittens, and other pets from trusted sellers, while pet parents book verified groomers, vets, and trainers — all backed by a full admin system for managing users, listings, providers, and bookings.

---

## Overview

PuppyHub connects pet buyers with trusted sellers, and pet parents with verified care providers (groomers, vets, trainers), in one marketplace. It evolved from an earlier freelance dog-listing web app into a full multi-role platform covering listings, care-service bookings, reviews, favorites, and a complete admin back office.

- **Type:** Full-stack portfolio project, evolved from a freelance client app
- **Status:** Demo — listings, bookings, and accounts shown are project/demo data
- **Visual direction:** Warm cream background with a bold orange accent and pet photography

## Tech Stack

- ASP.NET Core MVC

## Key Features

### Home & Discovery
- Hero ("Find your new best friend, and everyone who cares for them.") with live stats (active listings, care providers, happy bookings)
- **Browse by Category** — Pet Listings, Grooming, Veterinary Care, Training
- **Newest Listings** rail surfacing recently published pets
- **How PuppyHub Works** — a simple 4-step framing: Create an account → Browse or list → Connect → Enjoy the journey

### Trusted Care Services
- Dedicated search with filters (keyword, category, city) and a **"Verified providers only"** toggle
- Provider cards show ratings, starting price, and service type (Boarding, Vet Clinic, Grooming, Dog Walking, Training Academy)
- Provider detail pages list specific services with pricing, plus a review section

### Multi-Role Accounts
The platform recognizes distinct roles — **Customer, Seller, Service Provider, and Admin** — each with a tailored account experience:

- **My Listings** — sellers create, publish, and manage their own pet listings
- **Create a New Listing** — full pet-details form: name, breed, date of birth, gender, color, price, city, description, plus weaned/vaccinated flags and listing visibility
- **Business Profile** — service providers set up their public profile: business name, category, contact info, address, description, logo, and photo gallery
- Additional account areas: bookings/appointments, availability, favorites, saved searches

### Admin Dashboard
A comprehensive back office covering the whole platform, organized into tabs:

- **Dashboard** — platform-wide stats (service providers, providers pending verification, total bookings, bookings awaiting confirmation, reviews)
- **Users** — manage every account's roles directly from a table, toggling Admin / Customer / Seller / ServiceProvider per user
- **Listings** — full pet-listing management across every status (Draft, Pending Review, Published, Reserved, Sold, Rejected, Archived), with one-click Reject
- **Providers** — verify and manage service-provider accounts
- **Bookings** — track every appointment platform-wide (customer, service, provider, date/time, status: confirmed/pending/completed/cancelled)
- **Reviews** — oversee customer reviews left for providers

## Pages / Sections

| Area | Section | Purpose |
|---|---|---|
| Public | Home / Browse | Discover pets & categories |
| Public | Care Services | Find & filter verified providers |
| Account | My Listings | Create & manage pet listings |
| Account | Business Profile | Service-provider public profile |
| Admin | Dashboard | Platform-wide overview |
| Admin | Users | Role management |
| Admin | Listings | Status & moderation |
| Admin | Providers | Verification |
| Admin | Bookings | Appointment tracking |
| Admin | Reviews | Review oversight |

## Notes for Portfolio Presentation

- Originally built as a freelance dog-listing app; evolved into the current multi-role marketplace-and-services platform for the portfolio.
- All listings, bookings, and user accounts are demo data — the footer explicitly labels it "a portfolio project."
- Four distinct roles (Customer, Seller, ServiceProvider, Admin) are modeled with real permission differences, not just a label — a strong signal of backend design depth.
- Companion video walkthrough available (`PuppyHub-Demo-FAST`), covering the public marketplace, account features, and the full admin dashboard.

---
*Documentation prepared for portfolio use — Amr Adel*
