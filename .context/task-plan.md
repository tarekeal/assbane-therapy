# Assbane Therapy — Task Plan

**Project**: Assbane Therapy website  
**Stack**: Next.js (App Router), shadcn/ui, Tailwind CSS  
**Languages**: French (primary), Dutch, English  
**Date**: 2026-04-01  

---

## Dependency Graph (summary)

```
T-01 (scaffold)
  └─ T-02 (i18n)
       └─ T-03 (design tokens)
            ├─ T-04 (nav + language switcher)
            │    └─ T-05 (footer)
            │         ├─ T-06 (hero section)
            │         ├─ T-07 (services card grid)
            │         ├─ T-08 (team preview)
            │         ├─ T-09 (testimonials)
            │         ├─ T-10 (FAQ accordion)
            │         ├─ T-11 (CTA banner)
            │         ├─ T-12 (contact info block)
            │         ├─ T-13 (services detail page)
            │         ├─ T-14 (about page)
            │         └─ T-15 (contact page)
            │              ├─ T-16 (page assembly + routing)
            │              ├─ T-17 (SEO metadata)
            │              ├─ T-18 (booking CTA integration)
            │              ├─ T-19 (responsive QA)
            │              ├─ T-20 (accessibility audit)
            │              └─ T-21 (content review)
```

---

## Phase 1 — Setup & Scaffold

---

## Task 1: Initialize Next.js project with App Router
**Priority**: P0  
**Complexity**: S  
**Suggested agent**: backend-engineer  
**Depends on**: None  
**Acceptance Criteria**:
- [ ] `npx create-next-app@latest` run with TypeScript, Tailwind CSS, App Router, and `src/` directory options enabled
- [ ] shadcn/ui initialized (`npx shadcn@latest init`) with a neutral base color and CSS variables enabled
- [ ] `.gitignore`, `tsconfig.json`, `tailwind.config.ts`, and `next.config.ts` present and valid
- [ ] `npm run dev` starts the dev server without errors on `localhost:3000`
- [ ] `npm run build` completes without TypeScript or lint errors
- [ ] Project committed to a `main` branch on a new git repository

---

## Task 2: Set up next-intl for trilingual i18n (FR/NL/EN)
**Priority**: P0  
**Complexity**: M  
**Suggested agent**: backend-engineer  
**Depends on**: Task 1  
**Acceptance Criteria**:
- [ ] `next-intl` installed and configured with App Router conventions (middleware + `[locale]` segment)
- [ ] Supported locales are `fr`, `nl`, `en`; default locale is `fr`
- [ ] Locale detection via `Accept-Language` header with cookie-based override
- [ ] Translation JSON files scaffolded at `messages/fr.json`, `messages/nl.json`, `messages/en.json` with placeholder keys covering all content sections (hero, services, team, testimonials, faq, cta, contact, nav, footer)
- [ ] `useTranslations` hook resolves keys correctly in a smoke-test Server Component
- [ ] URL structure is `/{locale}/...` (e.g., `/fr/`, `/nl/about`, `/en/contact`)
- [ ] 404 for unknown locales handled by middleware redirect to `/fr`

---

## Task 3: Define design tokens and Tailwind theme
**Priority**: P0  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 1  
**Acceptance Criteria**:
- [ ] Brand color palette defined in `tailwind.config.ts` under `theme.extend.colors` (primary, secondary, neutral, background, surface, error)
- [ ] Typography scale defined: font family (e.g., Inter or a humanist sans-serif loaded via `next/font`), sizes, weights, and line heights
- [ ] Spacing and border-radius tokens consistent with shadcn/ui CSS variable convention
- [ ] A `globals.css` file applies the base design tokens via CSS custom properties
- [ ] A `Storybook`-style visual reference page (or Tailwind playground route at `/dev/tokens`) shows all colors, type styles, and spacing values — for agent reference only, excluded from production build

---

## Phase 2 — Core Components

---

## Task 4: Build navigation bar with language switcher
**Priority**: P0  
**Complexity**: M  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 2, Task 3  
**Acceptance Criteria**:
- [ ] Responsive nav renders logo (text placeholder), links (Home, Services, About, Contact), and language switcher
- [ ] Language switcher is a dropdown or tab group showing `FR`, `NL`, `EN`; selecting a locale navigates to the equivalent page in the new locale without losing the current path
- [ ] Active link is visually distinguished (underline or color)
- [ ] Mobile: nav collapses into a hamburger menu; drawer opens/closes without layout shift
- [ ] Nav is a Server Component; the hamburger toggle is a minimal `'use client'` island
- [ ] All nav labels and ARIA labels come from i18n translation keys
- [ ] Keyboard navigation: tab order is logical, hamburger toggle is focusable, drawer closes on `Escape`
- [ ] Nav passes axe-core WCAG 2.1 AA checks (no violations)

