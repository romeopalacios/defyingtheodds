const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuBtn && navLinks) {
  menuBtn.innerHTML = '<span aria-hidden="true"></span>';
  menuBtn.setAttribute('aria-expanded', 'false');
  if (!navLinks.id) navLinks.id = 'primary-navigation';
  menuBtn.setAttribute('aria-controls', navLinks.id);

  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.querySelector('#form-status');
  if (status) status.textContent = 'Template ready — connect this form to your preferred email/form endpoint before publishing.';
});
