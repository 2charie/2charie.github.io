(() => {
 const grid = document.querySelector('[data-project-grid]');
 if(!grid) return;
 const {card, escape} = PortfolioUI;
 const selectedOnly = grid.hasAttribute('data-selected');
 const projects = PORTFOLIO.projects;
 const render = category => {
   const list = selectedOnly ? projects.filter(project => project.featured).slice(0,4) : projects.filter(project => category === '전체' || project.categories.includes(category));
   grid.innerHTML = list.map(project => card(project, projects.indexOf(project))).join('');
   const results = document.querySelector('[data-results]');
   if(results) results.textContent = category + ' · ' + list.length + ' projects';
   const empty = document.querySelector('[data-empty]');
   if(empty) empty.hidden = list.length > 0;
 };
 render('전체');
 if(selectedOnly) return;
 const marquee = document.querySelector('[data-marquee]');
 const track = document.querySelector('[data-filter-track]');
 const categories = ['전체', ...PORTFOLIO.categories];
 track.innerHTML = '<div class="filter-group">' + categories.map(category => '<button class="filter-button" type="button" data-category="' + escape(category) + '" aria-pressed="' + (category === '전체') + '">' + escape(category) + '</button>').join('') + '</div>';
 const original = track.firstElementChild;
 const clone = original.cloneNode(true);
 clone.setAttribute('aria-hidden','true');
 clone.querySelectorAll('button').forEach(button => {button.tabIndex = -1;button.removeAttribute('aria-pressed');button.classList.toggle('is-active',button.dataset.category === '전체');});
 track.append(clone);
 const choose = category => {
   track.querySelectorAll('button').forEach(button => {const active = button.dataset.category === category;button.classList.toggle('is-active',active);if(!button.closest('[aria-hidden]')) button.setAttribute('aria-pressed',String(active));});
   render(category);
 };
 track.addEventListener('click', event => {const button = event.target.closest('[data-category]');if(button) choose(button.dataset.category);});
 document.querySelector('[data-reset]').addEventListener('click', () => {choose('전체');marquee.scrollLeft = 0;original.querySelector('button').focus();});
 let hovering = false, touching = false, manuallyPaused = false, interactionUntil = 0, previous = 0;
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const motion = document.querySelector('[data-motion-toggle]');
 motion.addEventListener('click', () => {manuallyPaused = !manuallyPaused;motion.setAttribute('aria-pressed',String(manuallyPaused));motion.innerHTML = manuallyPaused ? '자동 이동 재개 <span aria-hidden="true">▷</span>' : '자동 이동 일시정지 <span aria-hidden="true">Ⅱ</span>';});
 marquee.addEventListener('mouseenter', () => hovering = true);
 marquee.addEventListener('mouseleave', () => hovering = false);
 marquee.addEventListener('pointerdown', () => touching = true);
 window.addEventListener('pointerup', () => {if(touching) interactionUntil = performance.now() + 2000;touching = false;});
 window.addEventListener('pointercancel', () => touching = false);
 marquee.addEventListener('wheel', () => interactionUntil = performance.now() + 2000, {passive:true});
 marquee.addEventListener('focusin', event => {if(original.contains(event.target) && event.target.matches(':focus-visible')){const left = event.target.offsetLeft - original.offsetLeft;marquee.scrollLeft = Math.max(0,left - 20);}});
 // scrollLeft에 소수점이 반영되지 않는 브라우저에서도 일정 속도를 유지합니다.
 let position = 0;
 const animate = now => {
   const elapsed = previous ? Math.min(now - previous,50) : 0;previous = now;
   if(!reduced.matches && !manuallyPaused && !hovering && !touching && !marquee.contains(document.activeElement) && now > interactionUntil && !document.hidden){
     if(Math.abs(marquee.scrollLeft - position) > 2) position = marquee.scrollLeft;
     const width = original.getBoundingClientRect().width + 8;
     position = (position + elapsed * .028) % width;
     marquee.scrollLeft = position;
   } else position = marquee.scrollLeft;
   requestAnimationFrame(animate);
 };
 requestAnimationFrame(animate);
})();
