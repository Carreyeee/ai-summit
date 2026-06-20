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

  /* ---------- Chinese dictionary (keys = data-i18n) ---------- */
  const ZH = {
    "brand.sub": "2026 · 由 AFN 主办",
    "nav.about": "关于峰会", "nav.framework": "峰会框架", "nav.agenda": "议程",
    "nav.speakers": "嘉宾", "nav.tickets": "门票",
    "nav.contact": "联系", "nav.register": "立即注册",

    "hero.eyebrow": "澳大利亚财经见闻（AFN）呈献",
    "hero.title": "2026 悉尼<br>人工智能峰会",
    "hero.tagline": "从能源到智能，从算力到资本。",
    "hero.sub": "连接政策、基础设施、创新与投资，共建人工智能经济新生态。",
    "hero.date": "2026年8月14日", "hero.venue": "悉尼，澳大利亚", "hero.host": "AFN 主办",
    "hero.cta1": "立即购票", "hero.cta2": "查看议程",
    "hero.scroll": "向下了解",
    "cd.days": "天", "cd.hours": "时", "cd.mins": "分", "cd.secs": "秒",

    "about.eyebrow": "关于", "about.title": "这不止是一场技术大会，而是一场面向完整AI经济的峰会。",
    "about.p1": "2026悉尼人工智能峰会是一场面向人工智能经济的高端商业、科技与投资盛会，连接正在建设、投资、监管和应用AI的核心决策者——贯通政策、能源、算力、应用、智能硬件与资本，覆盖澳大利亚与亚太。",
    "about.p2": "让政策与产业对话，让基础设施与创新协同，让科技与资本相遇。",
    "about.facts.title": "峰会概览",
    "about.facts.host": "主办方", "about.facts.date": "日期", "about.facts.date.v": "2026年8月14日",
    "about.facts.venue": "地点", "about.facts.venue.v": "悉尼，澳大利亚", "about.facts.format": "形式",
    "about.facts.format.v": "商业 · 科技 · 投资 旗舰峰会",
    "about.facts.audience": "面向", "about.facts.audience.v": "AI建设者、应用者与生态推动者",

    "fw.eyebrow": "峰会框架", "fw.title": "人工智能生态的六大层级。",
    "fw.note": "一天之内，看清完整价值链——从AI如何被治理、被供能，到如何被构建、被应用、走向物理世界与被资本支持。",
    "fw.l1.t": "政策治理与信任", "fw.l1.d": "监管与合规、数据治理、网络安全、负责任AI与可信机制。",
    "fw.l2.t": "能源与电力", "fw.l2.d": "可再生能源、储能、电网稳定，以及数据中心背后的能源需求。",
    "fw.l3.t": "基础设施与算力", "fw.l3.d": "数据中心、GPU云、主权AI，以及支撑AI规模化的基础设施。",
    "fw.l4.t": "行业应用", "fw.l4.d": "医疗、金融、地产、企业与自动化等真实落地场景。",
    "fw.l5.t": "智能科技", "fw.l5.d": "机器人、无人机、自动驾驶、联网设备与智能硬件。",
    "fw.l6.t": "资本与投资", "fw.l6.d": "风险投资、私募股权、家族办公室、初创与商业化路径。",

    "agenda.eyebrow": "议程", "agenda.title": "一整天，贯穿AI完整价值链。",
    "agenda.note": "议程为暂定内容，环节、时间与嘉宾以主办方最终确认为准。",
    "ag.r1.t": "签到与欢迎咖啡", "ag.r1.d": "嘉宾签到、领取资料、参观赞助商展示区与会前交流。",
    "ag.r2.t": "峰会开幕", "ag.r2.d": "介绍峰会主题：连接从能源、算力到应用、智能科技与资本的完整AI生态。",
    "ag.r3.t": "主办方欢迎致辞", "ag.r3.d": "介绍峰会愿景、参会群体及当日核心议题。",
    "ag.r4.t": "部长级主旨演讲", "ag.r4.d": "从政府视角探讨AI、创新及澳大利亚在AI经济中的角色。",
    "ag.r5.t": "开幕圆桌 · 构建澳大利亚AI生态", "ag.r5.d": "政策、数据安全、基础设施准备度与亚太机遇。",
    "ag.r6.t": "上午茶与交流", "ag.r6.d": "嘉宾交流与创新展示参观。",
    "ag.r7.t": "第一层 · 为AI供能：能源、电网与可持续", "ag.r7.d": "可再生能源、储能、虚拟电厂与数据中心能源需求。",
    "ag.r8.t": "第二层 · AI基础设施与算力", "ag.r8.d": "数据中心、云、GPU即服务、主权AI与可扩展算力。",
    "ag.r9.t": "商务午餐与交流", "ag.r9.d": "高层商务交流与合作伙伴介绍。",
    "ag.r10.t": "第三层 · 跨行业AI应用", "ag.r10.d": "医疗健康、金融服务、房地产、专业服务与自动化。",
    "ag.r11.t": "第四层 · 智能科技与智能硬件", "ag.r11.d": "机器人、无人机、自动驾驶、智慧出行与联网设备。",
    "ag.r12.t": "下午茶与创新展示", "ag.r12.d": "产品演示与自由交流。",
    "ag.r13.t": "第五层 · AI投资与资本机会", "ag.r13.d": "风险投资、私募股权、家族办公室、初创与数字资产。",
    "ag.r14.t": "高层讨论 · 从创新到商业化", "ag.r14.d": "AI公司、投资人、企业与政府如何共同推动规模化应用。",
    "ag.r15.t": "闭幕致辞", "ag.r15.d": "总结全天重点，发出产业协同的行动倡议。",
    "ag.r16.t": "鸡尾酒会与高端商务交流", "ag.r16.d": "与演讲嘉宾、赞助商、政府代表、投资人及科技领袖深度交流。",

    "spk.eyebrow": "嘉宾阵容", "spk.title": "塑造人工智能经济的领袖。",
    "spk.note": "已邀请 / 拟邀请嘉宾（按姓名首字母排序），名单持续更新，以最终确认为准。",

    "tix.eyebrow": "门票", "tix.title": "锁定早鸟门票。",
    "tix.note": "早鸟价至2026年6月30日，售罄即止。",
    "tix.toggle.early": "早鸟价", "tix.toggle.standard": "标准价", "tix.from": "起",
    "tix.forum.t": "论坛门票", "tix.forum.d": "全天峰会议程 · 覆盖六大层级",
    "tix.cocktail.t": "社交酒会门票", "tix.cocktail.d": "傍晚鸡尾酒会与高端商务交流",
    "tix.pkg.t": "论坛 + 酒会套票", "tix.pkg.d": "完整体验——全天议程与傍晚酒会",
    "tix.best": "超值之选 · 立省 $219",
    "tix.cta": "购票",
    "tix.platforms": "购票渠道：",
    "tix.eventbrite": "门票由我们的票务合作平台安全处理——点击后将跳转完成购买。",
    "tix.group.t": "携团队同行。", "tix.group.d": "为派出多位参会者的机构提供团体预订——一支团队，一天时间，完整的AI价值链。",

    "ct.eyebrow": "参与合作", "ct.title": "联系峰会团队。",
    "ct.note": "赞助、演讲机会、合作伙伴或参会注册，欢迎联系我们的团队。",
    "ct.spon.t": "赞助与合作", "ct.reg.t": "注册与参会咨询",
    "ct.event.t": "活动", "ct.event.v": "2026年8月14日 · 悉尼，澳大利亚",
    "ct.general": "综合咨询：",

    "footer.sub": "2026", "footer.tag": "从能源到智能，从算力到资本。",
    "footer.meta": "2026年8月14日 · 悉尼，澳大利亚 · 由澳大利亚财经见闻（AFN）主办",
    "footer.copy": "© 2026 澳大利亚财经见闻（Australian Financial News）。保留所有权利。",
    "footer.disclaimer": "所有信息仅供参考，可能发生变更。议程、嘉宾、场地、票务权益及活动安排均以主办方最终确认为准。早鸟价限时供应，名额售罄即止。"
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
