(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar = document.getElementById('nav-bar');
  const plate = document.getElementById('hero-plate');

  const onScroll = () => {
    const y = window.scrollY || 0;
    if (bar) bar.style.borderBottomColor = y > 24 ? 'var(--color-divider)' : 'transparent';
    if (plate && !reduced) plate.style.transform = 'translateY(' + Math.max(-26, -y * 0.045) + 'px)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!reduced && 'IntersectionObserver' in window) {
    const items = Array.from(document.querySelectorAll('[data-reveal]'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.04, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));
    setTimeout(() => {
      items.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.1) el.classList.add('is-visible');
      });
    }, 2200);
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }
})();
