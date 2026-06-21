# AI Summit Sydney 2026 — Project Onboarding

## Project Overview
A **pure static website** (HTML/CSS/JS, no build step, no framework) for **AI Summit Sydney 2026** — a flagship business, technology and investment summit for the whole AI economy.

- **Name**: AI Summit Sydney 2026 (中文: 2026 悉尼人工智能峰会). *Renamed from the earlier "AI Application Summit" — do not reintroduce the old name.*
- **Theme**: Powering Australia's AI Economy — "From Energy to Intelligence. From Compute to Capital."
- **Date**: 14 August 2026
- **Venue**: Sydney, Australia (final venue TBC — ICC is no longer asserted)
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
3. About (positioning + "At a glance" facts)
4. Framework — the **six layers** of the AI ecosystem (Governance & Policy,
   Energy, Infrastructure & Compute, AI Applications, Smart Technology,
   Capital & Investment)
5. Agenda — a full **timed timeline** (08:30→18:00, ~16 sessions)
6. Speakers grid (JS-injected from array, real photos in `assets/speakers/`, indicative)
7. Tickets (3 cards + Eventbrite/Luma platform buttons)
8. Contact (3 cards + email)
9. Footer

**Removed on purpose** (do not re-add without asking): Stats bar, "Three
Experiences" cards, "Why Attend / What You'll Gain", **Sponsorship** (the
sponsorship kit must NOT be published on the site), and the Partners logo wall.

**Positioning note:** this is the AI *economy* / ecosystem framing (policy,
energy, compute, applications, smart tech, capital) — not the older
"AI applications for SMEs" framing. Source of truth is the organiser's Final
brochure (kept locally, git-ignored).

### Bilingual i18n (EN/中文) — two static pages, for SEO
- Each language is its own **fully-crawlable static page**: `/` (`index.html`, English,
  the source of truth) and `/zh.html` (Chinese, **generated**).
- Chinese strings live in `site/i18n/zh.json` (keyed by `data-i18n="..."`), incl. a
  `_seo` block for the zh `<title>`/description/OG.
- `site/tools/build-zh.mjs` bakes `zh.json` into `zh.html` (lang, head SEO, hreflang,
  toggle flip, every `data-i18n` innerHTML). Run `cd site && node tools/build-zh.mjs`
  after editing `index.html` or `zh.json`.
- The header EN/中文 button is a plain `<a>` link between the two pages — **no
  client-side text swapping** (so crawlers, incl. Baidu, see real Chinese HTML).
- `main.js` only reads `document.documentElement.lang` (startsWith "zh") to pick the
  language for the JS-rendered speaker cards.
- hreflang on both pages: `en`→`/`, `zh-Hans`→`/zh.html`, `x-default`→`/`; sitemap lists both.

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
1. **Speaker titles** — Sachin Shah, Simon Kriss and Yu Liu have photos but placeholder roles ("Profile to be confirmed"); add real titles in the `SPEAKERS` array when known.
2. **WeChat share poster** — add a "生成分享海报" button (Canvas) for WeChat sharing (WeChat ignores OG previews).
3. **Final venue** — currently "Sydney, Australia"; update hero/about/contact/footer + JSON-LD once the venue is confirmed.
4. **Remaining assets** — AFN logo and event photography when available.
5. **Social share buttons** — not yet implemented (LinkedIn, Twitter/X, email, etc.).

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
