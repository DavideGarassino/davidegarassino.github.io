// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Highlight the nav link of the section on screen
const links = [...nav.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// Fade in elements as they scroll into view
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

// Playtest carousel: arrows scroll one image; hidden when everything fits
document.querySelectorAll('.carousel').forEach(car => {
  const track = car.querySelector('.car-track');
  const [prev, next] = car.querySelectorAll('.car-btn');
  const step = () => (track.querySelector('.shot')?.offsetWidth || 230) + 16;
  const update = () => {
    car.classList.toggle('fits', track.scrollWidth <= track.clientWidth + 1);
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };
  car.querySelectorAll('.car-btn').forEach(b => b.addEventListener('click', () => track.scrollBy({ left: step() * Number(b.dataset.dir) })));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
});

document.getElementById('year').textContent = new Date().getFullYear();
