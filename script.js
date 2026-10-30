/* ============================================================
   JOHNSON JASSON — PORTFOLIO SCRIPT
   Features: Typed text, Scroll reveal, Nav highlight, Mobile menu,
             Back-to-top, Contact form (email draft), Copy email, Jbot
   ============================================================ */

'use strict';

/* ============================================================
   1. DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTyped();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initActiveNavLinks();
  initBackToTop();
  initContactForm();
  initCopyEmail();
  initHeroReveal();
});

/* ============================================================
   2. TYPED TEXT EFFECT
   ============================================================ */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Hardware · Software',
    'Embedded Systems',
    'Semiconductors',
    'Circuit Design',
    'AI/ML',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;

      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; tick(); }, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    const speed = deleting ? 45 : 90;
    setTimeout(tick, speed);
  }

  tick();
}

/* ============================================================
   3. NAVBAR — SCROLL EFFECT
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   4. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks || !navbar) return;

  const close = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) close();
  });
}

/* ============================================================
   5. SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   6. HERO REVEAL — staggered entrance
   ============================================================ */
function initHeroReveal() {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
}

/* ============================================================
   7. ACTIVE NAV LINK — highlight on scroll
   ============================================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   8. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   9. CONTACT FORM — opens a pre-filled email draft (mailto)
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    const body = encodeURIComponent(
      `Hi Johnson,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
    );

    window.location.href =
      `mailto:johnsonjasson01@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    showToast('Opening an email draft in your mail app. Press send there to deliver it.', 'success');
  });
}

/* ============================================================
   10. COPY EMAIL ADDRESS
   ============================================================ */
function initCopyEmail() {
  const btn = document.getElementById('copyEmail');
  if (!btn) return;

  const ADDRESS = 'johnsonjasson01@gmail.com';

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      showToast('Email address copied.', 'success');
    } catch (err) {
      // Fallback for browsers that block the clipboard API
      const tmp = document.createElement('textarea');
      tmp.value = ADDRESS;
      document.body.appendChild(tmp);
      tmp.select();
      const ok = document.execCommand && document.execCommand('copy');
      tmp.remove();
      showToast(ok ? 'Email address copied.' : ADDRESS, ok ? 'success' : 'error');
    }
  });
}

/* ============================================================
   11. TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span></span>
  `;
  toast.querySelector('span').textContent = message;

  Object.assign(toast.style, {
    position:       'fixed',
    bottom:         '90px',
    right:          '32px',
    maxWidth:       'min(420px, calc(100vw - 48px))',
    display:        'flex',
    alignItems:     'center',
    gap:            '10px',
    background:     type === 'success' ? 'rgba(0,255,255,0.15)' : 'rgba(255,77,109,0.15)',
    border:         `1px solid ${type === 'success' ? 'rgba(0,255,255,0.4)' : 'rgba(255,77,109,0.4)'}`,
    color:          type === 'success' ? '#00FFFF' : '#ff4d6d',
    padding:        '14px 20px',
    borderRadius:   '12px',
    fontSize:       '0.88rem',
    fontWeight:     '600',
    fontFamily:     "'Montserrat', sans-serif",
    backdropFilter: 'blur(12px)',
    zIndex:         '9999',
    boxShadow:      '0 8px 32px rgba(0,0,0,0.3)',
    transform:      'translateY(20px)',
    opacity:        '0',
    transition:     'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity   = '1';
    });
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ============================================================
   12. SMOOTH SCROLL — for in-page anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   14. CURSOR GLOW EFFECT (desktop only)
   ============================================================ */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position:      'fixed',
    width:         '300px',
    height:        '300px',
    borderRadius:  '50%',
    background:    'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex:        '0',
    transform:     'translate(-50%, -50%)',
    transition:    'left 0.1s ease, top 0.1s ease',
    top:           '-999px',
    left:          '-999px',
  });
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ============================================================
   15. ENSURE HERO CONTENT IS VISIBLE AFTER LOAD
   ============================================================ */
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
});

/* ============================================================
   16. JBOT — small keyword-based assistant (secondary)
   Keep these answers in sync with the page and resume.
   ============================================================ */
