// Mobile menu toggle.
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = document.getElementById('site-nav').classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Lightbox for photo galleries.
document.querySelectorAll('[data-lightbox]').forEach((gallery) => {
  const links = [...gallery.querySelectorAll('a')];
  let box, pic, index = 0;

  const show = (i) => {
    index = (i + links.length) % links.length;
    pic.src = links[index].href;
    pic.alt = links[index].querySelector('img')?.alt || '';
  };
  const close = () => { box.classList.remove('open'); document.body.style.overflow = ''; links[index].focus(); };

  const build = () => {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<img alt=""><button class="close" aria-label="Close">&times;</button>' +
      '<button class="prev" aria-label="Previous">&lsaquo;</button><button class="next" aria-label="Next">&rsaquo;</button>';
    pic = box.querySelector('img');
    box.querySelector('.close').onclick = close;
    box.querySelector('.prev').onclick = () => show(index - 1);
    box.querySelector('.next').onclick = () => show(index + 1);
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
    document.body.appendChild(box);
  };

  links.forEach((a, i) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (!box) build();
    show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    box.querySelector('.close').focus();
  }));
});
