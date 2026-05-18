// ── Inject stylesheet ─────────────────────────────────────────────────────────
(function () {
  const lnk = document.createElement('link');
  lnk.rel = 'stylesheet';
  lnk.href = 'home.css';
  document.head.appendChild(lnk);
})();

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  'All', 'Today\'s inspiration', 'Outdoor decor', 'Food & drink', 'Architecture',
  'Fashion', 'Hair', 'Travel', 'DIY & Crafts', 'Fitness', 'Quotes', 'Tattoos',
  'Beauty', 'Minimalism', 'Wedding', 'Art',
];

const PINS = [
  { id: 1,  img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', h: 280, title: 'Mountain Sunrise', src: 'travelblog.com', author: 'Aria K.', av: 'https://i.pravatar.cc/40?img=1' },
  { id: 2,  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', h: 200, title: 'Modern Living Room', src: 'homedecor.co', author: 'Marcus L.', av: 'https://i.pravatar.cc/40?img=2' },
  { id: 3,  img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', h: 320, title: 'Gourmet Pizza', src: 'foodie.net', author: 'Sofia M.', av: 'https://i.pravatar.cc/40?img=3' },
  { id: 4,  img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', h: 240, title: 'Street Fashion', src: 'vogue.com', author: 'Jenna T.', av: 'https://i.pravatar.cc/40?img=4' },
  { id: 5,  img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc14?w=400&q=80', h: 300, title: 'Spring Flowers', src: 'nature.io', author: 'Lena B.', av: 'https://i.pravatar.cc/40?img=5' },
  { id: 6,  img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80', h: 220, title: 'Architecture Detail', src: 'archdaily.com', author: 'Omar P.', av: 'https://i.pravatar.cc/40?img=6' },
  { id: 7,  img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', h: 260, title: 'Healthy Bowl', src: 'eatwell.co', author: 'Claire N.', av: 'https://i.pravatar.cc/40?img=7' },
  { id: 8,  img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80', h: 340, title: 'Yoga Sunrise', src: 'wellness.app', author: 'Zoe R.', av: 'https://i.pravatar.cc/40?img=8' },
  { id: 9,  img: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&q=80', h: 230, title: 'Minimal Desk Setup', src: 'desky.io', author: 'Ryan W.', av: 'https://i.pravatar.cc/40?img=9' },
  { id: 10, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80', h: 270, title: 'Autumn Forest', src: 'hikingpal.com', author: 'Nina C.', av: 'https://i.pravatar.cc/40?img=10' },
  { id: 11, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', h: 210, title: 'Minimal Laptop', src: 'techdesign.io', author: 'Hugo F.', av: 'https://i.pravatar.cc/40?img=11' },
  { id: 12, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', h: 290, title: 'Home Gym', src: 'fitlife.com', author: 'Maya V.', av: 'https://i.pravatar.cc/40?img=12' },
  { id: 13, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80', h: 360, title: 'Summer Look', src: 'styleday.co', author: 'Ines A.', av: 'https://i.pravatar.cc/40?img=13' },
  { id: 14, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80', h: 250, title: 'Cozy Bedroom', src: 'sleepwell.io', author: 'Dave S.', av: 'https://i.pravatar.cc/40?img=14' },
  { id: 15, img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80', h: 300, title: 'Amalfi Coast', src: 'travelgram.net', author: 'Mia G.', av: 'https://i.pravatar.cc/40?img=15' },
  { id: 16, img: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400&q=80', h: 240, title: 'Latte Art', src: 'coffeelovers.co', author: 'Leo H.', av: 'https://i.pravatar.cc/40?img=16' },
  { id: 17, img: 'https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?w=400&q=80', h: 200, title: 'Geometric Pattern', src: 'artboard.io', author: 'Alisa D.', av: 'https://i.pravatar.cc/40?img=17' },
  { id: 18, img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80', h: 280, title: 'City Lights', src: 'urbanlife.com', author: 'Ben O.', av: 'https://i.pravatar.cc/40?img=18' },
  { id: 19, img: 'https://images.unsplash.com/photo-1559181567-c3190525afd3?w=400&q=80', h: 260, title: 'Cherry Blossoms', src: 'japantravel.co', author: 'Yuki T.', av: 'https://i.pravatar.cc/40?img=19' },
  { id: 20, img: 'https://images.unsplash.com/photo-1583394293214-0df5e4a9e7af?w=400&q=80', h: 310, title: 'Skincare Routine', src: 'glowup.io', author: 'Chloe E.', av: 'https://i.pravatar.cc/40?img=20' },
  { id: 21, img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&q=80', h: 230, title: 'Beach House', src: 'coastliving.com', author: 'James F.', av: 'https://i.pravatar.cc/40?img=21' },
  { id: 22, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', h: 270, title: 'Avocado Toast', src: 'brunchclub.io', author: 'Emma L.', av: 'https://i.pravatar.cc/40?img=22' },
  { id: 23, img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=80', h: 320, title: 'Floral Dress', src: 'fashionweek.co', author: 'Isla B.', av: 'https://i.pravatar.cc/40?img=23' },
  { id: 24, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', h: 200, title: 'Snowy Peaks', src: 'alpineguide.com', author: 'Karl M.', av: 'https://i.pravatar.cc/40?img=24' },
];

// ── SVG icons ─────────────────────────────────────────────────────────────────
const SVG = {
  logo: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`,
  search: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  home: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  explore: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  create: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  bell: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  chat: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  more: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>`,
  share: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  dots: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`,
  heart: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  chevron: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>`,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function el(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html) node.innerHTML = html;
  return node;
}

function icon(key) {
  const s = el('span');
  s.innerHTML = SVG[key];
  return s;
}

// Toast
let toastTimer;
function showToast(msg) {
  let t = document.getElementById('__toast');
  if (!t) {
    t = el('div', 'toast');
    t.id = '__toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ── Build Navbar ──────────────────────────────────────────────────────────────
function buildNavbar() {
  const nav = el('nav', 'navbar');

  // Logo
  const logo = el('button', 'nav-logo');
  logo.innerHTML = SVG.logo;
  logo.title = 'Pinterest';
  nav.appendChild(logo);

  // Nav links
  [['home', 'Home'], ['explore', 'Explore']].forEach(([ic, label]) => {
    const btn = el('button', 'nav-link' + (label === 'Home' ? ' active' : ''));
    btn.innerHTML = SVG[ic];
    btn.title = label;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    nav.appendChild(btn);
  });

  // Search
  const wrap = el('div', 'search-wrap');
  const searchIcon = el('span', 'search-icon');
  searchIcon.innerHTML = SVG.search;
  const input = el('input', 'search-input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search');
  wrap.appendChild(searchIcon);
  wrap.appendChild(input);
  nav.appendChild(wrap);

  // Right icons
  const right = el('div', 'nav-right');

  // Create
  const createBtn = el('button', 'icon-btn');
  createBtn.innerHTML = SVG.create;
  createBtn.title = 'Create';
  createBtn.addEventListener('click', () => showToast('Create pin — coming soon!'));
  right.appendChild(createBtn);

  // Notifications
  const bellWrap = el('div');
  bellWrap.style.position = 'relative';
  const bellBtn = el('button', 'icon-btn');
  bellBtn.innerHTML = SVG.bell;
  bellBtn.title = 'Notifications';
  const dot = el('span', 'notif-dot');
  bellWrap.appendChild(bellBtn);
  bellWrap.appendChild(dot);
  bellBtn.addEventListener('click', () => { dot.style.display = 'none'; showToast('No new notifications'); });
  right.appendChild(bellWrap);

  // Messages
  const chatBtn = el('button', 'icon-btn');
  chatBtn.innerHTML = SVG.chat;
  chatBtn.title = 'Messages';
  chatBtn.addEventListener('click', () => showToast('Messages — coming soon!'));
  right.appendChild(chatBtn);

  // Avatar + dropdown
  const avWrap = el('div');
  avWrap.style.position = 'relative';
  const av = el('img', 'avatar');
  av.src = 'https://i.pravatar.cc/80?img=47';
  av.alt = 'Profile';
  const dropdown = el('div', 'dropdown');
  [
    ['Your profile', false],
    ['Your boards', false],
    ['Settings', false],
    ['Log out', true],
  ].forEach(([label, danger]) => {
    const item = el('div', 'dropdown-item' + (danger ? ' danger' : ''), label);
    item.addEventListener('click', () => {
      dropdown.classList.remove('open');
      if (danger) showToast('Logged out!');
      else showToast(label);
    });
    dropdown.appendChild(item);
  });
  av.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => dropdown.classList.remove('open'));
  avWrap.appendChild(av);
  avWrap.appendChild(dropdown);
  right.appendChild(avWrap);

  nav.appendChild(right);
  return nav;
}

// ── Build Category Pills ──────────────────────────────────────────────────────
function buildCategories() {
  const wrap = el('div', 'categories');
  CATEGORIES.forEach((cat, i) => {
    const pill = el('button', 'pill' + (i === 0 ? ' active' : ''), cat);
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      showToast(`Showing: ${cat}`);
    });
    wrap.appendChild(pill);
  });
  return wrap;
}

// ── Build Pin Card ────────────────────────────────────────────────────────────
function buildPinCard(pin, delay) {
  const card = el('div', 'pin-card');
  card.style.animationDelay = delay + 'ms';

  // Image
  const imgWrap = el('div', 'pin-img-wrap');
  const img = el('img', 'pin-img');
  img.src = pin.img;
  img.alt = pin.title;
  img.style.height = pin.h + 'px';
  img.loading = 'lazy';

  // Overlay
  const overlay = el('div', 'pin-overlay');

  const saveBtn = el('button', 'save-btn', 'Save');
  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    saveBtn.textContent = 'Saved ✓';
    saveBtn.style.background = '#198754';
    showToast(`"${pin.title}" saved!`);
  });
  overlay.appendChild(saveBtn);

  const bottom = el('div', 'pin-actions-bottom');

  const shareBtn = el('button', 'pin-action-btn');
  shareBtn.innerHTML = SVG.share;
  shareBtn.title = 'Share';
  shareBtn.addEventListener('click', (e) => { e.stopPropagation(); showToast('Share link copied!'); });

  const moreBtn = el('button', 'pin-action-btn');
  moreBtn.innerHTML = SVG.dots;
  moreBtn.title = 'More options';
  moreBtn.addEventListener('click', (e) => { e.stopPropagation(); showToast('More options'); });

  const heartBtn = el('button', 'pin-action-btn');
  heartBtn.innerHTML = SVG.heart;
  heartBtn.title = 'Reaction';
  heartBtn.addEventListener('click', (e) => { e.stopPropagation(); showToast('Reaction added!'); });

  bottom.appendChild(shareBtn);
  bottom.appendChild(heartBtn);
  bottom.appendChild(moreBtn);
  overlay.appendChild(bottom);

  imgWrap.appendChild(img);
  imgWrap.appendChild(overlay);
  card.appendChild(imgWrap);

  // Meta
  const meta = el('div', 'pin-meta');
  const title = el('div', 'pin-title', pin.title);
  const source = el('div', 'pin-source', pin.src);
  const author = el('div', 'pin-author');
  const avImg = el('img', 'author-avatar');
  avImg.src = pin.av;
  avImg.alt = pin.author;
  const name = el('span', 'author-name', pin.author);
  author.appendChild(avImg);
  author.appendChild(name);
  meta.appendChild(title);
  meta.appendChild(source);
  meta.appendChild(author);
  card.appendChild(meta);

  card.addEventListener('click', () => showToast(`Opening "${pin.title}"…`));
  return card;
}

// ── Build Masonry ─────────────────────────────────────────────────────────────
function buildMasonry() {
  const grid = el('div', 'masonry');
  PINS.forEach((pin, i) => {
    grid.appendChild(buildPinCard(pin, i * 35));
  });
  return grid;
}

// ── Infinite scroll (loads more pins) ────────────────────────────────────────
function setupInfiniteScroll(grid) {
  let loading = false;
  window.addEventListener('scroll', () => {
    if (loading) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
      loading = true;
      showToast('Loading more…');
      setTimeout(() => {
        const shuffled = [...PINS].sort(() => Math.random() - 0.5).slice(0, 8);
        shuffled.forEach((pin, i) => {
          const card = buildPinCard(
            { ...pin, id: Date.now() + i },
            i * 35
          );
          grid.appendChild(card);
        });
        loading = false;
      }, 800);
    }
  });
}

// ── Mount ─────────────────────────────────────────────────────────────────────
function init() {
  const main = el('div', 'main');
  const grid = buildMasonry();
  main.appendChild(grid);

  document.body.appendChild(buildNavbar());
  document.body.appendChild(buildCategories());
  document.body.appendChild(main);

  setupInfiniteScroll(grid);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
