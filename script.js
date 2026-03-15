// ============================================================
// NAV: highlight active link, shrink on scroll
// ============================================================
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 10
    ? 'rgba(17,17,16,0.12)'
    : 'rgba(17,17,16,0.08)';
});

// ============================================================
// WORK PAGE: filter buttons
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectItems.forEach(item => {
      const cats = item.dataset.category || '';
      if (filter === 'all' || cats.includes(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ============================================================
// SKILL BARS: animate on scroll (resume page)
// ============================================================
const skillFills = document.querySelectorAll('.skill-fill');

if (skillFills.length > 0) {
  // Store target widths, then set to 0 to animate in
  skillFills.forEach(fill => {
    fill.dataset.target = fill.style.width;
    fill.style.width = '0%';
  });

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.target;
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObserver.observe(fill));
}

// ============================================================
// FADE-IN: sections animate on scroll
// ============================================================
const fadeEls = document.querySelectorAll(
  '.work-card, .project-item, .timeline-item, .hcard'
);

if ('IntersectionObserver' in window && fadeEls.length > 0) {
  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.style.transform
      ? el.style.transform + ' translateY(20px)'
      : 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.style.transform.replace(
            'translateY(20px)', 'translateY(0)'
          );
        }, 60 * i);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => fadeObserver.observe(el));
}
