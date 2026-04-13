# UI/UX Review: Pet Care Veterinary Clinic

## CRITICAL (Priority 1-2)

- [x] **1. Missing `prefers-reduced-motion` support** — `globals.css` defines `float-slow`, `float-delayed`, `fade-up-*`, `marquee-track` animations but none respect `prefers-reduced-motion`. Users with vestibular disorders see constant motion. Add a media query to disable/reduce all custom animations.

- [x] **2. No skip-to-content link** — `header.tsx` has no skip link. Keyboard users must tab through every nav item before reaching content. Add a visually-hidden skip link as the first focusable element.

- [x] **3. Body text contrast too low (multiple components)** — Opacity modifiers like `/60` and `/70` drop contrast below WCAG AA 4.5:1. Affected files:
  - `hero.tsx:54` — subtitle `text-seafoam-800/60`
  - `services-block.tsx:44` — description `text-seafoam-700/60`
  - `pricing-block.tsx:84` — description `text-seafoam-700/60`
  - `cta-block.tsx:33` — description `text-seafoam-700/60`
  - `testimonials-block.tsx:46` — quote `text-white/70`
  - `about-block.tsx:84` — body `text-seafoam-700/70`
  - Fix: bump to full opacity or `/80` minimum.

- [x] **4. Footer text nearly invisible** — Copyright uses `text-seafoam-400/30`, description uses `text-seafoam-300/50`, hours `text-seafoam-300/60` — all far below contrast minimums on `bg-seafoam-900`. Fix: minimum `text-seafoam-300` for body, `text-seafoam-400` for copyright.

- [x] **5. Hero + About images use raw `<img>` instead of Next.js `<Image>`** — `hero.tsx:129` and `about-block.tsx:29-59` use `<img>`, missing lazy loading, responsive srcset, CLS prevention, and WebP/AVIF optimization.

---

## HIGH (Priority 3-5)

- [x] **6. Hardcoded phone number in service detail** — `service-detail.tsx` lines 52, 116, 117, 253 hardcode `(555) 012-3456` instead of pulling from `clinicInfo`. Component doesn't accept `clinicInfo` as a prop.

- [x] **7. Hardcoded `/contact` links in service detail** — `service-detail.tsx` lines 48, 112, 249 use `/contact` instead of the CMS `bookingUrl`.

- [x] **8. No `<main>` landmark or `id="main-content"`** — Already present in `layout.tsx`.

- [ ] **9. Pricing table not semantically accessible** — `pricing-block.tsx` uses `div` grids instead of `<table>` elements. Screen readers cannot parse column relationships. Use semantic table markup or ARIA table roles.

- [ ] **10. Service marquee has no pause mechanism** — Infinite CSS animation with no hover-pause or pause button. Violates WCAG 2.2.2 (Pause, Stop, Hide). Add `animation-play-state: paused` on hover and a pause button.

- [x] **11. Menu items use `<a>` instead of Next.js `<Link>`** — `header.tsx` lines 33 and 89-97 use raw `<a>` for internal navigation, causing full page reloads instead of client-side routing.

- [ ] **12. About block doesn't handle missing images** — `about-block.tsx:27-65` renders empty colored boxes with no fallback content when images aren't uploaded.

---

## MEDIUM (Priority 6-8)

- [x] **13. No favicon or web manifest** — Already has `icon.svg` and `apple-icon.png` via Next.js file convention. Not an issue.

- [x] **14. About stats grid breaks on 4 items** — `about-block.tsx:92` uses `grid-cols-3` but supports up to 4 stats. 4th item wraps to new row unbalanced. Fix: `grid-cols-2 sm:grid-cols-4` or limit to 3.

- [ ] **15. Star ratings not announced to screen readers** — `testimonials-block.tsx:38-44` star icons have no `aria-label`. Add `role="img" aria-label="X out of 5 stars"` on the container.

- [ ] **16. No empty state for blocks with no content** — Services, testimonials, pricing blocks render blank when arrays are empty. Add defensive empty states.

- [ ] **17. Service card heights not equalized** — `services-block.tsx:53` cards use `flex flex-col` but price/details row can sit at different vertical positions across the row.

- [ ] **18. CTA buttons lack screen reader differentiation** — `cta-block.tsx:38-56` two buttons differ only visually. Add descriptive `aria-label` attributes.

- [ ] **19. Service detail hardcodes trust stats** — `service-detail.tsx:184-192` stats like "5,000+ Pets treated" are hardcoded strings, not CMS-managed. Will become stale.

---

## LOW (Suggestions)

- [ ] **20. Add sticky mobile CTA on service pages** — Long scrolling content with no fixed booking bar. A sticky bottom "Book Now" + phone button on mobile would improve conversion.

- [ ] **21. Add LocalBusiness JSON-LD structured data** — `LocalBusiness` / `VeterinaryService` schema markup for local SEO and Google rich results (hours, pricing, reviews).

- [ ] **22. Link testimonials to Google/Yelp source** — Showing review platform badges increases trust for local service businesses.

- [ ] **23. Add floating "Call Now" button on mobile** — Phone calls are a primary conversion action for local businesses. A sticky phone icon on mobile is a standard pattern.

- [ ] **24. Add FAQ accordion block** — For SEO and user trust, answering common questions ("Walk-ins?", "Payment plans?", "Insurance?") serves both search engines and first-time visitors.
