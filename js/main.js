// deskedh — base interactions
// This is a placeholder home for future custom animations/graphics.

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll-reveal for cards and sections
  const revealTargets = document.querySelectorAll(
    '.product-card, .how-step, .price-card, .mission__inner, .waitlist__inner'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
});

/*
  ------------------------------------------------------------
  Space reserved for custom animation / graphics code.
  Drop hero canvas/WebGL/particle effects, data-ribbon
  animations, etc. here or in a new js/ file and import
  it from index.html.
  ------------------------------------------------------------
*/
