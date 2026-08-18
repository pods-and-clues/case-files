(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.case-home__hero');
  if (!hero || reduceMotion.matches) return;

  const grid = hero.querySelector('.case-home__parallax--grid');
  const glow = hero.querySelector('.case-home__parallax--glow');
  let pointerX = 0;
  let pointerY = 0;
  let frame;

  const update = () => {
    const { top, height } = hero.getBoundingClientRect();
    const scrollOffset = Math.max(-1, Math.min(1, (top + height / 2) / window.innerHeight - .5));
    grid.style.transform = `translate(${pointerX * -10}px, ${scrollOffset * -20}px)`;
    glow.style.transform = `translate(${24 + pointerX * 2}%, ${-15 + pointerY * 2 + scrollOffset * 4}%)`;
    frame = undefined;
  };

  const requestUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - .5;
    pointerY = (event.clientY - bounds.top) / bounds.height - .5;
    requestUpdate();
  });
  hero.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; requestUpdate(); });
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  requestUpdate();
})();
