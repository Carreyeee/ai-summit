/* =====================================================================
   AI Application Summit Sydney 2026 — interactions + i18n
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
    lumaUrl: ""
  };

  /* ---------- Speakers (easy to maintain) ---------- */
  const SPEAKERS = [
    { name: "Anoulack Chanthivong", initials: "AC", grad: ["#2f6bf0", "#0d2061"],
      role_en: "Minister for Innovation, Science & Technology", org_en: "NSW Government",
      role_zh: "创新、科学与技术部长", org_zh: "新南威尔士州政府" },
    { name: "Daniel Roelink", initials: "DR", grad: ["#1b6fb8", "#08307a"],
      role_en: "Director, NSW AI Office", org_en: "Digital NSW",
      role_zh: "新南威尔士州人工智能办公室主任", org_zh: "Digital NSW" },
    { name: "Jihad Dib", initials: "JD", grad: ["#3a57d8", "#0a1747"],
      role_en: "Minister for AI Applications & Digital Transformation", org_en: "NSW Government",
      role_zh: "AI应用与数字化转型部长", org_zh: "新南威尔士州政府" },
    { name: "Jack Zhang", initials: "JZ", grad: ["#2f8fe0", "#123089"],
      role_en: "Founder", org_en: "Airwallex",
      role_zh: "创始人", org_zh: "Airwallex" },
    { name: "Katherine McConnell", initials: "KM", grad: ["#5b95ff", "#0d2061"],
      role_en: "Board Director", org_en: "Tech Council of Australia",
      role_zh: "董事", org_zh: "澳大利亚科技委员会" },
    { name: "Lee Hickin", initials: "LH", grad: ["#1e9ad6", "#0a2a6b"],
      role_en: "Executive Director", org_en: "National AI Centre (Australia)",
      role_zh: "执行总监", org_zh: "澳大利亚国家人工智能中心" },
    { name: "Liming Zhu", initials: "LZ", grad: ["#2f6bf0", "#072a5e"],
      role_en: "AI Lead, CSIRO Data61 · Professor", org_en: "UNSW",
      role_zh: "CSIRO Data61 人工智能负责人 · 教授", org_zh: "新南威尔士大学" },
    { name: "Niki Scevak", initials: "NS", grad: ["#3457c8", "#0a1747"],
      role_en: "Co-founder & Partner", org_en: "Blackbird Ventures",
      role_zh: "联合创始人兼合伙人", org_zh: "Blackbird Ventures" }
  ];

  /* ---------- Chinese dictionary (keys = data-i18n) ---------- */
  const ZH = {
    "brand.sub": "悉尼 2026 · 由 AFN 主办",
    "nav.about": "关于峰会", "nav.agenda": "议程",
    "nav.speakers": "嘉宾", "nav.tickets": "门票",
    "nav.contact": "联系", "nav.register": "立即注册",

    "hero.eyebrow": "澳大利亚财经见闻（AFN）呈献",
    "hero.title": "2026 悉尼人工智能<br>商业应用峰会",
    "hero.tagline": "让 AI 不再停留于概念，而是真正驱动增长。",
    "hero.date": "2026年8月14日", "hero.venue": "悉尼国际会议中心 ICC Sydney", "hero.host": "AFN 主办",
    "hero.cta1": "立即购票", "hero.cta2": "查看议程",
    "hero.scroll": "向下了解",
    "cd.days": "天", "cd.hours": "时", "cd.mins": "分", "cd.secs": "秒",

    "about.eyebrow": "关于", "about.title": "这不是又一场技术大会，而是一场真正划算的 AI 商业日。",
    "about.p1": "用聚焦的一天，看清 AI 到底能为销售、运营、客服与增长做什么——见到真正做事的人，带走一个方向，而不是又一个热词。",
    "about.p2": "为经营业务的人而办，而不只是为做模型的人。",
    "about.facts.title": "概览",
    "about.facts.host": "主办方", "about.facts.date": "日期", "about.facts.date.v": "2026年8月14日",
    "about.facts.venue": "地点", "about.facts.format": "形式",
    "about.facts.format.v": "完整一天——洞察、方案与高端社交",
    "about.facts.audience": "面向", "about.facts.audience.v": "中小企业、企业领袖、AI方案商、投资人与合作伙伴",

    "why.eyebrow": "为何是现在", "why.title": "AI 一日千里，而多数企业仍卡在同样的四个问题上。",
    "why.c1.t": "从哪里开始？", "why.c1.d": "AI 应该先切入业务的哪些环节。",
    "why.c2.t": "哪些工具适合我们？", "why.c2.d": "在海量平台中，找到真正匹配自身业务的那一个。",
    "why.c3.t": "真价值，还是炒作？", "why.c3.d": "看清 AI 在哪里带来真实回报，又在哪里只是烧钱。",
    "why.c4.t": "该信谁来落地？", "why.c4.d": "找到能安全部署、真正交付结果的服务商。",
    "why.kicker": "用聚焦的一天——省下数月的零散调研、选型困惑与错失的机会。",

    "agenda.eyebrow": "议程", "agenda.title": "峰会议程",
    "agenda.flow": "上午学习 · 下午探索 · 傍晚连接",
    "agenda.note": "议程为暂定内容，环节、时间与嘉宾以主办方最终确认为准。",
    "agenda.m.period": "上午", "agenda.m.theme": "洞察与领导力",
    "agenda.m1.t": "开幕主旨演讲", "agenda.m1.d": "企业AI应用的未来趋势。",
    "agenda.m2.t": "高管圆桌讨论", "agenda.m2.d": "AI如何重塑中小企业、提升运营效率与团队生产力。",
    "agenda.m3.t": "企业AI案例分享", "agenda.m3.d": "AI驱动业务效能提升的真实案例。",
    "agenda.m4.t": "AI商业方案展示", "agenda.m4.d": "助力增长的实用AI工具与解决方案。",
    "agenda.m5.t": "高管社交午宴", "agenda.m5.d": "面向领袖与VIP的精准连接。",
    "agenda.a.period": "下午", "agenda.a.theme": "方案探索与业务对接",
    "agenda.a1.t": "AI解决方案演示", "agenda.a1.d": "成熟AI工具与平台的现场展示，呈现真实业务应用。",
    "agenda.a2.t": "初创与创新展示", "agenda.a2.d": "新锐AI企业展示前沿方案与新技术。",
    "agenda.a3.t": "商务精准配对", "agenda.a3.d": "结构化对接，链接中小企业、AI服务商、投资人与战略伙伴。",
    "agenda.e.period": "傍晚", "agenda.e.theme": "社交酒会与机器人科技展",
    "agenda.e1.t": "美食美酒社交酒会", "agenda.e1.d": "在精致氛围中与嘉宾、赞助商、伙伴及VIP轻松交流。",
    "agenda.e2.t": "前沿机器人科技展", "agenda.e2.d": "现场体验尖端机器人、自动化系统与新兴AI技术。",

    "spk.eyebrow": "嘉宾阵容", "spk.title": "塑造澳大利亚AI未来的领袖",
    "spk.note": "已邀请 / 拟邀请嘉宾（按姓名首字母排序），名单持续更新，以最终确认为准。",

    "tix.eyebrow": "门票", "tix.title": "锁定早鸟门票",
    "tix.note": "早鸟价至2026年6月30日，售罄即止。",
    "tix.toggle.early": "早鸟价", "tix.toggle.standard": "标准价", "tix.from": "起",
    "tix.forum.t": "论坛门票", "tix.forum.d": "上午洞察 + 下午方案探索",
    "tix.cocktail.t": "社交酒会门票", "tix.cocktail.d": "傍晚社交酒会 + 机器人科技展",
    "tix.pkg.t": "论坛 + 酒会套票", "tix.pkg.d": "完整峰会体验——上午、下午与傍晚",
    "tix.best": "超值之选 · 立省 $219",
    "tix.gift": "符合条件的付费门票持有者，获赠价值$199的AI智能礼品。",
    "tix.cta": "购票",
    "tix.platforms": "购票渠道：",
    "tix.luma": "Luma · 即将开放",
    "tix.eventbrite": "门票由我们的票务合作平台安全处理——点击后将跳转完成购买。",
    "tix.group.t": "携团队同行。", "tix.group.d": "为派出多位参会者的机构提供团体预订——一支团队，一个日程，一个更清晰的AI采用方向。",

    "ct.eyebrow": "参与合作", "ct.title": "联系峰会团队",
    "ct.note": "赞助、演讲机会、合作伙伴或参会注册，欢迎联系我们的团队。",
    "ct.spon.t": "赞助与合作", "ct.reg.t": "注册与参会咨询",
    "ct.event.t": "活动", "ct.event.v": "2026年8月14日 · ICC Sydney",
    "ct.general": "综合咨询：",

    "footer.sub": "悉尼 2026", "footer.tag": "从AI认知到商业行动。",
    "footer.meta": "2026年8月14日 · ICC Sydney · 由澳大利亚财经见闻（AFN）主办",
    "footer.copy": "© 2026 澳大利亚财经见闻（Australian Financial News）。保留所有权利。",
    "footer.disclaimer": "所有信息仅供参考，可能发生变更。议程、嘉宾、票务权益、AI智能礼品供应及活动安排均以主办方最终确认为准。早鸟价限时供应，名额售罄即止。"
  };

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
      return `
        <article class="speaker-card">
          <div class="speaker-photo" style="background:linear-gradient(150deg,${s.grad[0]},${s.grad[1]})">${s.initials}</div>
          <div class="speaker-info">
            <h3>${s.name}</h3>
            <p class="role">${role}</p>
            <p class="org">${org}</p>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- i18n toggle ---------- */
  const i18nEls = [];
  function snapshotEN() {
    $$("[data-i18n]").forEach(el => i18nEls.push({ el, en: el.innerHTML }));
  }
  function applyLang(lang) {
    const toZh = lang === "zh";
    i18nEls.forEach(({ el, en }) => {
      if (el.hasAttribute("data-i18n-lock")) return; // value fixed by JS (e.g. live Luma label)
      const key = el.getAttribute("data-i18n");
      el.innerHTML = toZh && ZH[key] != null ? ZH[key] : en;
    });
    renderSpeakers(lang);
    document.documentElement.lang = toZh ? "zh" : "en";
    const t = $("#langToggle");
    if (t) { t.classList.toggle("is-zh", toZh); t.classList.toggle("is-en", !toZh); }
    try { localStorage.setItem("ai-summit-lang", lang); } catch (e) {}
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
        a.setAttribute("data-i18n-lock", "1"); // keep "Luma" as the label in both languages
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

  /* ---------- Language toggle button ---------- */
  function initLang() {
    const btn = $("#langToggle");
    let lang = "en";
    try { lang = localStorage.getItem("ai-summit-lang") || "en"; } catch (e) {}
    applyLang(lang);
    if (btn) btn.addEventListener("click", () => {
      lang = document.documentElement.lang === "zh" ? "en" : "zh";
      applyLang(lang);
    });
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
    snapshotEN();      // capture English innerHTML before any swap
    initLang();        // sets language (renders speakers)
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
