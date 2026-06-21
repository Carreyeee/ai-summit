# AI Summit Sydney 2026 — Website

The official landing page for **AI Summit Sydney 2026**, hosted by
**Australian Financial News (AFN)**.

- **Date:** 14 August 2026
- **Venue:** Sydney, Australia (final venue to be confirmed)
- **Theme:** Powering Australia's AI Economy — *From Energy to Intelligence. From Compute to Capital.*
- **Live site:** https://aisummit-weld.vercel.app
- **Tickets:** [Eventbrite](https://www.eventbrite.com.au/e/2026-tickets-1990168493538) · [Luma](https://luma.com/m86e2kod)

It's a **single static landing page** — no build step, no framework. Just HTML, CSS
and one JS file. Anyone can clone it and edit it with a text editor.

---

## Quick start (local preview)

```bash
# from the repo root
python3 -m http.server 8123 --directory site
# then open http://localhost:8123
```

That's it — no install, no dependencies. Edit a file, refresh the browser.

---

## Repo structure

```
ai_summit/
├── site/                     # ← everything that gets deployed lives here
│   ├── index.html            # the whole page (all content/sections)
│   ├── css/styles.css        # all styling
│   ├── js/main.js            # ticket links, bilingual text, countdown, hero animation
│   ├── sitemap.xml           # SEO
│   ├── robots.txt            # SEO
│   └── assets/               # favicon, hero video, share image, skyline
├── README.md                 # this file
└── CLAUDE.md                 # deeper technical notes
```

> Source PDFs/DOCX (brochure, sponsorship kit, handbook) are kept locally only and
> are **git-ignored** — they are not part of the website.

---

## How to update the common things

Everything below is a quick find-and-edit. Search for the text in the file shown.

| What | File | How |
|------|------|-----|
| **Date / venue / theme** | `site/index.html` | Edit the hero + "At a glance" + footer text. Also update the countdown date in `site/js/main.js` (`initCountdown`) and the `startDate` in the JSON-LD block in `index.html`. |
| **Six-layer framework** | `site/index.html` | Edit the `#framework` section (six `layer-card`s). |
| **Agenda** | `site/index.html` | Edit the `#agenda` timeline (`tl-item` rows: time + title + focus). |
| **Speakers** (indicative) | `site/js/main.js` | Edit the `SPEAKERS` array near the top — name, role, org (EN + ZH), and `photo` (a file in `site/assets/speakers/`). Cards render automatically; if a photo is missing it falls back to initials. |
| **Eventbrite link** | `site/js/main.js` | `CONFIG.eventbriteUrl`. |
| **Luma link** | `site/js/main.js` | `CONFIG.lumaUrl`. |
| **Ticket prices** | `site/index.html` | Edit the `data-early` / `data-standard` values in the `#tickets` cards. |
| **Contact details** | `site/index.html` | Edit the `#contact` section. |
| **SEO keywords** | `site/index.html` | Edit `<meta name="keywords">` and the description/OG tags in `<head>`. |

### Bilingual text (English / 中文)

English is written directly in `index.html`. The Chinese translation lives in the
`ZH` dictionary in `site/js/main.js`, keyed by the `data-i18n="..."` attribute on each
element. To change a piece of Chinese text, find its key in `ZH` and edit the value.
If a key is missing from `ZH`, the site simply falls back to English — safe by default.

---

## Deploy

The site auto-serves from the `site/` folder on Vercel.

```bash
cd site
npx vercel --prod --yes
```

Live aliases:
- **https://aisummit-weld.vercel.app** (use this one for sharing)
- https://aisummit-jinkairuihappy-gmailcoms-projects.vercel.app

---

## Contributing

1. Create a branch: `git checkout -b your-change`
2. Make your edit and preview locally (see Quick start).
3. Commit and push: `git push -u origin your-change`
4. Open a Pull Request on GitHub for review.

Small content fixes (a date, a name, a price) can go straight to `main` if you have
access — keep commits focused and described.

---

© 2026 Australian Financial News. All rights reserved.