---

## Task 5: Build footer
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 2, Task 3  
**Acceptance Criteria**:
- [ ] Footer displays: practice name and tagline, quick links (same pages as nav), address, phone, email, and opening hours summary
- [ ] Social media icon links (placeholder hrefs) with `aria-label` attributes
- [ ] Copyright line with current year (dynamically rendered)
- [ ] All text strings come from i18n translation keys
- [ ] Responsive: single column on mobile, two or three columns on desktop
- [ ] Passes WCAG 2.1 AA contrast and focus checks

---

## Phase 3 — Page Sections

---

## Task 6: Build hero section
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 4, Task 5  
**Acceptance Criteria**:
- [ ] Hero renders a full-width section with headline, subheadline, and primary CTA button ("Book an appointment")
- [ ] Background uses a placeholder image via `next/image` with `priority` prop set (LCP optimization) and a descriptive `alt` text from i18n
- [ ] CTA button links to the Contact page (internal) or an external booking URL (placeholder `#book`)
- [ ] All copy (headline, subheadline, CTA label) comes from i18n translation keys
- [ ] Responsive: stacks vertically on mobile, side-by-side on desktop
- [ ] Heading is an `<h1>` — only one per page

---

## Task 7: Build services card grid (home page overview)
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 4, Task 5  
**Acceptance Criteria**:
- [ ] Grid renders 4–6 service cards (Physiotherapy, Psychology, Medical Pedicure, plus additional placeholders)
- [ ] Each card shows: icon (SVG placeholder), service name, one-line description, and a "Learn more" link to the Services page
- [ ] Cards use shadcn/ui `Card` component
- [ ] Service data is sourced from a typed constant in `lib/data/services.ts` — not hardcoded in JSX
- [ ] All visible strings come from i18n translation keys
- [ ] Grid is 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Cards have visible focus ring for keyboard users

---

## Task 8: Build team preview section
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 4, Task 5  
**Acceptance Criteria**:
- [ ] Section shows 1–3 team member cards (founder Salah Assbane plus placeholders)
- [ ] Each card shows: photo (placeholder via `next/image`), name, role/title, and short bio
- [ ] "Meet the full team" link routes to the About page
- [ ] All strings come from i18n translation keys
- [ ] Photos have descriptive `alt` text from i18n
- [ ] Responsive: single column on mobile, multi-column on desktop

---

## Task 9: Build testimonials section
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 4, Task 5  
**Acceptance Criteria**:
- [ ] Section renders 2–4 testimonial cards with: quote text, patient first name or initials, and service received
- [ ] Testimonial data sourced from a typed constant in `lib/data/testimonials.ts`
- [ ] All visible strings come from i18n translation keys
- [ ] Section uses `<blockquote>` elements semantically
- [ ] On mobile, cards stack vertically; on desktop, 2-column grid or horizontal scroll carousel (using shadcn/ui `Carousel` if carousel is chosen)
- [ ] No autoplay on carousel if used (accessibility requirement)

---

## Task 10: Build FAQ accordion section
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 4, Task 5  
**Acceptance Criteria**:
- [ ] FAQ renders 5–8 questions using shadcn/ui `Accordion` component
- [ ] Questions and answers sourced from `lib/data/faq.ts` typed constant, keyed by i18n translation key
- [ ] All strings come from i18n translation keys
- [ ] Single item open at a time (type `"single"`)
- [ ] Accordion items use `<h3>` for question triggers
- [ ] Passes keyboard interaction: `Enter`/`Space` to toggle, arrow keys to move between items
- [ ] WCAG 2.1 AA: no contrast failures, `aria-expanded` states present

---

## Task 11: Build CTA banner section
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 4, Task 5  
**Acceptance Criteria**:
- [ ] Full-width banner with: heading, supporting sentence, and a prominent "Book an appointment" button
- [ ] Background uses brand primary color with sufficient contrast on text (WCAG AA: ≥4.5:1 for normal text)
- [ ] CTA button links to `#book` placeholder (same target as hero CTA)
- [ ] All strings come from i18n translation keys
- [ ] Reusable as a component so it can appear on Services and About pages too

---

## Task 12: Build contact info block
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 4, Task 5  
**Acceptance Criteria**:
- [ ] Block displays: physical address (Molenbeek, Brussels), phone number as a `tel:` link, email as a `mailto:` link, and opening hours table
- [ ] Address uses `<address>` HTML element
- [ ] Opening hours are structured as a definition list or table with proper `<th>` labels
- [ ] All strings come from i18n translation keys
- [ ] Component is reusable (used on both Home and Contact pages)

---

