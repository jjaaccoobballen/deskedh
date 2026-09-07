document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector('.waitlist-form');
  const status = document.querySelector('.form-status');

  if (form && status) {
    form.addEventListener('submit', (event) => {
      if (form.action.includes('YOUR_FORM_ID')) {
        event.preventDefault();
        status.textContent = 'Waitlist signups will open soon. Check back shortly.';
      }
    });
  }

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

  const statementModel = document.querySelector('.statement__model');

  if (statementModel) {
    const modelObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (typeof entry.target.dismissPoster === 'function') {
          entry.target.dismissPoster();
        }
        observer.unobserve(entry.target);
      },
      { threshold: 0.2 }
    );

    modelObserver.observe(statementModel);
  }

  // --- 3D model color customization ---
  const modelViewer = document.getElementById('deskedh-model');
  const customizeToggle = document.getElementById('customize-toggle');
  const customizePanel = document.getElementById('customize-panel');
  const bodySlider = document.getElementById('body-color-slider');
  const standSlider = document.getElementById('stand-color-slider');

  if (customizeToggle && customizePanel) {
    customizeToggle.addEventListener('click', () => {
      const isOpen = !customizePanel.hidden;
      customizePanel.hidden = isOpen;
      customizeToggle.setAttribute('aria-expanded', String(!isOpen));
      customizeToggle.textContent = isOpen ? 'Customize' : 'Hide customize';
    });
  }

  if (modelViewer) {
    let bodyMaterials = [];
    let standMaterials = [];

    const BODY_MATERIAL_NAME = 'screenbodywhole';
    const STAND_MATERIAL_NAME = 'standdeskedhfinal';

    const hueToRgb = (hue) => {
      const h = hue / 360;
      const s = 0.55;
      const l = 0.5;
      const k = (n) => (n + h * 12) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [f(0), f(8), f(4)];
    };

    const applyHueToMaterials = (materials, hue) => {
      const [r, g, b] = hueToRgb(hue);
      materials.forEach((material) => {
        if (material && material.pbrMetallicRoughness) {
          material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
        }
      });
    };

    const classifyMaterials = () => {
      const materials = modelViewer.model ? modelViewer.model.materials : [];
      bodyMaterials = materials.filter(
        (material) => (material.name || '').toLowerCase() === BODY_MATERIAL_NAME
      );
      standMaterials = materials.filter(
        (material) => (material.name || '').toLowerCase() === STAND_MATERIAL_NAME
      );
    };

    modelViewer.addEventListener('load', classifyMaterials);

    if (bodySlider) {
      bodySlider.addEventListener('input', () => {
        applyHueToMaterials(bodyMaterials, Number(bodySlider.value));
      });
    }

    if (standSlider) {
      standSlider.addEventListener('input', () => {
        applyHueToMaterials(standMaterials, Number(standSlider.value));
      });
    }
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
