/**
 * main.js — Jackie Ng profile site
 * Minimal vanilla JS: IntersectionObserver fade-up only.
 * No external libraries. No animation if prefers-reduced-motion.
 */

(function () {
  'use strict';

  // Respect reduced-motion preference — leave all .fade-up as visible
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const targets = document.querySelectorAll('.fade-up');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