## Task 13: Build Services detail page sections
**Priority**: P1  
**Complexity**: M  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 7  
**Acceptance Criteria**:
- [ ] Page at `[locale]/services` renders one section per service in an alternating row layout (image left / text right, then image right / text left)
- [ ] Each service section contains: service name (`<h2>`), detailed description (2–4 paragraphs), a benefits list, and a "Book this service" CTA
- [ ] Service data extended from `lib/data/services.ts` to include long description and benefits fields
- [ ] Images use `next/image` with descriptive `alt` text from i18n
- [ ] All strings come from i18n translation keys
- [ ] Responsive: image and text stack vertically on mobile; alternating side-by-side on desktop

---

## Task 14: Build About page sections
**Priority**: P1  
**Complexity**: M  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 8  
**Acceptance Criteria**:
- [ ] Page at `[locale]/about` contains three sections: founder story, full team profiles, and "how it works" steps
- [ ] Founder story: photo, biographical text, and mission statement — all from i18n
- [ ] Team profiles: grid of cards with photo, name, role, and short bio; data from `lib/data/team.ts`
- [ ] "How it works": numbered steps (3–5) rendered as a visually distinct timeline or step list
- [ ] All strings come from i18n translation keys
- [ ] Page ends with the reusable CTA banner (Task 11)
- [ ] Responsive on all breakpoints

---

## Task 15: Build Contact page
**Priority**: P1  
**Complexity**: M  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 12  
**Acceptance Criteria**:
- [ ] Page at `[locale]/contact` contains: contact form, Google Maps embed, and contact info block (Task 12)
- [ ] Contact form fields: name, email, phone (optional), subject (dropdown: appointment request, general inquiry, other), message, and submit button
- [ ] Form uses `react-hook-form` + `zod` for client-side validation; errors shown inline with `aria-describedby` linking field to error message
- [ ] Form submits to a Next.js Server Action; server returns success or error state without full page reload
- [ ] Google Maps embed uses an `<iframe>` with `title` attribute; address is Molenbeek, Brussels
- [ ] All form labels and error messages come from i18n translation keys
- [ ] Contact info block reused from Task 12
- [ ] Form is keyboard-navigable and screen-reader-friendly

---

## Phase 4 — Integration

---

## Task 16: Assemble pages and configure routing
**Priority**: P0  
**Complexity**: M  
**Suggested agent**: backend-engineer  
**Depends on**: Task 6, Task 7, Task 8, Task 9, Task 10, Task 11, Task 12, Task 13, Task 14, Task 15  
**Acceptance Criteria**:
- [ ] App Router structure: `src/app/[locale]/page.tsx` (Home), `.../services/page.tsx`, `.../about/page.tsx`, `.../contact/page.tsx`
- [ ] Each page composes the correct section components in the correct order
- [ ] Layout at `src/app/[locale]/layout.tsx` wraps all pages with Nav and Footer
- [ ] `generateStaticParams` exports the three locales so all locale variants are statically generated at build time
- [ ] Navigation links between pages work correctly in all three locales (no 404s)
- [ ] `npm run build` produces no errors; all four routes per locale (12 total) are listed in build output

---

## Task 17: Add SEO metadata per page and per locale
**Priority**: P0  
**Complexity**: M  
**Suggested agent**: backend-engineer  
**Depends on**: Task 16  
**Acceptance Criteria**:
- [ ] Each page exports a `generateMetadata` function returning locale-specific `title`, `description`, `keywords`, and `openGraph` fields
- [ ] `title` follows the pattern: `{Page Name} | Assbane Therapy` and comes from i18n keys
- [ ] `description` is 150–160 characters, benefit-led, and localized per language
- [ ] `openGraph` includes `title`, `description`, `locale`, `type: 'website'`, and a placeholder `images` URL
- [ ] `<html lang="{locale}">` is set correctly on the root layout via the `locale` segment
- [ ] `hreflang` alternate links are set for all locale variants of each page (using Next.js `alternates.languages` in metadata)
- [ ] `robots` meta allows indexing for all production pages
- [ ] `canonical` URL is set per page/locale combination

---

## Task 18: Integrate appointment booking CTA
**Priority**: P1  
**Complexity**: S  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 16  
**Acceptance Criteria**:
- [ ] A single `NEXT_PUBLIC_BOOKING_URL` environment variable controls the booking destination (defaults to `/contact` if not set)
- [ ] All CTA buttons (hero, CTA banner, service sections) use this value for their `href`
- [ ] If `NEXT_PUBLIC_BOOKING_URL` is an external URL, the link opens in a new tab with `rel="noopener noreferrer"`
- [ ] `.env.example` documents the variable with a comment
- [ ] No booking URL is hardcoded in component JSX

---

## Phase 5 — Polish

---

