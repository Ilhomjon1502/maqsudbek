// ===== Kunduzgi / tungi rejim =====
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== Yosh va yil =====
const now = new Date();
const age = now.getFullYear() - 2008;
document.getElementById('ageCount').dataset.to = age;
document.getElementById('ageText').textContent = age;
document.getElementById('year').textContent = now.getFullYear();

// ===== Yozilayotgan matn effekti =====
const words = ['IT talabasiman.', 'Sarbonda o\'qiyman.', 'Farg\'onadanman.', 'Doim o\'rganaman.'];
const typed = document.getElementById('typed');
let wi = 0, ci = 0, deleting = false;

function type() {
  const word = words[wi];
  typed.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 80); }
  else if (!deleting) { deleting = true; setTimeout(type, 1600); }
  else if (ci > 0) { ci--; setTimeout(type, 40); }
  else { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 300); }
}
setTimeout(type, 900);

// ===== Raqamlarni sanash =====
function countUp(el) {
  const to = +el.dataset.to;
  const start = to > 100 ? to - 60 : 0;
  const dur = 1400;
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(start + (to - start) * ease);
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

// ===== Scroll bilan paydo bo'lish =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    e.target.querySelectorAll('.count').forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Hero ichidagi raqamlar sahifa ochilganda
setTimeout(() => document.querySelectorAll('.hero .count').forEach(countUp), 700);

// ===== Header, progress, yuqoriga tugmasi, faol menyu =====
const header = document.getElementById('header');
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('scrolled', y > 20);
  toTop.classList.toggle('show', y > 600);
  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

  let current = '';
  sections.forEach((s) => { if (y >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

// ===== Mobil menyu =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
navLinks.forEach((a) => a.addEventListener('click', () => {
  burger.classList.remove('open');
  nav.classList.remove('open');
}));

// ===== Rasmning 3D egilishi =====
const tilt = document.getElementById('tilt');
if (window.matchMedia('(hover: hover)').matches) {
  tilt.addEventListener('mousemove', (e) => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  tilt.addEventListener('mouseleave', () => { tilt.style.transform = ''; });
}

// ===== Kartalarda sichqoncha ortidan yorug'lik =====
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', e.clientX - r.left + 'px');
    card.style.setProperty('--my', e.clientY - r.top + 'px');
  });
});
