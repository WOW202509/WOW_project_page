(function(){
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth scroll and close mobile menu
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      history.replaceState(null, '', id);
    });
  });

  // Active section highlighting (scroll spy)
  // Track intersection ratios and highlight the link for the section
  // that occupies the most space in the viewport.
  const sections = Array.from(document.querySelectorAll('main section[id]'))
    .filter(sec => links.some(a => a.getAttribute('href') === `#${sec.id}`));

  const ratioById = Object.fromEntries(sections.map(s => [s.id, 0]));

  const updateActive = () => {
    let bestId = null;
    let bestRatio = 0;
    for (const [id, r] of Object.entries(ratioById)) {
      if (r > bestRatio) { bestRatio = r; bestId = id; }
    }
    if (!bestId) return;
    const activeHref = `#${bestId}`;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === activeHref));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      ratioById[id] = entry.intersectionRatio;
    });
    updateActive();
  }, { root: null, rootMargin: '0px 0px -35% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });

  sections.forEach(sec => observer.observe(sec));

  // Initialize once in case we load mid-page
  updateActive();

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // No slider needed now (single demo video placeholder)
})();

