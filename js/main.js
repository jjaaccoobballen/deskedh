document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector('.waitlist-form');
  const status = document.querySelector('.form-status');

  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    if (form.action.includes('YOUR_FORM_ID')) {
      event.preventDefault();
      status.textContent = 'Waitlist signups will open soon. Check back shortly.';
    }
  });

  const statementRender = document.querySelector('.statement__render');

  if (statementRender) {
    const renderObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      },
      { threshold: 0.25 }
    );

    renderObserver.observe(statementRender);
  }

  const carousel = document.querySelector('.product-carousel__track');
  const carouselControls = document.querySelectorAll('.product-carousel__controls button');
  const carouselSlides = document.querySelectorAll('.product-carousel__slide');

  if (!carousel || !carouselControls.length) return;

  const setActiveControl = () => {
    const activeIndex = Math.round(carousel.scrollLeft / carousel.clientWidth);
    carouselControls.forEach((control, index) => {
      control.setAttribute('aria-current', String(index === activeIndex));
    });

    carouselSlides.forEach((slide, index) => {
      const distance = (carousel.scrollLeft / carousel.clientWidth) - index;
      const amount = Math.min(Math.abs(distance), 1);
      const product = slide.querySelector('.hero__product');

      product.style.opacity = String(1 - amount * 0.55);
    });
  };

  carouselControls.forEach((control, index) => {
    control.addEventListener('click', () => {
      carousel.scrollTo({ left: carousel.clientWidth * index, behavior: 'smooth' });
    });
  });

  carousel.addEventListener('scroll', setActiveControl, { passive: true });
  setActiveControl();
});
