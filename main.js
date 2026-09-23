(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ─── Frame config ───────────────────────────────────────────────────────────
  // Frame sequences are optional. If the frames_1_desktop / frames_1_mobile
  // folders don't exist, the hero falls back to the hero-stage.jpg static image.
  const HERO_FRAME_COUNT = 147;
  const VT_FRAME_COUNT = 168;
  const HERO_CRITICAL_COUNT = 15;
  const VT_CRITICAL_COUNT = 15;
  const FRAME_EVICT_WINDOW = 20;

  let heroFrameSet = null;
  let vtFrameSet = null;
  let heroHasFrames = false;
  let vtHasFrames = false;

  function getTier() {
    return window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop';
  }

  function requestIdle(cb) {
    if (window.requestIdleCallback) return window.requestIdleCallback(cb);
    return setTimeout(() => cb({ timeRemaining: () => 10 }), 100);
  }

  function buildFrameArray(folderPrefix, tier, count) {
    const frames = [];
    for (let i = 0; i < count; i++) {
      frames.push(new Image());
    }

    function srcFor(index) {
      return `${folderPrefix}_${tier}/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
    }

    function load(index) {
      const img = frames[index];
      if (img && !img.getAttribute('src')) img.src = srcFor(index);
    }

    function evictOutsideWindow(centerIndex, windowSize) {
      const lo = centerIndex - windowSize;
      const hi = centerIndex + windowSize;
      for (let i = 0; i < frames.length; i++) {
        if (i < lo || i > hi) {
          if (frames[i].getAttribute('src')) frames[i].removeAttribute('src');
        } else {
          load(i);
        }
      }
    }

    function loadRemainingIdle(fromIndex) {
      let nextIndex = fromIndex;
      function step(deadline) {
        let processed = 0;
        while (nextIndex < frames.length && (deadline.timeRemaining() > 0 || processed < 2)) {
          load(nextIndex);
          nextIndex++;
          processed++;
        }
        if (nextIndex < frames.length) requestIdle(step);
      }
      requestIdle(step);
    }

    return { frames, load, evictOutsideWindow, loadRemainingIdle };
  }

  // ─── Probe whether a frame folder exists ────────────────────────────────────
  function probeFrameFolder(folderPrefix, tier, callback) {
    const testSrc = `${folderPrefix}_${tier}/ezgif-frame-001.jpg`;
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = testSrc;
  }

  // ─── Hero ────────────────────────────────────────────────────────────────────
  function initHero(hasFrames) {
    const canvas = document.getElementById('heroCanvas');
    const fallback = document.getElementById('heroFallback');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!hasFrames) {
      // Static fallback — hero-stage.jpg shown via CSS background
      if (canvas) canvas.style.display = 'none';
      if (fallback) fallback.style.display = 'block';
    } else {
      if (fallback) fallback.style.display = 'none';
      if (canvas) canvas.style.display = 'block';
    }

    const frameSet = heroFrameSet || buildFrameArray('frames_1', getTier(), HERO_FRAME_COUNT);
    const frames = hasFrames ? frameSet.frames : [];
    let currentFrame = 0;

    if (hasFrames) {
      frameSet.loadRemainingIdle(HERO_CRITICAL_COUNT);
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (hasFrames) drawFrame(currentFrame);
    }

    function drawFrame(index) {
      const img = frames[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    if (hasFrames) {
      const waitForFirst = setInterval(() => {
        if (frames[0] && frames[0].complete) {
          clearInterval(waitForFirst);
          drawFrame(0);
        }
      }, 50);
    }

    // Entrance animation — runs regardless of frames
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero__tag',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, 0.3)
      .fromTo('.hero__line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18 }, 0.5)
      .fromTo('.hero__sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }, 1.0)
      .fromTo('.hero__proof',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, 1.3)
      .fromTo('.hero__proof-item',
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 1.4)
      .fromTo('.btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, 1.8)
      .fromTo('.hero__scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1 }, 2.1);

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.hero__pin',
      pinSpacing: false,
    });

    if (hasFrames) {
      const frameObj = { frame: 0 };
      gsap.to(frameObj, {
        frame: HERO_FRAME_COUNT - 1,
        ease: 'none',
        snap: 'frame',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        onUpdate: () => {
          const idx = Math.round(frameObj.frame);
          if (idx !== currentFrame) {
            currentFrame = idx;
            drawFrame(currentFrame);
            frameSet.evictOutsideWindow(currentFrame, FRAME_EVICT_WINDOW);
          }
        },
      });
    }

    gsap.to('.hero__content', {
      y: -120,
      opacity: 0,
      scale: 0.92,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '5% top',
        end: '18% top',
        scrub: true,
      },
    });

    gsap.to('.hero__scroll-indicator', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '2% top',
        end: '8% top',
        scrub: true,
      },
    });
  }

  // ─── Video Transition ────────────────────────────────────────────────────────
  function initVideoTransition(hasFrames) {
    const section = document.querySelector('.video-transition');
    if (!section) return;

    const canvas = document.getElementById('vtCanvas');
    const fallbackEl = section.querySelector('.video-transition__fallback');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!hasFrames) {
      canvas.style.display = 'none';
      if (fallbackEl) fallbackEl.style.display = 'block';
    } else {
      if (fallbackEl) fallbackEl.style.display = 'none';
      canvas.style.display = 'block';
    }

    if (hasFrames) {
      vtFrameSet = buildFrameArray('frames_2', getTier(), VT_FRAME_COUNT);
      const vtFrames = vtFrameSet.frames;
      let vtCurrentFrame = 0;

      const vtCriticalCount = Math.min(VT_CRITICAL_COUNT, VT_FRAME_COUNT);
      for (let i = 0; i < vtCriticalCount; i++) {
        vtFrameSet.load(i);
      }
      vtFrameSet.loadRemainingIdle(vtCriticalCount);

      function resizeVtCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawVtFrame(vtCurrentFrame);
      }

      function drawVtFrame(index) {
        if (index < 0 || index >= vtFrames.length) return;
        const img = vtFrames[index];
        if (!img.complete || !img.naturalWidth) return;

        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
        vtCurrentFrame = index;
      }

      window.addEventListener('resize', resizeVtCanvas);
      resizeVtCanvas();

      const waitForVtFirst = setInterval(() => {
        if (vtFrames[0] && vtFrames[0].complete) {
          clearInterval(waitForVtFirst);
          drawVtFrame(0);
        }
      }, 50);

      const vtScrub = { frame: 0 };
      gsap.to(vtScrub, {
        frame: VT_FRAME_COUNT - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
        onUpdate: () => {
          const idx = Math.round(vtScrub.frame);
          drawVtFrame(idx);
          vtFrameSet.evictOutsideWindow(idx, FRAME_EVICT_WINDOW);
        },
      });
    }

    // Clip-path reveal animation (runs with or without frames)
    const isLowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        pin: '.video-transition__inner',
      },
    });

    tl.fromTo('.video-transition__frame',
      { clipPath: 'inset(30% 25% 30% 25% round 20px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, ease: 'none' },
      0
    );

    if (!isLowEnd) {
      tl.fromTo('#vtCanvas',
        { scale: 1.3 },
        { scale: 1, duration: 1, ease: 'none' },
        0
      );
    }

    tl.to('.video-transition__overlay', {
      opacity: 0.1,
      duration: 0.6,
      ease: 'none',
    }, 0.3)
    .fromTo('.vt-word',
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'power3.out' },
      0.35
    )
    .fromTo('.vt-dot',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.15, stagger: 0.08, ease: 'back.out(3)' },
      0.4
    )
    .to(['.vt-word', '.vt-dot'], {
      opacity: 0,
      y: -30,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power2.in',
    }, 0.75)
    .to('.video-transition__frame', {
      clipPath: 'inset(5% 5% 5% 5% round 12px)',
      duration: 0.25,
      ease: 'none',
    }, 0.8)
    .to('.video-transition__overlay', {
      opacity: 0.7,
      duration: 0.2,
      ease: 'none',
    }, 0.8);
  }

  // ─── Intro / About ───────────────────────────────────────────────────────────
  function initIntro() {
    gsap.fromTo('.intro__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.intro__label', start: 'top 85%' }
      }
    );

    const introHeading = document.querySelector('.intro__heading');
    if (introHeading) {
      splitTextIntoSpans(introHeading);
      const words = introHeading.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: introHeading, start: 'top 80%' }
        }
      );
    }

    gsap.utils.toArray('.intro__col').forEach((col, i) => {
      gsap.fromTo(col,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: col, start: 'top 85%' }
        }
      );
    });

    gsap.utils.toArray('.stat').forEach((stat, i) => {
      gsap.fromTo(stat,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: '.intro__stats', start: 'top 85%' }
        }
      );
    });
  }

  // ─── Recognition ─────────────────────────────────────────────────────────────
  function initRecognition() {
    const items = gsap.utils.toArray('.recog-item');
    const numberEl = document.querySelector('.recognition__number');
    const bgEl = document.querySelector('.recognition__bg-gradient');

    if (bgEl) {
      ScrollTrigger.create({
        trigger: '.recognition',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => { bgEl.style.opacity = '1'; },
        onLeave: () => { bgEl.style.opacity = '0'; },
        onEnterBack: () => { bgEl.style.opacity = '1'; },
        onLeaveBack: () => { bgEl.style.opacity = '0'; },
      });
    }

    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 75%',
        end: 'bottom 25%',
        onEnter: () => activate(item, i),
        onEnterBack: () => activate(item, i),
        onLeave: () => deactivate(item),
        onLeaveBack: () => deactivate(item),
      });
    });

    function activate(item, index) {
      item.classList.add('is-visible');
      if (numberEl) numberEl.textContent = String(index + 1).padStart(2, '0');
    }
    function deactivate(item) {
      item.classList.remove('is-visible');
    }
  }

  // ─── Cinematic ───────────────────────────────────────────────────────────────
  function initCinematic() {
    const section = document.querySelector('.cinematic');
    if (!section) return;

    const countEl = section.querySelector('.cinematic__count');
    const lines = section.querySelectorAll('.cin-line');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        pin: '.cinematic__sticky',
        onUpdate: (self) => {
          if (countEl) {
            countEl.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
          }
        },
      },
    });

    tl.fromTo('.cinematic__counter',
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo('.cinematic__video-frame',
      { clipPath: 'inset(48% 40% 48% 40% round 8px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.6, ease: 'none' },
      0
    )
    .fromTo('.cinematic__gradient-bg',
      { scale: 1.6 },
      { scale: 1, duration: 0.6, ease: 'none' },
      0
    )
    .fromTo(lines,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.2, stagger: 0.06, ease: 'power3.out' },
      0.45
    )
    .to(lines, {
      y: -40, opacity: 0, duration: 0.15, stagger: 0.03, ease: 'power2.in',
    }, 0.8)
    .to('.cinematic__video-frame', {
      clipPath: 'inset(10% 10% 10% 10% round 16px)',
      duration: 0.2,
      ease: 'none',
    }, 0.85)
    .to('.cinematic__counter', {
      opacity: 0,
      duration: 0.1,
    }, 0.9);
  }

  // ─── Competitions ─────────────────────────────────────────────────────────────
  function initCompetitions() {
    gsap.fromTo('.competitions__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.competitions__label', start: 'top 85%' }
      }
    );

    const compHeading = document.querySelector('.competitions__heading');
    if (compHeading) {
      splitTextIntoSpans(compHeading);
      const words = compHeading.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: compHeading, start: 'top 80%' }
        }
      );
    }

    gsap.utils.toArray('.comp-card').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.08 });
          card.classList.add('is-visible');
        },
      });
    });
  }

  // ─── AtomBios ─────────────────────────────────────────────────────────────────
  function initAtomBios() {
    gsap.fromTo('.atombios__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.atombios__label', start: 'top 85%' }
      }
    );

    const atomHeading = document.querySelector('.atombios__heading');
    if (atomHeading) {
      splitTextIntoSpans(atomHeading);
      const words = atomHeading.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: atomHeading, start: 'top 80%' }
        }
      );
    }

    gsap.utils.toArray('.reveal-up').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });
  }

  // ─── Media & Speaking ────────────────────────────────────────────────────────
  function initMedia() {
    gsap.fromTo('.media__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.media__label', start: 'top 85%' }
      }
    );

    const mediaHeading = document.querySelector('.media__heading');
    if (mediaHeading) {
      splitTextIntoSpans(mediaHeading);
      const words = mediaHeading.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: mediaHeading, start: 'top 80%' }
        }
      );
    }

    gsap.utils.toArray('.media-card').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1 });
          card.classList.add('is-visible');
        },
      });
    });

    gsap.utils.toArray('.speaking-item').forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.06 });
          item.classList.add('is-visible');
        },
      });
    });
  }

  // ─── Education ───────────────────────────────────────────────────────────────
  function initEducation() {
    gsap.fromTo('.education__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.education__label', start: 'top 85%' }
      }
    );

    gsap.utils.toArray('.edu-card').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.12 });
          card.classList.add('is-visible');
        },
      });
    });
  }

  // ─── Contact ─────────────────────────────────────────────────────────────────
  function initContact() {
    gsap.fromTo('.contact__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.contact__label', start: 'top 85%' }
      }
    );

    const contactHeading = document.querySelector('.contact__heading');
    if (contactHeading) {
      splitTextIntoSpans(contactHeading);
      const words = contactHeading.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: contactHeading, start: 'top 80%' }
        }
      );
    }

    gsap.fromTo('.contact__email',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__email', start: 'top 85%' }
      }
    );

    gsap.fromTo('.contact__socials-row',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__socials-row', start: 'top 85%' }
      }
    );
  }

  // ─── Text splitting helper ────────────────────────────────────────────────────
  function splitTextIntoSpans(element) {
    const html = element.innerHTML;
    const fragments = html.split(/(<[^>]+>)/);
    let result = '';

    fragments.forEach(fragment => {
      if (fragment.startsWith('<')) {
        result += fragment;
      } else {
        const words = fragment.split(/(\s+)/);
        words.forEach(word => {
          if (word.trim()) {
            result += `<span class="word" style="display:inline-block">${word}</span>`;
          } else {
            result += word;
          }
        });
      }
    });

    element.innerHTML = result;
    element.style.opacity = '1';
  }

  // ─── Smooth anchor scrolling ──────────────────────────────────────────────────
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1.2,
          ease: 'power3.inOut',
        });
      });
    });
  }

  // ─── Preloader ───────────────────────────────────────────────────────────────
  function initPreloader(onComplete) {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloaderBar');
    const pctEl = document.getElementById('preloaderPct');
    if (!preloader) { onComplete(false, false); return; }

    document.body.classList.add('is-loading');

    let loaded = 0;
    let total = 0;
    let displayPct = 0;
    let targetPct = 0;
    let rafId;

    const resources = [];

    // Always probe frame folder — don't pre-load frames in preloader;
    // just count fonts and visible images for speed.
    document.querySelectorAll('img[src]').forEach(img => {
      total++;
      resources.push({ type: 'image', el: img });
    });

    if (document.fonts && document.fonts.ready) {
      total++;
      resources.push({ type: 'fonts' });
    }

    if (total === 0) total = 1;

    function tick() {
      targetPct = Math.min(Math.round((loaded / total) * 100), 100);
    }

    function markLoaded() {
      loaded++;
      tick();
    }

    resources.forEach(r => {
      if (r.type === 'image') {
        const img = r.el;
        if (img.complete && img.naturalWidth > 0) {
          markLoaded();
        } else {
          img.addEventListener('load', markLoaded, { once: true });
          img.addEventListener('error', markLoaded, { once: true });
        }
      } else if (r.type === 'fonts') {
        document.fonts.ready.then(markLoaded);
      }
    });

    function animateCounter() {
      displayPct += (targetPct - displayPct) * 0.12;
      const rounded = Math.round(displayPct);

      pctEl.textContent = rounded;
      bar.style.width = rounded + '%';

      if (rounded >= 100 && targetPct >= 100) {
        cancelAnimationFrame(rafId);
        pctEl.textContent = '100';
        bar.style.width = '100%';
        setTimeout(revealSite, 400);
        return;
      }

      rafId = requestAnimationFrame(animateCounter);
    }
    rafId = requestAnimationFrame(animateCounter);

    const maxWait = setTimeout(() => {
      targetPct = 100;
      loaded = total;
    }, 8000);

    function revealSite() {
      clearTimeout(maxWait);
      document.body.classList.remove('is-loading');

      const tlOut = gsap.timeline({
        onComplete: () => {
          preloader.remove();
          onComplete();
        },
      });

      tlOut
        .to('.preloader__counter', {
          y: -20, opacity: 0, duration: 0.4, ease: 'power2.in',
        }, 0)
        .to('.preloader__bar-wrap', {
          scaleX: 0, opacity: 0, duration: 0.4, ease: 'power2.in',
        }, 0.1)
        .to('.preloader__logo', {
          y: -20, opacity: 0, duration: 0.4, ease: 'power2.in',
        }, 0.15)
        .to(preloader, {
          yPercent: -100, duration: 0.8, ease: 'power3.inOut',
        }, 0.4);
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    initPreloader(() => {
      // Probe hero frames; start everything after knowing status
      probeFrameFolder('frames_1', getTier(), (heroFramesExist) => {
        heroHasFrames = heroFramesExist;

        if (heroFramesExist) {
          heroFrameSet = buildFrameArray('frames_1', getTier(), HERO_FRAME_COUNT);
          const criticalCount = Math.min(HERO_CRITICAL_COUNT, HERO_FRAME_COUNT);
          for (let i = 0; i < criticalCount; i++) {
            heroFrameSet.load(i);
          }
        }

        probeFrameFolder('frames_2', getTier(), (vtFramesExist) => {
          vtHasFrames = vtFramesExist;

          initHero(heroFramesExist);
          initVideoTransition(vtFramesExist);
          initIntro();
          initRecognition();
          initCinematic();
          initCompetitions();
          initAtomBios();
          initMedia();
          initEducation();
          initContact();
          requestIdle(() => initSmoothAnchors());
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