(function () {
  var KB = [
    { k: ["education","study","studying","degree","major","university","school","college","alfred","cornell","gpa","scholar","break through","btt","coursework","course"],
      a: "Johnson is pursuing a B.S. in Electrical & Electronics Engineering with a double major in Mathematics at Alfred University (expected May 2029), with a 4.00 GPA as a Presidential Scholar. He's also in Cornell University's Break Through Tech AI Program (Mar 2026 – Mar 2027). <a href='#education'>See Education</a>." },

    { k: ["skill","skills","language","languages","python","matlab","tools","tech stack","programming","code","coding","c++"],
      a: "Johnson works in C/C++ (ESP-IDF, FreeRTOS), Python, and MATLAB; uses lab instruments like oscilloscopes and multimeters; models devices with Monte Carlo methods, DFT, and Linux HPC; and builds ML models with scikit-learn and TensorFlow. <a href='#skills'>See Skills</a>." },

    { k: ["project","projects","built","build","switch","esp32","edge vision","battery","embedded"],
      a: "Johnson's projects include an ESP32 Wi-Fi Smart Switch (completed), the Edge Vision Sensing Platform (in progress: ESP32, FreeRTOS, multi-sensor firmware), and battery health prediction with machine learning as course research and a poster presentation. <a href='#projects'>See Projects</a>." },

    { k: ["experience","intern","internship","job","worked","work","tanesco","career","step-lab"],
      a: "Johnson modeled HfO₂ ferroelectric transistors for neuromorphic memory in summer research (May – Jul 2026), was a Computational Chemistry Research Assistant at the Knepp Lab (Jan – May 2026), and interned in Electrical Engineering at TANESCO in Tanzania (Jul – Sep 2024), where he diagnosed a 0.80 power factor and recommended a capacitor-bank fix. <a href='#experience'>See Experience</a>." },

    { k: ["research","knepp","semiconductor","semiconductors","ferroelectric","fefet","monte carlo","hpc","crystal","computational","neuromorphic","dft"],
      a: "Johnson modeled polarization switching across 5,000 grains in 8.3 nm HfO₂ FeFETs for multi-level neuromorphic memory (May – Jul 2026), and studied how temperature affects electron coupling in organic semiconductors using DFT on Linux HPC at the Knepp Lab (Jan – May 2026). <a href='#experience'>See Research</a>." },

    { k: ["sera","company","co-founder","cofounder","founder","startup","edtech","venture","scholarship","tanzania"],
      a: "Johnson co-founded SERA and is its Lead Developer. He built the platform in HTML and CSS using AI-assisted development tools (Claude Code, Cursor) and deployed it on Vercel. SERA helps students in Tanzania and East Africa find scholarships, internships, and mentorship. <a href='https://www.seraaccess.com/' target='_blank' rel='noopener noreferrer'>Visit seraaccess.com</a>." },

    { k: ["leadership","nsbe","colorstack","robotics","president","chair","club","lead","involvement","nvidia","bridge"],
      a: "Johnson is President of the NSBE chapter, Professional Development Chair of ColorStack, and Vice President of the Robotics Club at Alfred University, and took part in the NVIDIA Summer Bridge Series (Jun – Aug 2026). <a href='#leadership'>See Leadership</a>." },

    { k: ["resume","cv","download","pdf"],
      a: "You can download Johnson's resume here: <a href='Johnson_Jasson_Resume.pdf' target='_blank' rel='noopener noreferrer'>Johnson_Jasson_Resume.pdf</a>." },

    { k: ["contact","email","reach","hire","connect","linkedin","github","get in touch"],
      a: "You can reach Johnson at <a href='mailto:johnsonjasson01@gmail.com'>johnsonjasson01@gmail.com</a>, or find him on <a href='https://www.linkedin.com/in/johnson-jasson' target='_blank' rel='noopener noreferrer'>LinkedIn</a> and <a href='https://github.com/Jhoncho517' target='_blank' rel='noopener noreferrer'>GitHub</a>." },

    { k: ["who","about","yourself","introduce","summary","tell me about"],
      a: "Johnson Jasson is a first-generation Electrical & Electronics Engineering and Mathematics student at Alfred University (4.00 GPA). He builds where hardware meets software: embedded firmware, semiconductor device modeling, and applied AI/ML. <a href='#about'>See About</a>." },

    { k: ["ai","machine learning","ml","neural","deep learning","cnn"],
      a: "Johnson built CNN-based battery health models as course research, and is completing Cornell's Break Through Tech AI Program, covering logistic regression, KNN, deep neural networks, NLP, TensorFlow, and scikit-learn." }
  ];

  var GREETINGS = ["hi","hello","hey","yo","hola","greetings","sup"];
  var msgs, input;

  function add(text, who) {
    var d = document.createElement("div");
    d.className = "jbot-msg " + (who === "user" ? "jbot-user" : "jbot-bot");
    if (who === "user") d.textContent = text; else d.innerHTML = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function answer(q) {
    var t = q.toLowerCase().trim();
    if (GREETINGS.indexOf(t) !== -1 || t.length < 2) {
      return "Hi! I'm Jbot 🤖. Ask me anything about Johnson: his projects, research, experience, skills, SERA, leadership, or how to reach him.";
    }
    var best = null, bestScore = 0;
    KB.forEach(function (item) {
      var score = 0;
      item.k.forEach(function (kw) { if (t.indexOf(kw) !== -1) score++; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    if (best && bestScore > 0) return best.a;
    return "I can only answer questions about Johnson. Try asking about his projects, research, experience, skills, SERA, leadership, resume, or contact info.";
  }

  function send(q) {
    if (!q.trim()) return;
    add(q, "user");
    input.value = "";
    setTimeout(function () { add(answer(q), "bot"); }, 350);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle  = document.getElementById("jbot-toggle");
    var win     = document.getElementById("jbot-window");
    var close   = document.getElementById("jbot-close");
    var sendBtn = document.getElementById("jbot-send");
    msgs  = document.getElementById("jbot-messages");
    input = document.getElementById("jbot-text");
    if (!toggle || !win) return;

    var opened = false;
    toggle.onclick = function () {
      win.classList.toggle("jbot-hidden");
      if (!opened && !win.classList.contains("jbot-hidden")) {
        add("Hi! I'm <strong>Jbot</strong> 🤖, Johnson's assistant. Ask me about his projects, research, or experience, or tap a topic below.", "bot");
        opened = true;
      }
    };
    close.onclick = function () { win.classList.add("jbot-hidden"); };
    sendBtn.onclick = function () { send(input.value); };
    input.addEventListener("keypress", function (e) { if (e.key === "Enter") send(input.value); });
    document.querySelectorAll("#jbot-chips button").forEach(function (b) {
      b.onclick = function () { send(b.textContent); };
    });
  });
})();
