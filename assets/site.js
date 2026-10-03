// Mobile menu toggle + current year in footer.
document.querySelector('.nav-toggle')?.addEventListener('click', (e) => {
  const nav = document.getElementById('site-nav');
  const open = nav.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', open);
});
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
