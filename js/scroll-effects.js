// Scroll effects: reveal-on-scroll and parallax
(function(){
  // Reveal on scroll
  const revealSelector = '.reveal, .card, .intro-img, .flex-cards > div';
  const reveals = document.querySelectorAll(revealSelector);

  const ioOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      } else {
        // keep in-view for better UX; comment next line to re-hide
        //entry.target.classList.remove('in-view');
      }
    });
  }, ioOptions);

  reveals.forEach(el => observer.observe(el));

  // Parallax effect for hero background and hero image
  const hero = document.querySelector('.hero');
  const heroImg = document.querySelector('.intro-img');
  // Only apply mousemove parallax on devices with a fine pointer (mouse).
  // This avoids mobile/touch devices receiving large transforms that can
  // contribute to layout/overflow issues.
  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e)=>{
      if(!hero) return;
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // subtle transform
      if(heroImg) heroImg.style.transform = `translate(${x*6}px, ${y*6}px) scale(1.01)`;
    });
  } else {
    // Ensure hero image has no transform on touch devices
    if(heroImg) heroImg.style.transform = 'none';
  }

  // Parallax on scroll for hero background
  window.addEventListener('scroll', ()=>{
    if(!hero) return;
    const scrolled = window.scrollY;
    hero.style.backgroundPosition = `center calc(50% + ${scrolled * 0.08}px)`;
  }, { passive: true });

  // Slow down explore-track animation on hover and on pointer
  const exploreTrack = document.querySelector('.explore-track');
  if(exploreTrack){
    exploreTrack.addEventListener('pointerenter', ()=>{
      exploreTrack.style.animationPlayState = 'paused';
    });
    exploreTrack.addEventListener('pointerleave', ()=>{
      exploreTrack.style.animationPlayState = '';
    });
  }

  // Snap-on-wheel / touch support between main sections (.hero and .flex-cards)
  const sections = Array.from(document.querySelectorAll('.hero, .flex-cards'));
  let isScrolling = false;

  // Runtime snap enabling: only enable on devices with fine pointer, sufficient viewport,
  // and where user hasn't zoomed in / increased page scale significantly.
  const body = document.body;
  function detectSnapSupport(){
    // Prefer fine pointer (mouse) and not small mobile widths
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const viewportMin = window.innerWidth >= 900 && window.innerHeight >= 600;

    // Heuristic for user zoom / page scale: compare visual viewport to layout viewport when available
    let scaleOk = true;
    if(window.visualViewport){
      const scale = Math.round(window.visualViewport.scale * 100) / 100;
      // if scaled more than 1.15x, treat as zoomed in
      scaleOk = scale <= 1.15;
    }

    return hasFinePointer && viewportMin && scaleOk;
  }

  function updateSnapEnabled(){
    if(detectSnapSupport()){
      body.classList.add('snap-enabled');
      enableSnapHandlers();
    } else {
      body.classList.remove('snap-enabled');
      disableSnapHandlers();
    }
  }

  function scrollToSection(index){
    if(isScrolling || index < 0 || index >= sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    // unlock after animation
    setTimeout(()=>{ isScrolling = false; }, 750);
  }

  let currentSection = 0;
  function updateCurrentSection(){
    const scrollTop = window.scrollY;
    let closest = 0; let closestDist = Infinity;
    sections.forEach((s,i)=>{
      const rect = s.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const dist = Math.abs(top - scrollTop);
      if(dist < closestDist){ closestDist = dist; closest = i; }
    });
    currentSection = closest;
  }

  // We'll attach and remove the wheel/touch handlers dynamically depending on support.
  let wheelHandler = null;
  let touchStartY = null;

  function enableSnapHandlers(){
    if(wheelHandler) return; // already enabled
    wheelHandler = function(e){
      if(Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      updateCurrentSection();
      if(e.deltaY > 0){ scrollToSection(currentSection + 1); }
      else { scrollToSection(currentSection - 1); }
    };
    window.addEventListener('wheel', wheelHandler, { passive: false });

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  }

  function disableSnapHandlers(){
    if(wheelHandler) {
      window.removeEventListener('wheel', wheelHandler, { passive: false });
      wheelHandler = null;
    }
    window.removeEventListener('touchstart', onTouchStart, { passive: true });
    window.removeEventListener('touchend', onTouchEnd, { passive: true });
  }

  // Touch swipe support handlers (used when snapping is enabled)
  function onTouchStart(e){ touchStartY = e.touches[0].clientY; }
  function onTouchEnd(e){
    if(touchStartY === null) return;
    const touchEndY = (e.changedTouches && e.changedTouches[0].clientY) || 0;
    const diff = touchStartY - touchEndY;
    if(Math.abs(diff) < 40) { touchStartY = null; return; }
    updateCurrentSection();
    if(diff > 0) scrollToSection(currentSection + 1);
    else scrollToSection(currentSection - 1);
    touchStartY = null;
  }

  // Initialize snap-enabled state and update on viewport changes
  updateSnapEnabled();
  window.addEventListener('resize', ()=>{ updateSnapEnabled(); }, { passive: true });
  if(window.visualViewport){ window.visualViewport.addEventListener('resize', ()=>{ updateSnapEnabled(); }); }
})();