## Task 19: Responsive design QA across breakpoints
**Priority**: P1  
**Complexity**: M  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 16  
**Acceptance Criteria**:
- [ ] All pages tested at: 375px (mobile S), 430px (mobile L), 768px (tablet), 1024px (laptop), 1440px (desktop)
- [ ] No horizontal scrollbar at any breakpoint
- [ ] Text is legible (no overflow, no truncation without ellipsis) at all breakpoints
- [ ] Touch targets (buttons, links) are at least 44×44px on mobile
- [ ] Images never exceed their containers; `next/image` `sizes` prop is set appropriately per component
- [ ] Nav hamburger menu tested on 375px: opens, closes, links navigate correctly
- [ ] FAQ accordion tested on mobile: items expand/collapse without layout shift

---

## Task 20: Accessibility audit and remediation (WCAG 2.1 AA)
**Priority**: P0  
**Complexity**: M  
**Suggested agent**: frontend-engineer  
**Depends on**: Task 19  
**Acceptance Criteria**:
- [ ] axe-core browser extension (or `@axe-core/react` in dev) reports zero critical or serious violations on all four pages in all three locales
- [ ] Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text and UI components, verified with a contrast checker
- [ ] All interactive elements have visible focus indicators (not just `:focus` but `:focus-visible`)
- [ ] All images have non-empty `alt` text; decorative images have `alt=""`
- [ ] Form inputs have associated `<label>` elements (not just placeholder text)
- [ ] Page has a logical heading hierarchy (one `<h1>`, logical `<h2>`/`<h3>` nesting)
- [ ] Skip-to-content link is the first focusable element on every page
- [ ] Google Maps iframe has a descriptive `title` attribute
- [ ] No keyboard trap anywhere on the site

---

## Task 21: Trilingual content review and placeholder replacement
**Priority**: P1  
**Complexity**: M  
**Suggested agent**: content-writer  
**Depends on**: Task 17  
**Acceptance Criteria**:
- [ ] All placeholder text in `messages/fr.json`, `messages/nl.json`, `messages/en.json` replaced with real, localized copy approved by the client (Salah Assbane)
- [ ] French copy reviewed by a native FR speaker; Dutch copy reviewed by a native NL speaker
- [ ] CTAs are transcreated per locale (not word-for-word translated)
- [ ] Service descriptions accurately reflect the practice's actual offerings
- [ ] Team bios and founder story approved by Salah Assbane
- [ ] Opening hours, phone number, email, and address are verified as correct
- [ ] No untranslated English strings appear in the FR or NL locale builds
- [ ] All image `alt` texts reviewed for accuracy and locale appropriateness

---

## Summary

| Task | Title | Phase | Priority | Complexity | Suggested Agent |
|------|-------|-------|----------|------------|-----------------|
| T-01 | Initialize Next.js project | Setup | P0 | S | backend-engineer |
| T-02 | Set up next-intl i18n | Setup | P0 | M | backend-engineer |
| T-03 | Design tokens and Tailwind theme | Setup | P0 | S | frontend-engineer |
| T-04 | Navigation bar + language switcher | Core | P0 | M | frontend-engineer |
| T-05 | Footer | Core | P1 | S | frontend-engineer |
| T-06 | Hero section | Sections | P1 | S | frontend-engineer |
| T-07 | Services card grid | Sections | P1 | S | frontend-engineer |
| T-08 | Team preview section | Sections | P1 | S | frontend-engineer |
| T-09 | Testimonials section | Sections | P1 | S | frontend-engineer |
| T-10 | FAQ accordion section | Sections | P1 | S | frontend-engineer |
| T-11 | CTA banner section | Sections | P1 | S | frontend-engineer |
| T-12 | Contact info block | Sections | P1 | S | frontend-engineer |
| T-13 | Services detail page | Sections | P1 | M | frontend-engineer |
| T-14 | About page sections | Sections | P1 | M | frontend-engineer |
| T-15 | Contact page | Sections | P1 | M | frontend-engineer |
| T-16 | Page assembly and routing | Integration | P0 | M | backend-engineer |
| T-17 | SEO metadata per page + locale | Integration | P0 | M | backend-engineer |
| T-18 | Booking CTA integration | Integration | P1 | S | frontend-engineer |
| T-19 | Responsive design QA | Polish | P1 | M | frontend-engineer |
| T-20 | Accessibility audit + remediation | Polish | P0 | M | frontend-engineer |
| T-21 | Content review + placeholder replacement | Polish | P1 | M | content-writer |

**Total tasks**: 21  
**Size distribution**: 10 × S, 11 × M  
**Estimated effort**: ~30–40 agent-hours across parallel tracks  
**Critical path**: T-01 → T-02 → T-04 → T-16 → T-17 → T-20
