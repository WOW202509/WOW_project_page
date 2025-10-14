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

  // Active section highlighting
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = links.find(a => a.getAttribute('href') === `#${id}`);
      if (!navLink) return;
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  document.querySelectorAll('main section[id]').forEach(sec => observer.observe(sec));

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // No slider needed now (single demo video placeholder)
})();

