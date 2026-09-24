const header = document.querySelector(".site-header");

function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const steps = document.querySelectorAll(".step");
const visuals = document.querySelectorAll(".loop-stage img");
const stage = document.querySelector(".loop-stage");

if (stage && window.matchMedia("(min-width: 900px)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.dataset.step;
      steps.forEach((step) => step.classList.toggle("is-on", step.dataset.step === id));
      visuals.forEach((image) => image.classList.toggle("is-on", image.dataset.visual === id));
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] }
  );

  steps.forEach((step) => observer.observe(step));
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const entrances = document.querySelectorAll(".enter");

if (reduceMotion) {
  entrances.forEach((node) => node.classList.add("is-in"));
} else {
  const entranceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        entranceObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  entrances.forEach((node) => entranceObserver.observe(node));
}
