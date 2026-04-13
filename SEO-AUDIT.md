# SEO Audit Report — Pet Care Veterinary Clinic

**Date:** April 12, 2026
**Overall Health:** 6/10 — Good foundation, but critical issues need fixing before launch.

---

## Executive Summary

The site has solid SEO bones — schema markup, dynamic OG images, auto-generated sitemaps, and proper canonical tags. However, a broken robots.txt, missing production URL, empty alt text, and schema errors undermine it.

**Top 5 Priorities:**

1. Fix broken `robots.txt` (not rendering — returns HTML)
2. Set `NEXT_PUBLIC_SITE_URL` to production domain
3. Add OG images to service pages
4. Add internal links from homepage to service pages
5. Fix schema markup errors (hours format, placeholder values)

---

## Critical Issues

### 1. `robots.txt` is completely broken

| | |
|---|---|
| **Impact** | CRITICAL |
| **Evidence** | `/robots.txt` returns `Content-Type: text/html` — renders the homepage instead of a robots.txt file |
| **Cause** | `robots.ts` is inside the `(web)` route group. Next.js requires it at `src/app/robots.ts` (root level) |
| **Fix** | Move `src/app/(web)/robots.ts` → `src/app/robots.ts` |

Googlebot cannot read crawl directives or find the sitemap reference.

### 2. `NEXT_PUBLIC_SITE_URL` not set — all URLs use `localhost:3000`

| | |
|---|---|
| **Impact** | CRITICAL |
| **Evidence** | Canonical tags, OG URLs, sitemap URLs, and JSON-LD all output `http://localhost:3000` |
| **Fix** | Set `NEXT_PUBLIC_SITE_URL=https://petcaretucson.com` (or production domain) in `.env` |

In production, every canonical, OG tag, and sitemap entry would point to localhost.

---

## High-Impact Issues

### 3. Service pages have no OG images

| | |
|---|---|
| **Impact** | HIGH |
| **Evidence** | All 7 service pages are missing `og:image` meta tags entirely |
| **Cause** | `src/app/(web)/services/[slug]/page.tsx` lines 58-71 — `openGraph` object has no `images` property |
| **Fix** | Add `images: [{ url: \`\${siteConfig.url}/opengraph-image\` }]` to the openGraph object, or use `mergeOpenGraph()` |

### 4. Homepage has zero internal links to service pages

| | |
|---|---|
| **Impact** | HIGH |
| **Evidence** | Homepage links only to anchor sections (`#specials`, `#about`, `#location`) and `href="#"` placeholders. No links to `/services/*` pages |
| **Fix** | Ensure service cards, CTA buttons, and navigation link to actual service detail pages |

Service pages are orphaned from the homepage. Google discovers pages through internal links — the sitemap helps, but internal linking is the primary signal for page importance.

### 5. Five images have empty alt text

| | |
|---|---|
| **Impact** | HIGH |
| **Evidence** | 5 of 7 `<img>` tags on the homepage have `alt=""` — hero and content images, not decorative |
| **Fix** | Add descriptive alt text in the CMS Media library for each uploaded image |

### 6. Schema markup has multiple errors

| Issue | Detail |
|---|---|
| `openingHoursSpecification` | Uses `"Monday-Friday"` and `"8am – 6pm"` — Schema.org requires individual day URIs (`"Monday"`, `"Tuesday"`) and `HH:MM` format (`"08:00"`). Missing `closes` property |
| `sameAs` | Contains `["#", "#", "#"]` — placeholder values that should be real URLs or removed |
| `telephone` | Missing from homepage schema (no phone in CMS?) |
| Service page phone | Hardcoded placeholder `"(555) 012-3456"` at `services/[slug]/page.tsx` line 115 |

**Fix:** Update clinic info in CMS with real social URLs and phone number. Fix opening hours format. Replace hardcoded phone with `clinicInfo.phone`.

---

## Medium-Impact Issues

### 7. Homepage title is grammatically awkward

| | |
|---|---|
| **Current** | `Pet Care - Affordable Veterinary in Tucson` |
| **Issue** | "Affordable Veterinary" is missing a noun |
| **Suggested** | `Affordable Veterinary Clinic in Tucson | Pet Care Vet` |
| **File** | `src/utilities/site-config.ts` line 3 |

### 8. OG URL for homepage points to `/home` instead of root

| | |
|---|---|
| **Evidence** | `og:url` = `http://localhost:3000/home` but canonical = `http://localhost:3000` |
| **Cause** | `generate-meta.ts` line 68 passes slug `"home"` as the OG URL while the canonical correctly maps to root |
| **Fix** | Add check: `url: slug === 'home' ? '/' : slug` in the OG config |

### 9. No blog content yet

| | |
|---|---|
| **Evidence** | Sitemap includes `/posts/*` collection but no posts exist |
| **Recommendation** | Blog content targeting long-tail keywords like "how much does a vet visit cost in Tucson" would drive organic traffic |

---

## Low-Impact / Quick Wins

### 10. CTA heading has a typo

- Service page H2 reads: "Ready to book affordable**wellness** exams in Tucson?" (missing space)

### 11. Missing `og:type: 'article'` for blog posts

- Posts use the default `website` type from `mergeOpenGraph()`. Should use `article`.

### 12. No breadcrumb schema markup

- Adding `BreadcrumbList` schema to service and post pages would enable enhanced SERP display.

### 13. No FAQ schema

- Common questions about pricing, walk-in availability, and services could earn FAQ rich results.

---

## What's Working Well

- **Sitemap** — Auto-generated from database with proper priorities and change frequencies
- **Canonical tags** — Present on all pages with correct logic (homepage maps to root)
- **JSON-LD schema** — VeterinaryCare type on both global layout and individual service pages
- **Dynamic OG images** — Branded 1200x630 images auto-generated
- **Title template** — Clean `%s - Pet Care` pattern via Next.js metadata API
- **Service page SEO** — Good keyword-rich titles, descriptive meta descriptions with pricing
- **Heading hierarchy** — Single H1 per page, logical H2/H3 structure
- **Image optimization** — WebP format, responsive srcsets, Next.js Image component
- **HTTPS-ready** — Once production URL is set
- **Clean URLs** — Descriptive, keyword-rich slugs (`/services/low-cost-wellness-exams`)
- **Skip to content** link — Accessibility bonus

---

## Prioritized Action Plan

### Phase 1 — Critical Fixes

- [x] Move `robots.ts` to `src/app/robots.ts`
- [x] Set `NEXT_PUBLIC_SITE_URL` to production domain

### Phase 2 — High-Impact Fixes

- [ ] Add OG images to service page metadata
- [ ] Add internal links from homepage to service detail pages
- [ ] Add alt text to all content images in CMS
- [ ] Fix schema opening hours format (individual days, `HH:MM`, add `closes`)
- [ ] Remove placeholder `sameAs` values or add real social URLs
- [ ] Add real phone number to CMS clinic info
- [ ] Replace hardcoded `(555)` phone in service page schema with dynamic value

### Phase 3 — Quick Wins

- [ ] Fix homepage title grammar
- [ ] Fix OG URL for homepage (`/home` → `/`)
- [ ] Fix "affordablewellness" typo

### Phase 4 — Long-Term

- [ ] Create blog content targeting local long-tail keywords
- [ ] Add breadcrumb schema
- [ ] Add FAQ schema for common questions
- [ ] Build out Google Business Profile
- [ ] Set up real social media accounts and link them
