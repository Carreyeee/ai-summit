# AI Application Summit Sydney 2026 — Project Onboarding

## Project Overview
A **pure static website** (HTML/CSS/JS, no build step, no framework) for the **AI Application Summit Sydney 2026** — a premium, application-led AI business summit.

- **Date**: 14 August 2026
- **Venue**: ICC Sydney
- **Organiser**: Australian Financial News (AFN)
- **Live URL**: https://aisummit-weld.vercel.app
- **Hosting**: Vercel (static deployment from `site/` folder)

## Architecture

### Single-page design
One `index.html` with smooth-scroll anchor navigation. Sections in order:
1. Sticky nav (lang toggle + Register CTA)
2. Hero (countdown timer, CTAs)
3. Stats bar (5 animated metrics)
4. About
5. Three experiences (morning/afternoon/evening cards)
6. Why Now + Key Questions
7. Agenda (3 blocks: morning/afternoon/evening)
8. Speakers grid (JS-injected from array)
9. Why Attend (6 gain cards + who should attend)
10. Tickets (3 cards with early-bird/standard toggle)
11. Sponsorship (5 tiers + special opportunities + target categories)
12. Partners logo wall
13. Contact (3 cards + email)
14. Footer

### Bilingual i18n (EN/中文)
- English is the default in HTML
- Chinese translations stored in `ZH` dictionary in `main.js` (~150 keys)
- All translatable elements have `data-i18n="key"` attributes
- `applyLang(lang)` swaps text; persisted via `localStorage('ai-summit-lang')`
- Missing ZH keys gracefully fall back to English

### Eventbrite Integration
- `CONFIG.eventbriteUrl` at the top of `main.js` — centralized URL (currently **empty string**)
- 5 purchase CTAs have `data-buy` attribute; when URL is set, all auto-wire to Eventbrite with `target=_blank`
- When empty, buttons do nothing (fallback state for pre-launch)

## File Structure

```
ai_summit/
├── site/                          # Deployable root
│   ├── index.html                 # Single-page site (~565 lines)
│   ├── css/
│   │   └── styles.css             # Full design system (~436 lines)
│   ├── js/
│   │   └── main.js                # Interactions + i18n (~370 lines)
│   ├── assets/
│   │   ├── favicon.svg            # 64x64 rounded square, blue gradient + "AI"
│   │   ├── skyline.svg            # Sydney skyline silhouette (Opera House, Bridge, CBD)
│   │   └── share-card.png         # 1200x630 OG share image for social media
│   └── .vercel/                   # Vercel project config
│       └── project.json
├── .claude/
│   └── launch.json                # Preview server: python -m http.server 8123 --directory site
└── [source files]                 # Reference docs (docx/pdf), not part of site
```

## Tech Stack & Design System

- **Fonts**: Space Grotesk (display) + Inter (body) via Google Fonts
- **Brand colours** (CSS custom properties):
  - `--navy-900: #060f33` (darkest bg)
  - `--navy-800: #0a1747` (card bg)
  - `--blue-500: #1e50c8` (primary accent)
  - `--cyan-300: #6fd0ff` (highlight text)
  - `--gold: #f2c14e` (CTAs, badges)
- **Responsive breakpoints**: 1024px, 860px (mobile nav), 480px
- **Animations**: scroll-reveal via IntersectionObserver (`.reveal` → `.reveal.in`), animated stat counters, countdown timer targeting `2026-08-14T09:00:00+10:00`
- **Mobile**: full-screen nav overlay, single-column grids, reordered ticket cards

## Key JS Patterns

- `SPEAKERS` array: 8 speakers with `name`, `initials`, gradient colours, bilingual `role`/`org`
- `renderSpeakers(lang)` — dynamic speaker grid with avatar gradients
- `renderLogos()` — partner logo placeholders
- `initTicketToggle()` — early-bird/standard price toggle with fade transition
- `initCountdown()` — live countdown to event date
- `initTicketing()` — wires `[data-buy]` buttons to Eventbrite when URL is configured

## Deployment

```bash
cd site
npx vercel --prod --yes
```

Vercel aliases:
- **https://aisummit-weld.vercel.app** (shortest, use this for sharing)
- https://aisummit-jinkairuihappy-gmailcoms-projects.vercel.app

## Open Graph / Social Sharing
- `og:title`, `og:description`, `og:image`, `og:url` tags configured in `<head>`
- Share card image at `assets/share-card.png` (1200×630)
- Note: WeChat does NOT show OG previews for pasted links — need a "generate share poster" feature (Canvas-based) for WeChat sharing

## Known TODOs
1. **WeChat share poster** — add a "生成分享海报" button that uses Canvas to create a saveable poster image for WeChat sharing
2. **Eventbrite URL** — fill in `CONFIG.eventbriteUrl` in `main.js` before official launch
3. **Placeholder assets** — replace with real materials when available:
   - Speaker photos (currently gradient avatars with initials)
   - Sponsor/partner logos (currently placeholder boxes)
   - AFN logo
   - Event photography
4. **Social share buttons** — not yet implemented (LinkedIn, Twitter/X, email, etc.)

## Local Preview
```bash
python -m http.server 8123 --directory site
# Then open http://localhost:8123
```

## Source Reference Files
Located in project root (read-only, not deployed):
- `2026悉尼人工智能商业应用峰会手册中文版.docx` — Chinese handbook
- `AI_Summit_2026_Delegate_Invitation_Ticket_Guide_5.12.docx` — English delegate/ticket guide
- `AI_Summit_2026_Sydney_Brochure by AFN.pdf` — 17-page image-based brochure
- `AI_Summit_2026_Sydney_Sponsorship Kit.pdf` — 15-page image-based sponsorship kit
