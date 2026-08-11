/* ============================================================
   JOHNSON J. JASSON — PORTFOLIO SCRIPT
   Features: Particles, Typed text, Scroll reveal, Skill bars,
             Nav highlight, Mobile menu, Back-to-top, Contact form
   ============================================================ */

'use strict';

/* ============================================================
   1. DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTyped();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSkillBars();
  initActiveNavLinks();
  initBackToTop();
  initContactForm();
  initHeroReveal();
});

/* ============================================================
   2. PARTICLES
   ============================================================ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 35;

  for (let i = 0; i < COUNT; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const p = document.createElement('div');
  p.classList.add('particle');

  const size   = Math.random() * 4 + 1;          // 1–5 px
  const left   = Math.random() * 100;             // 0–100 %
  const delay  = Math.random() * 12;              // 0–12 s
  const dur    = Math.random() * 10 + 8;          // 8–18 s

  p.style.cssText = `
    width:  ${size}px;
    height: ${size}px;
    left:   ${left}%;
    bottom: -10px;
    animation-duration:  ${dur}s;
    animation-delay:     ${delay}s;
    opacity: 0;
  `;

  container.appendChild(p);

  // Recycle particle after animation ends
  p.addEventListener('animationend', () => {
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 10 + 8}s`;
    p.style.animationDelay   = '0s';
  });
}

/* ============================================================
   3. TYPED TEXT EFFECT
   ============================================================ */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'AI & Machine Learning',
    'Embedded Systems',
    'Circuit Design',
    'Renewable Energy',
    'Research & Innovation',
    'Software + Hardware',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;

      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; tick(); }, 2000);
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
   4. NAVBAR — SCROLL EFFECT
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ============================================================
   5. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Reference navbar for outside-click closure
const navbar = document.getElementById('navbar');

/* ============================================================
   6. SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Trigger skill bars when skills section enters view
          if (entry.target.closest('#skills')) {
            animateSkillBars();
          }
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   7. HERO REVEAL — staggered entrance
   ============================================================ */
function initHeroReveal() {
  const heroItems = document.querySelectorAll('#hero .reveal');
  heroItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });
}

/* ============================================================
   8. SKILL BARS ANIMATION
   ============================================================ */
let skillBarsAnimated = false;

function initSkillBars() {
  // Will be triggered by scroll reveal observer
}

function animateSkillBars() {
  if (skillBarsAnimated) return;
  skillBarsAnimated = true;

  const fills = document.querySelectorAll('.skill-bar-fill');
  fills.forEach((fill, i) => {
    const targetWidth = fill.getAttribute('data-width') || '0';
    setTimeout(() => {
      fill.style.width = targetWidth + '%';
    }, i * 120);
  });
}

/* ============================================================
   9. ACTIVE NAV LINK — highlight on scroll
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
   10. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   11. CONTACT FORM — mailto handler
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

    const mailtoBody = encodeURIComponent(
      `Hi Johnson,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
    );
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoLink = `mailto:johnsonjasson01@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoLink;

    showToast('Opening your email client...', 'success');
    form.reset();
  });
}

/* ============================================================
   12. TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;

  // Inline styles for the toast (no extra CSS needed)
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '90px',
    right:        '32px',
    display:      'flex',
    alignItems:   'center',
    gap:          '10px',
    background:   type === 'success' ? 'rgba(0,255,255,0.15)' : 'rgba(255,77,109,0.15)',
    border:       `1px solid ${type === 'success' ? 'rgba(0,255,255,0.4)' : 'rgba(255,77,109,0.4)'}`,
    color:        type === 'success' ? '#00FFFF' : '#ff4d6d',
    padding:      '14px 20px',
    borderRadius: '12px',
    fontSize:     '0.88rem',
    fontWeight:   '600',
    fontFamily:   "'Montserrat', sans-serif",
    backdropFilter: 'blur(12px)',
    zIndex:       '9999',
    boxShadow:    '0 8px 32px rgba(0,0,0,0.3)',
    transform:    'translateY(20px)',
    opacity:      '0',
    transition:   'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity   = '1';
    });
  });

  // Animate out
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ============================================================
   13. SMOOTH SCROLL — for all anchor links
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
   14. CARD TILT EFFECT — subtle 3D on project cards
   ============================================================ */
document.querySelectorAll('.project-card, .skill-category').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) *  5;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* ============================================================
   15. COUNTER ANIMATION — stat numbers in About section
   ============================================================ */
function animateCounter(el, target, suffix = '', duration = 1200) {
  const start     = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = start + (target - start) * eased;

    el.textContent = Number.isInteger(target)
      ? Math.round(value) + suffix
      : value.toFixed(1) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Trigger counters when About section is visible
const aboutSection = document.getElementById('about');
if (aboutSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-num').forEach(el => {
            const raw = el.textContent.trim();
            if (raw.includes('4.0')) animateCounter(el, 4.0, '', 1000);
            else if (raw.includes('5+')) { el.textContent = '5+'; }
            else if (raw.includes('2'))  animateCounter(el, 2, '', 800);
          });
          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  counterObserver.observe(aboutSection);
}

/* ============================================================
   16. CURSOR GLOW EFFECT (desktop only)
   ============================================================ */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position:     'fixed',
    width:        '300px',
    height:       '300px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)',
    pointerEvents:'none',
    zIndex:       '0',
    transform:    'translate(-50%, -50%)',
    transition:   'left 0.1s ease, top 0.1s ease',
    top:          '-999px',
    left:         '-999px',
  });
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ============================================================
   17. SECTION ENTRANCE — add subtle line decoration
   ============================================================ */
