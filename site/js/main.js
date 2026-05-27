/* =====================================================================
   AI Application Summit Sydney 2026 — interactions + i18n
   ===================================================================== */
(function () {
  "use strict";

  /* =====================================================================
     CONFIG — paste your Eventbrite event URL below to make every
     "Get Tickets" / "Register" / "Secure Your Ticket" button go live.
     Example: "https://www.eventbrite.com.au/e/ai-application-summit-sydney-2026-tickets-000000000000"
     While left empty, those buttons gracefully scroll to the on-page
     Tickets / Contact sections instead.
     ===================================================================== */
  const CONFIG = {
    eventbriteUrl: ""
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
    "nav.about": "关于峰会", "nav.experience": "峰会体验", "nav.agenda": "议程",
    "nav.speakers": "嘉宾", "nav.attend": "参会理由", "nav.tickets": "门票",
    "nav.sponsor": "赞助", "nav.contact": "联系", "nav.register": "立即注册",

    "hero.eyebrow": "澳大利亚财经见闻（AFN）呈献",
    "hero.title": "2026 悉尼人工智能<br>商业应用峰会",
    "hero.tagline": "AI应用，解锁企业增长新引擎",
    "hero.sub": "让AI从“技术可能”走向“商业可行”——从认知到行动。",
    "hero.date": "2026年8月14日", "hero.venue": "悉尼国际会议中心 ICC Sydney", "hero.host": "AFN 主办",
    "hero.cta1": "立即购票", "hero.cta2": "成为赞助商",
    "hero.strip": "上午洞察 · 下午对接 · 傍晚社交",
    "cd.days": "天", "cd.hours": "时", "cd.mins": "分", "cd.secs": "秒",

    "stat.reach": "AFN 受众触达", "stat.attendees": "预计参会人数", "stat.vips": "受邀 VIP 嘉宾",
    "stat.speakers": "演讲与圆桌嘉宾", "stat.communities": "互联社群",

    "about.eyebrow": "关于峰会", "about.title": "AI 真实落地，驱动商业增长",
    "about.p1": "2026悉尼人工智能商业应用峰会是一场以商业落地为核心的高端AI主题峰会，面向希望理解、评估并采用AI实现商业增长的企业与机构。",
    "about.p2": "峰会汇聚企业领袖、中小企业、专业人士、投资人、AI解决方案提供商、创新者与战略合作伙伴，交流高管洞察、展示成熟方案、建立高价值商业人脉。",
    "about.p3": "区别于泛技术类大会，本届峰会聚焦商业应用——AI如何提升生产力、销售、客户互动、运营、团队效能与业务转型。",
    "about.facts.title": "峰会概览",
    "about.facts.host": "主办方", "about.facts.date": "日期", "about.facts.date.v": "2026年8月14日",
    "about.facts.venue": "地点", "about.facts.format": "形式",
    "about.facts.format.v": "完整商业日——洞察、方案对接与高端社交",
    "about.facts.audience": "参会群体", "about.facts.audience.v": "中小企业、企业领袖、AI方案商、投资人与生态伙伴",

    "exp.eyebrow": "一天，三段相连的体验", "exp.title": "以商业成果为核心的完整一天",
    "exp.m.tag": "上午", "exp.m.title": "洞察与领导力",
    "exp.m.body": "高管洞察、领导力对话、企业AI案例与方案展示，为全天确立战略方向。",
    "exp.a.tag": "下午", "exp.a.title": "方案探索与业务对接",
    "exp.a.body": "现场AI演示、初创与创新展示，以及结构化商务配对，将想法转化为商业机会。",
    "exp.e.tag": "傍晚", "exp.e.title": "社交酒会与机器人科技",
    "exp.e.body": "美食美酒的高端社交、前沿机器人科技展，与嘉宾、赞助商、合作伙伴及VIP深度连接。",

    "why.eyebrow": "为何在此刻", "why.title": "采用AI不再是选项——而是竞争优势",
    "why.body": "高效应用AI的企业正在提升效率、改善客户服务、降低运营成本并开拓新的增长机会。问题已不是“AI是否重要”，而是“如何将AI兴趣转化为切实可行的商业方向”。",
    "why.kicker": "投入聚焦的一个商业日，节省数月零散调研、选型困惑与错失的机会。",
    "why.q.title": "企业正在思考的关键问题",
    "why.q1": "AI如何帮助我的业务？",
    "why.q2": "哪些AI工具真正适配我们？",
    "why.q3": "如何应用AI而不浪费时间与金钱？",
    "why.q4": "AI如何提升销售、市场、运营、财务、人力与客服？",
    "why.q5": "如何管理AI的风险、隐私与治理？",

    "agenda.eyebrow": "议程", "agenda.title": "峰会议程",
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

    "gain.eyebrow": "参会理由", "gain.title": "您将收获什么",
    "gain.1.t": "清晰认知", "gain.1.d": "看清AI在哪些环节创造真实商业价值，又在哪里只是炒作。",
    "gain.2.t": "商业洞察", "gain.2.d": "了解AI如何支撑生产力、销售、市场、客户互动、运营与转型。",
    "gain.3.t": "方案发现", "gain.3.d": "对接AI方案提供商，探索适合企业采用的工具、平台与服务。",
    "gain.4.t": "更优决策", "gain.4.d": "在采用AI工具、自动化平台或实施伙伴前，明确需要权衡的要点。",
    "gain.5.t": "商业人脉", "gain.5.d": "与企业领袖、创始人、高管、投资人、顾问、创新者及技术供应商建立连接。",
    "gain.6.t": "团队学习", "gain.6.d": "带回可支撑内部讨论、战略规划与未来AI落地的洞察。",

    "who.title": "适合谁参加", "who.sub": "为负责业务增长、生产力、转型、客户互动或技术采用的人士与机构而设计。这不是一场纯技术活动。",
    "who.1": "企业主与创始人", "who.2": "CEO、董事与高级管理者", "who.3": "销售、市场与客服负责人",
    "who.4": "运营、人力与财务经理", "who.5": "专业服务提供商与顾问", "who.6": "初创创始人与创业者",
    "who.7": "投资人、顾问与创新生态伙伴", "who.8": "正在探索AI、自动化或数字化转型的团队",

    "tix.eyebrow": "门票", "tix.title": "锁定早鸟门票",
    "tix.note": "早鸟价至2026年6月30日，售罄即止。",
    "tix.toggle.early": "早鸟价", "tix.toggle.standard": "标准价", "tix.from": "起",
    "tix.forum.t": "论坛门票", "tix.forum.d": "上午洞察 + 下午方案探索",
    "tix.cocktail.t": "社交酒会门票", "tix.cocktail.d": "傍晚社交酒会 + 机器人科技展",
    "tix.pkg.t": "论坛 + 酒会套票", "tix.pkg.d": "完整峰会体验——上午、下午与傍晚",
    "tix.best": "超值之选 · 立省 $219",
    "tix.gift": "符合条件的付费门票持有者，获赠价值$199的AI智能礼品。",
    "tix.cta": "购票",
    "tix.eventbrite": "门票通过 Eventbrite 安全处理——点击后将跳转完成购买。",
    "tix.group.t": "携团队同行。", "tix.group.d": "为派出多位参会者的机构提供团体预订——一支团队，一个日程，一个更清晰的AI采用方向。",

    "spo.eyebrow": "合作与赞助", "spo.title": "让您的品牌站在澳大利亚AI浪潮前沿",
    "spo.note": "从核心曝光到冠名权与高端权威，权益层层递增。所有价格均为澳元（AUD）。",
    "spo.w1.t": "触达活跃AI买家", "spo.w1.d": "对接正在评估AI的企业主、C级高管与转型负责人。",
    "spo.w2.t": "确立品类领导力", "spo.w2.d": "将品牌定位为AI采用与业务转型领域的可信权威。",
    "spo.w3.t": "获取高质量线索", "spo.w3.d": "通过演讲席位、方案展示、展览与精准配对推动深度对话。",
    "spo.w4.t": "放大长期曝光", "spo.w4.d": "借助AFN媒体生态与内容矩阵，在会前、会中、会后持续曝光。",
    "spo.silver": "银牌", "spo.gold": "金牌", "spo.platinum": "白金", "spo.diamond": "钻石", "spo.naming": "冠名权",
    "spo.popular": "最受欢迎", "spo.premier": "至尊",
    "spo.f.core": "核心峰会logo展示", "spo.f.web": "官网与EDM邮件logo展示",
    "spo.f.social": "社交媒体品牌放大", "spo.f.stage": "主舞台背景板logo",
    "spo.f.pass": "张免费峰会通行证", "spo.f.vip": "个VIP酒会邀请", "spo.f.vips": "个VIP酒会邀请",
    "spo.f.allsilver": "包含银牌全部权益，另加：", "spo.f.allgold": "包含金牌全部权益，另加：",
    "spo.f.allplat": "包含白金全部权益，另加：", "spo.f.alldiamond": "包含钻石全部权益，另加：",
    "spo.f.mc": "主持人现场口头致谢", "spo.f.video": "茶歇品牌视频与logo",
    "spo.f.foyer": "前厅品牌活动与展览空间", "spo.f.match": "精准商务配对与VIP引荐",
    "spo.f.panel": "高管圆桌参与席位", "spo.f.highlight": "峰会集锦视频品牌植入",
    "spo.f.keynote": "专属主旨演讲席位", "spo.f.thought": "思想领导力与媒体专题",
    "spo.f.category": "品类独家权益（细节另议）", "spo.f.title": "冠名权头部品牌权威",
    "spo.f.premium": "全触点高端品牌定位", "spo.f.bespoke": "定制化品牌活动（细节另议）",
    "spo.special.t": "特别赞助机会",
    "spo.gift.t": "礼品赞助商", "spo.gift.d": "峰会礼品上的独家赞助商logo。",
    "spo.bag.t": "购物袋赞助商", "spo.bag.d": "官方峰会购物袋上的独家赞助商logo。",
    "spo.cock.t": "酒会赞助商", "spo.cock.d": "傍晚社交酒会的官方冠名赞助商。",
    "spo.cats.t": "目标赞助商类别",
    "spo.cat1": "AI应用、云与企业平台", "spo.cat2": "AI方案提供商与业务自动化",
    "spo.cat3": "投资与成长资本", "spo.cat4": "专业服务与咨询", "spo.cat5": "政策、产业与生态",
    "spo.cta.text": "需要完整权益对照表与赞助时间线？", "spo.cta.btn": "索取赞助方案包",

    "partners.label": "汇聚澳大利亚AI生态——横跨商业、科技、投资、政府与学术界",

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

  /* ---------- Logo wall placeholders ---------- */
  function renderLogos() {
    const wall = $("#logoWall");
    if (!wall) return;
    let html = "";
    for (let i = 1; i <= 12; i++) html += `<div class="logo-tile">YOUR&nbsp;LOGO</div>`;
    wall.innerHTML = html;
  }

  /* ---------- i18n toggle ---------- */
  const i18nEls = [];
  function snapshotEN() {
    $$("[data-i18n]").forEach(el => i18nEls.push({ el, en: el.innerHTML }));
  }
  function applyLang(lang) {
    const toZh = lang === "zh";
    i18nEls.forEach(({ el, en }) => {
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

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const dur = 1600;
    const start = performance.now();
    const fmt = n => n >= 1000 ? n.toLocaleString("en-US") : String(n);
    function step(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll reveal + counters ---------- */
  function initObservers() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      $$(".reveal").forEach(el => el.classList.add("in"));
      $$("[data-count]").forEach(el => {
        const n = parseInt(el.getAttribute("data-count"), 10) || 0;
        el.textContent = (n >= 1000 ? n.toLocaleString("en-US") : n) + (el.getAttribute("data-suffix") || "");
      });
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(el => io.observe(el));

    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(el => co.observe(el));
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

  /* ---------- Eventbrite ticketing ---------- */
  function initTicketing() {
    const url = CONFIG.eventbriteUrl;
    if (!url) return; // not set yet — keep in-page anchor fallbacks
    $$("[data-buy]").forEach(a => {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
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

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderLogos();
    snapshotEN();      // capture English innerHTML before any swap
    initLang();        // sets language (renders speakers)
    initCountdown();
    initHeader();
    initNav();
    initTicketing();
    initTicketToggle();
    initObservers();
  });
})();
