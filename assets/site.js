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

// Carousel arrows: scroll by most of a screen, hide an arrow at either end.
document.querySelectorAll('.carousel').forEach((car) => {
  const track = car.querySelector('.track');
  const prev = car.querySelector('.prev');
  const next = car.querySelector('.next');
  const update = () => {
    if (car.classList.contains('auto')) return;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  track.querySelectorAll('img').forEach((i) => i.addEventListener('load', update));
  update();
});

// Autoscrolling carousels: drift slowly to the left forever. The photos are repeated once so the
// loop is seamless; it keeps moving under the pointer, and pauses only while it has keyboard focus and for a few
// seconds after a swipe or an arrow press. Off for people who ask for reduced motion.
document.querySelectorAll('.carousel.auto').forEach((car) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const track = car.querySelector('.track');
  const originals = [...track.children];
  originals.forEach((a) => {
    const copy = a.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.tabIndex = -1;
    copy.addEventListener('click', (e) => { e.preventDefault(); a.click(); });
    track.appendChild(copy);
  });
  const period = () => track.children[originals.length].offsetLeft - originals[0].offsetLeft;
  const SPEED = 28; // pixels per second
  let holdUntil = 0, last = null, pos = 0;
  const hold = (ms) => { holdUntil = performance.now() + ms; };
  track.addEventListener('touchstart', () => hold(4000), { passive: true });
  track.addEventListener('wheel', () => hold(3000), { passive: true });
  car.querySelectorAll('.car-btn').forEach((b) => b.addEventListener('click', () => hold(3000)));
  car.querySelector('.prev').addEventListener('click', () => {
    if (track.scrollLeft < track.clientWidth) track.scrollLeft += period();
  }, { capture: true });
  track.addEventListener('scroll', () => {
    const p = period();
    if (track.scrollLeft >= p) track.scrollLeft -= p;
  }, { passive: true });
  const step = (t) => {
    // keyboard focus inside pauses it; a mouse click on an arrow does not
    const moving = !car.querySelector(':focus-visible') && t >= holdUntil;
    if (moving && last !== null) {
      pos += SPEED * (t - last) / 1000;
      const p = period();
      if (pos >= p) pos -= p;
      track.scrollLeft = pos;
    } else {
      pos = track.scrollLeft;
    }
    last = t;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
});

// Mailing-list boxes post to Kit. The thank-you appears the moment the button is pressed while the
// address is sent in the background; if Kit turns it down, the box comes back with Kit's reason.
// If the background request can't be made at all, the form is submitted to Kit normally.
document.querySelectorAll('.list-form').forEach((form) => {
  const msg = form.querySelector('.list-msg');
  const btn = form.querySelector('button');
  const say = (text, ok) => { msg.textContent = text; msg.classList.toggle('ok', ok); msg.classList.toggle('err', !ok); };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = new FormData(form);
    btn.disabled = true;
    form.classList.add('done');
    say('Welcome to the other side.', true);
    msg.classList.add('shimmer');
    try {
      const res = await fetch(form.action, { method: 'POST', body, headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (!(res.ok && data.status === 'success')) {
        const why = data.errors && data.errors.messages && data.errors.messages.join(' ');
        form.classList.remove('done');
        msg.classList.remove('shimmer');
        say(why || 'That didn’t go through. Please check the address and try again.', false);
        btn.disabled = false;
      }
    } catch (err) {
      form.submit();   // couldn't reach Kit in the background: let the browser post it instead
    }
  });
});