window.addEventListener('load', () => {
  // Ensure all hero reveals fire even if IntersectionObserver missed them
  document.querySelectorAll('#hero .reveal').forEach(el => {
    el.classList.add('visible');
  });
});

(function () {
  var KB = [
    { k: ["education","study","studying","degree","major","university","school","college","alfred","cornell","gpa","scholar","break through","btt"],
      a: "Johnson is pursuing a B.S. in Electrical & Electronics Engineering with a double major in Mathematics at Alfred University (2025–2029). He's a Presidential Scholar with a 4.0 GPA and on the Dean's List. He's also part of Cornell University's Break Through Tech AI & Machine Learning program (2026–2027)." },
    { k: ["skill","skills","language","languages","python","matlab","tools","tech stack","programming","proficient","code","coding"],
      a: "Johnson's core skills include Python, C/C++, MATLAB, and Verilog for programming; machine learning and CNNs; embedded systems (ESP32, Arduino); CAD tools (SolidWorks, AutoCAD); and lab instrumentation. He also works with HPC/Linux and computational chemistry tools like CRYSTAL23." },
    { k: ["project","projects","built","build","portfolio","work","digital twin","battery","esp32","semiconductor","ev","research"],
      a: "Some of Johnson's featured projects: an AI-powered Digital Twin for smart battery management (CNNs, +30% efficiency), Battery Life Prediction with ML (benchmarked 14 models, best RMSE 0.085), a Wi-Fi Smart Switch using ESP32, organic-semiconductor (OSCs) research at the Knepp Lab, and an EV engine-conversion project. Scroll to the Projects section to see them all." },
    { k: ["experience","intern","internship","job","worked","tanesco","step-lab","ge aerospace","forage","career"],
      a: "Johnson's experience includes an Electrical Engineering internship at TANESCO in Tanzania (33kV transformers, AutoCAD, GIS), Engineering Lab Support at STEP-LAB (EV drivetrain project, SolidWorks), and a GE Aerospace electrical engineering job simulation via Forage." },
    { k: ["research","knepp","semiconductor","ferroelectric","monte carlo","hpc","crystal","computational"],
      a: "Johnson does computational research at the Knepp Lab studying how temperature affects electronic coupling in organic semiconductors, using DFT and the quasi-harmonic approximation on Linux HPC. He's also modeled ferroelectric FeFET devices for neuromorphic computing." },
    { k: ["sera","company","co-founder","cofounder","startup","edtech","venture","scholarship","tanzania"],
      a: "Johnson is Co-Founder of SERA Access, an EdTech platform helping Tanzanian students find verified scholarships, fellowships, and internships, paired with mentorship and application support. It's running an invitation-only 2026 pilot. See it at seraaccess.com." },
    { k: ["leadership","nsbe","colorstack","president","vice president","club","lead","involvement"],
      a: "Johnson serves as President of the NSBE chapter and Vice President of ColorStack at Alfred University, plus Co-Founder of SERA Access; all focused on championing diversity in STEM and helping students grow." },
    { k: ["contact","email","reach","hire","connect","linkedin","github","phone","get in touch"],
      a: "You can reach Johnson at johnsonjasson01@gmail.com. Find him on <a href='https://www.linkedin.com/in/johnson-jasson' target='_blank'>LinkedIn</a> and <a href='https://github.com/Jhoncho517' target='_blank'>GitHub</a>. He's actively seeking internships and research opportunities!" },
    { k: ["who","about","yourself","introduce","summary","tell me about"],
      a: "Johnson J. Jasson is a first-generation college student, Presidential Scholar, and 4.0 EE + Mathematics student at Alfred University. He builds at the intersection of hardware, software, and AI and is passionate about engineering, tech, and business." },
    { k: ["ai","machine learning","ml","neural","deep learning","cnn"],
      a: "AI/ML is central to Johnson's work: he's built CNN-based battery health models, an AI digital twin, and completed Cornell's Break Through Tech AI program covering logistic regression, KNN, deep neural networks, NLP chatbots, TensorFlow, and scikit-learn." }
  ];

  var GREETINGS = ["hi","hello","hey","yo","hola","greetings","sup"];
  var msgs, input;

  function add(text, who) {
    var d = document.createElement("div");
    d.className = "jbot-msg " + (who === "user" ? "jbot-user" : "jbot-bot");
    d.innerHTML = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function answer(q) {
    var t = q.toLowerCase().trim();
    if (GREETINGS.indexOf(t) !== -1 || t.length < 3) {
      return "Hi! I'm Jbot 🤖 ! ask me anything about Johnson: his education, skills, projects, experience, SERA Access, or how to reach him.";
    }
    var best = null, bestScore = 0;
    KB.forEach(function (item) {
      var score = 0;
      item.k.forEach(function (kw) { if (t.indexOf(kw) !== -1) score++; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    if (best && bestScore > 0) return best.a;
    return "I can only answer questions about Johnson. Try asking about his education, skills, projects, experience, research, SERA Access, or contact info!";
  }

  function send(q) {
    if (!q.trim()) return;
    add(q, "user");
    input.value = "";
    setTimeout(function () { add(answer(q), "bot"); }, 350);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("jbot-toggle");
    var win = document.getElementById("jbot-window");
    var close = document.getElementById("jbot-close");
    var sendBtn = document.getElementById("jbot-send");
    msgs = document.getElementById("jbot-messages");
    input = document.getElementById("jbot-text");

    var opened = false;
    toggle.onclick = function () {
      win.classList.toggle("jbot-hidden");
      if (!opened && !win.classList.contains("jbot-hidden")) {
        add("Hi! I'm <strong>Jbot</strong> 🤖 ! Johnson's assistant. Ask me about his education, projects, skills, or tap a topic below.", "bot");
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
