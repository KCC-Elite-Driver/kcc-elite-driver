

# KCC-EliteDriver — Phase 1 Implementation Plan

## Overview
A premium luxury chauffeur website for KCC-EliteDriver, serving Cairo and Paris. Phase 1 delivers the core brand experience with **Home**, **Fleet**, and **Contact** pages, plus the foundation for the language switcher and design system.

---

## 🎨 Design System — "Luxe Silencieux"

- **Color palette**: Obsidian Black (#050505) primary, Signature Gold (#C5A059) accent, Anthracite Gray (#1A1A1A) cards, Pure White headings, Silk Gray (#9CA3AF) body text
- **Typography**: Playfair Display for headings (elegant serif), Inter for body text (clean sans-serif)
- **UI effects**: Glassmorphism on sticky header, subtle fade-in animations on scroll, smooth hover transitions on cards and CTAs
- **No bright colors** — the palette stays dark, gold, and restrained throughout

---

## 📄 Pages

### 1. Home Page
- **Hero section**: Full-screen immersive background blending Cairo and Paris luxury imagery (placeholder), with the headline *"L'excellence à chaque kilomètre"* and a minimalist booking widget (One-way / Hourly toggle with pickup, dropoff, date, and time fields)
- **Global Axis section**: Brief visual showcasing the Cairo ↔ Paris ↔ International connection with elegant iconography
- **Fleet Preview**: 3 cards (Business, First Class, Van) with placeholder vehicle images, short descriptions, and links to the Fleet page
- **Values section**: Three pillars — Discretion, Punctuality, Multilingual drivers — presented with gold icons and clean copy

### 2. Fleet Page
- Detailed cards for each vehicle category (Business, First Class, Van)
- Each card includes: placeholder vehicle image, passenger capacity, luggage capacity, amenities list (Wi-Fi, water, phone chargers, etc.), and a "Book Now" CTA
- Clean grid layout with hover effects

### 3. Contact Page
- Inquiry form for bespoke requests (name, email, phone, message, service type)
- Map placeholder section (ready for future Google Maps embed)
- Direct CTAs: WhatsApp button and phone call button, styled with gold accents
- Form submissions stored in Supabase

---

## 🌐 Language Switcher (FR / EN / AR)
- Header toggle to switch between French, English, and Arabic
- All static text content translatable via a simple translation system
- Arabic uses translated text only (no RTL layout mirroring)
- Default language: French

---

## 🧭 Navigation
- Sticky glassmorphic header with logo (text-based placeholder), nav links (Home, Fleet, Services, Booking, Contact), language switcher, and a gold "Réserver" CTA button
- Mobile: Hamburger menu with elegant slide-in drawer
- Smooth scroll behavior and active route highlighting

---

## ⚙️ Backend (Supabase)
- **Contact inquiries table**: Stores form submissions from the Contact page
- Basic database setup to prepare for Phase 2 booking data

---

## 📱 Responsive Design
- Mobile-first approach optimized for travelers on the go
- Touch-friendly booking widget and navigation
- All sections adapt gracefully from mobile to desktop

---

## 🚀 Phase 2 (Future)
The following will be built after Phase 1 is validated:
- **Services page**: Deep dive into Airport Transfers, Hourly Hire, and VIP Events
- **Booking page**: Step-by-step checkout with Google Places Autocomplete, distance-based pricing calculation, and Stripe payment integration
- Full Google Maps API integration for distance and address suggestions

