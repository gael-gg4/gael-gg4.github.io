const scrollLimit = 80;

function updateHeaderOnScroll() {
  document.body.classList.toggle(
    'is-scrolled',
    window.scrollY > scrollLimit
  );
}

window.addEventListener('scroll', updateHeaderOnScroll, {
  passive: true
});

updateHeaderOnScroll();