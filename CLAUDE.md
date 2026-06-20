# AI Application Summit Sydney 2026 — Project Onboarding

## Project Overview
A **pure static website** (HTML/CSS/JS, no build step, no framework) for the **AI Application Summit Sydney 2026** — a premium, application-led AI business summit.

- **Date**: 14 August 2026
- **Venue**: ICC Sydney
- **Organiser**: Australian Financial News (AFN)
- **Live URL**: https://aisummit-weld.vercel.app
- **Hosting**: Vercel (static deployment from `site/` folder)

## Architecture

### Single-page design (lean landing page)
One `index.html` with smooth-scroll anchor navigation. The page was deliberately
trimmed to a lean landing page (organiser brief: "just the basics, update later").
Sections in order:
1. Sticky nav (lang toggle + Register CTA)
2. Hero — cinematic: video background (`assets/hero.mp4`) over an animated
   neural-network `<canvas>` fallback, countdown timer, CTAs
3. About (theme + "At a glance" facts)
4. Why Now (four concrete business questions)
5. Agenda (3 blocks: morning/afternoon/evening)
6. Speakers grid (JS-injected from array, indicative)
7. Tickets (3 cards + Eventbrite/Luma platform buttons)
8. Contact (3 cards + email)
9. Footer

**Removed on purpose** (do not re-add without asking): Stats bar, "Three
Experiences" cards, "Why Attend / What You'll Gain", **Sponsorship** (the
sponsorship kit must NOT be published on the site), and the Partners logo wall.

### Bilingual i18n (EN/中文)
- English is the default in HTML
- Chinese translations stored in `ZH` dictionary in `main.js` (~90 keys)
- All translatable elements have `data-i18n="key"` attributes
- `applyLang(lang)` swaps text; persisted via `localStorage('ai-summit-lang')`
- Missing ZH keys gracefully fall back to English

### Ticketing (Eventbrite + Luma)
- `CONFIG.eventbriteUrl` / `CONFIG.lumaUrl` at the top of `main.js`.
- All `[data-buy]` CTAs auto-wire to Eventbrite (`target=_blank`). Eventbrite is **live**.
- The `[data-luma]` button shows "coming soon" until `CONFIG.lumaUrl` is set — paste the
  URL and it activates automatically (label locks to "Luma" via `data-i18n-lock`).

## File Structure

```
ai_summit/
├── site/                          # Deployable root
│   ├── index.html                 # Single-page landing site
│   ├── css/
│   │   └── styles.css             # Full design system
│   ├── js/
│   │   └── main.js                # Ticketing, i18n, countdown, hero canvas/video
│   ├── sitemap.xml                # SEO
│   ├── robots.txt                 # SEO (references sitemap)
│   ├── assets/
│   │   ├── favicon.svg            # blue gradient "AI" mark
│   │   ├── skyline.svg            # Sydney skyline silhouette
│   │   ├── hero.mp4               # cinematic hero background video (~4 MB, 720p)
│   │   └── share-card.png         # 1200x630 OG share image
│   └── .vercel/                   # Vercel project config
├── README.md                      # Human-facing guide (collaborators start here)
├── CLAUDE.md                      # This file (technical onboarding)
├── .claude/
│   └── launch.json                # Preview server config
└── [source files]                 # Reference docs (docx/pdf), git-ignored, not deployed
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
- **Animations**: scroll-reveal via IntersectionObserver (`.reveal` → `.reveal.in`), hero neural-network canvas + aurora drift, countdown timer targeting `2026-08-14T09:00:00+10:00`
- **Mobile**: full-screen nav overlay, single-column grids, reordered ticket cards

## Key JS Patterns

- `SPEAKERS` array: speakers with `name`, `initials`, gradient colours, bilingual `role`/`org`
- `renderSpeakers(lang)` — dynamic speaker grid with avatar gradients
- `initTicketToggle()` — early-bird/standard price toggle with fade transition
- `initCountdown()` — live countdown to event date
- `initTicketing()` — wires `[data-buy]` → Eventbrite and `[data-luma]` → Luma (when set)
- `initHeroCanvas()` / `initHeroVideo()` — animated hero background + autoplay-safe video fade-in

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
1. **Luma URL** — paste into `CONFIG.lumaUrl` in `main.js` when the Luma event is live.
2. **WeChat share poster** — add a "生成分享海报" button (Canvas) for WeChat sharing (WeChat ignores OG previews).
3. **Placeholder assets** — replace with real materials when available: speaker photos (currently gradient avatars), AFN logo, event photography.
4. **Social share buttons** — not yet implemented (LinkedIn, Twitter/X, email, etc.).

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
