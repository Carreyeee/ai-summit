/* =====================================================================
   AI Summit Sydney 2026 — interactions + i18n
   ===================================================================== */
(function () {
  "use strict";

  /* =====================================================================
     CONFIG — ticketing links.
       eventbriteUrl : every [data-buy] button (Register / Get Tickets /
                       Secure Your Ticket) opens this in a new tab.
       lumaUrl       : when set, the "Luma" button in the Tickets section
                       goes live; while empty it shows "coming soon".
     Just paste the Luma event URL below when you have it — nothing else
     to change.
     ===================================================================== */
  const CONFIG = {
    eventbriteUrl: "https://www.eventbrite.com.au/e/2026-tickets-1990168493538",
    lumaUrl: "https://luma.com/m86e2kod"
  };

  /* ---------- Speakers (easy to maintain) ----------
     photo: file in assets/speakers/. If it fails to load, the gradient +
     initials fallback shows automatically. Roles marked TBC are awaiting
     confirmed titles from the organiser. */
  const SPEAKERS = [
    { name: "Anoulack Chanthivong", initials: "AC", grad: ["#2f6bf0", "#0d2061"], photo: "anoulack-chanthivong.jpg",
      role_en: "Minister for Innovation, Science & Technology", org_en: "NSW Government",
      role_zh: "创新、科学与技术部长", org_zh: "新南威尔士州政府" },
    { name: "Daniel Roelink", initials: "DR", grad: ["#1b6fb8", "#08307a"], photo: "daniel-roelink.jpg",
      role_en: "Director, NSW AI Office", org_en: "Digital NSW",
      role_zh: "新南威尔士州人工智能办公室主任", org_zh: "Digital NSW" },
    { name: "Jack Zhang", initials: "JZ", grad: ["#2f8fe0", "#123089"], photo: "jack-zhang.jpg",
      role_en: "Founder", org_en: "Airwallex",
      role_zh: "创始人", org_zh: "Airwallex" },
    { name: "Katherine McConnell", initials: "KM", grad: ["#5b95ff", "#0d2061"], photo: "katherine-mcconnell.jpg",
      role_en: "Board Director", org_en: "Tech Council of Australia",
      role_zh: "董事", org_zh: "澳大利亚科技委员会" },
    { name: "Lee Hickin", initials: "LH", grad: ["#1e9ad6", "#0a2a6b"], photo: "lee-hickin.jpg",
      role_en: "Executive Director", org_en: "National AI Centre (Australia)",
      role_zh: "执行总监", org_zh: "澳大利亚国家人工智能中心" },
    { name: "Liming Zhu", initials: "LZ", grad: ["#2f6bf0", "#072a5e"], photo: "liming-zhu.png",
      role_en: "AI Lead, CSIRO Data61 · Professor", org_en: "UNSW",
      role_zh: "CSIRO Data61 人工智能负责人 · 教授", org_zh: "新南威尔士大学" },
    { name: "Niki Scevak", initials: "NS", grad: ["#3457c8", "#0a1747"], photo: "niki-scevak.jpg",
      role_en: "Co-founder & Partner", org_en: "Blackbird Ventures",
      role_zh: "联合创始人兼合伙人", org_zh: "Blackbird Ventures" },
    { name: "Sachin Shah", initials: "SS", grad: ["#2f6bf0", "#0a2a6b"], photo: "sachin-shah.jpg",
      role_en: "Speaker", org_en: "Profile to be confirmed",
      role_zh: "演讲嘉宾", org_zh: "详情待公布" },
    { name: "Simon Kriss", initials: "SK", grad: ["#1e9ad6", "#0d2061"], photo: "simon-kriss.jpg",
      role_en: "Speaker", org_en: "Profile to be confirmed",
      role_zh: "演讲嘉宾", org_zh: "详情待公布" },
    { name: "Yu Liu", initials: "YL", grad: ["#3457c8", "#123089"], photo: "yu-liu.jpg",
      role_en: "Speaker", org_en: "Profile to be confirmed",
      role_zh: "演讲嘉宾", org_zh: "详情待公布" }
  ];

  /* ---------- i18n ----------
     Each language is its own static page (/ = English, /zh.html = 中文) so the
     content is fully crawlable. The Chinese strings live in i18n/zh.json and are
     baked into zh.html by tools/build-zh.mjs — there is no client-side text swap.
     The language toggle in the header is a plain link between the two pages. */

  /* ---------- DOM helpers ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Render speakers ---------- */
  function renderSpeakers(lang) {
    const grid = $("#speakerGrid");
    if (!grid) return;
    grid.innerHTML = SPEAKERS.map(s => {
      const role = lang === "zh" ? s.role_zh : s.role_en;
      const org = lang === "zh" ? s.org_zh : s.org_en;
      const img = s.photo
        ? `<img src="assets/speakers/${s.photo}" alt="${s.name}" loading="lazy" onerror="this.remove()">`
        : "";
      return `
        <article class="speaker-card">
          <div class="speaker-photo" style="background:linear-gradient(150deg,${s.grad[0]},${s.grad[1]})">
            <span class="spk-initials" aria-hidden="true">${s.initials}</span>${img}
          </div>
          <div class="speaker-info">
            <h3>${s.name}</h3>
            <p class="role">${role}</p>
            <p class="org">${org}</p>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- Countdown ---------- */
  function initCountdown() {
    const root = $("#countdown");
    if (!root) return;
    // 14 Aug 2026, 09:00 Sydney (AEST, UTC+10)
    const target = new Date("2026-08-14T09:00:00+10:00").getTime();
    const out = {
      days: root.querySelector('[data-cd="days"]'),
      hours: root.querySelector('[data-cd="hours"]'),
      mins: root.querySelector('[data-cd="mins"]'),
      secs: root.querySelector('[data-cd="secs"]')
    };
    const pad = n => String(n).padStart(2, "0");
    function tick() {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      out.days.textContent = d;
      out.hours.textContent = pad(h);
      out.mins.textContent = pad(m);
      out.secs.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Scroll reveal ---------- */
  function initObservers() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      $$(".reveal").forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(el => io.observe(el));
  }

  /* ---------- Header scroll state ---------- */
  function initHeader() {
    const header = $("#siteHeader");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    const burger = $("#navBurger");
    const nav = $("#mainNav");
    if (!burger || !nav) return;
    const close = () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("a", nav).forEach(a => a.addEventListener("click", close));
  }

  /* ---------- Ticketing: Eventbrite (data-buy) + Luma (data-luma) ---------- */
  function initTicketing() {
    const eb = CONFIG.eventbriteUrl;
    if (eb) {
      $$("[data-buy]").forEach(a => {
        a.href = eb;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      });
    }
    // Luma: go live only when a URL is configured; otherwise stay "coming soon".
    const luma = CONFIG.lumaUrl;
    $$("[data-luma]").forEach(a => {
      if (luma) {
        a.href = luma;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.classList.remove("is-soon");
        a.removeAttribute("aria-disabled");
        a.textContent = "Luma";
      }
    });
  }

  /* ---------- Ticket price toggle ---------- */
  function initTicketToggle() {
    const btns = $$(".pt-btn");
    if (!btns.length) return;
    btns.forEach(btn => btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      btns.forEach(b => b.classList.toggle("active", b === btn));
      $$(".ticket-price .amt").forEach(amt => {
        const v = amt.getAttribute("data-" + mode);
        if (v != null) { amt.style.opacity = "0"; setTimeout(() => { amt.textContent = v; amt.style.opacity = "1"; }, 130); }
      });
    }));
  }

  /* ---------- Hero: animated neural-network canvas ---------- */
  function initHeroCanvas() {
    const canvas = $("#heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 132;
    let w = 0, h = 0, pts = [], raf = null;
    const mouse = { x: -9999, y: -9999 };

    function build() {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(24, Math.min(96, Math.round((w * h) / 15000)));
      pts = [];
      for (let i = 0; i < n; i++) pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: reduce ? 0 : (Math.random() - 0.5) * 0.35,
        vy: reduce ? 0 : (Math.random() - 0.5) * 0.35
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const a of pts) {
        a.x += a.vx; a.y += a.vy;
        if (a.x <= 0 || a.x >= w) a.vx *= -1;
        if (a.y <= 0 || a.y >= h) a.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = "rgba(111,208,255," + (1 - d / LINK) * 0.45 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const mx = a.x - mouse.x, my = a.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
        if (md < 170) {
          ctx.strokeStyle = "rgba(95,149,255," + (1 - md / 170) * 0.55 + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = "rgba(170,214,255,.9)";
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, 6.2832); ctx.fill();
      }
    }
    function loop() { draw(); raf = requestAnimationFrame(loop); }
    function start() { if (!raf && !reduce) raf = requestAnimationFrame(loop); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    build(); draw(); start();

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); draw(); }, 150); }, { passive: true });
    const hero = canvas.closest(".hero");
    if (hero && !reduce) {
      hero.addEventListener("pointermove", e => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      }, { passive: true });
      hero.addEventListener("pointerleave", () => { mouse.x = -9999; mouse.y = -9999; });
    }
    document.addEventListener("visibilitychange", () => { document.hidden ? stop() : start(); });
  }

  /* ---------- Hero: fade in a real video if assets/hero.mp4 exists ---------- */
  function initHeroVideo() {
    const v = $("#heroVideo");
    if (!v) return;
    const src = v.querySelector("source");
    if (src) src.addEventListener("error", () => v.remove());

    let played = false;
    const tryPlay = () => {
      if (played) return;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => { played = true; v.classList.add("ready"); })
         .catch(() => { /* autoplay blocked — will retry on first user gesture */ });
      } else {
        played = true; v.classList.add("ready");
      }
    };

    // Try as soon as the browser thinks it can play, and again when frames are ready
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    // Try once immediately too (covers the case where the cached video is already playable)
    tryPlay();

    // Fallback: if the browser blocked muted-autoplay on first load, the first
    // user gesture (move/scroll/touch/key) starts it.
    const gestureRetry = () => {
      tryPlay();
      if (played) {
        document.removeEventListener("pointerdown", gestureRetry);
        document.removeEventListener("pointermove", gestureRetry);
        document.removeEventListener("scroll", gestureRetry);
        document.removeEventListener("keydown", gestureRetry);
        document.removeEventListener("touchstart", gestureRetry);
      }
    };
    document.addEventListener("pointerdown", gestureRetry, { passive: true });
    document.addEventListener("pointermove", gestureRetry, { passive: true });
    document.addEventListener("scroll", gestureRetry, { passive: true });
    document.addEventListener("keydown", gestureRetry);
    document.addEventListener("touchstart", gestureRetry, { passive: true });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const lang = (document.documentElement.lang || "").toLowerCase().startsWith("zh") ? "zh" : "en";
    renderSpeakers(lang); // speaker roles/orgs follow the page language (en / zh-Hans)
    initCountdown();
    initHeader();
    initNav();
    initTicketing();
    initTicketToggle();
    initHeroCanvas();
    initHeroVideo();
    initObservers();
  });
})();
