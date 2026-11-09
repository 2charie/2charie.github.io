(() => {
  const script = document.currentScript || document.querySelector('script[src$="main.js"]');
  const root = new URL('../../', script.src);
  const url = path => new URL(path, root).href;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const tags = categories => '<div class="tags">' + categories.map(category => '<span class="tag">' + escape(category) + '</span>').join('') + '</div>';
  const image = (project, className = '') => '<img class="' + className + '" src="' + escape(url(project.image)) + '" alt="' + escape(project.imageAlt || project.title) + '" width="800" height="600" loading="lazy">';
  const card = (project, index) => '<article class="project-card"><a class="project-card-link" href="' + escape(url('projects/detail.html?id=' + encodeURIComponent(project.id))) + '"><div class="project-image-wrap">' + image(project) + (project.placeholder ? '<span class="placeholder-label" aria-hidden="true">PROJECT IMAGE</span>' : '') + '</div><div class="project-card-meta"><span>' + String(index + 1).padStart(2,'0') + ' / PROJECT</span>' + (project.placeholder ? '<span>콘텐츠 준비 중</span>' : project.status ? '<span>' + escape(project.status) + '</span>' : '') + '</div><h3>' + escape(project.title) + '<span aria-hidden="true">↗</span></h3><p>' + escape(project.summary) + '</p>' + tags(project.categories) + '</a></article>';
  window.PortfolioUI = {url, escape, tags, image, card};
  const projectsPage = location.pathname.includes('/projects/');
  document.querySelector('[data-header]').innerHTML = '<div class="container header-inner"><a class="logo" href="' + url('index.html') + '" aria-label="2charie 홈">2charie<span>.</span></a><button class="menu-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button><nav id="site-nav" class="site-nav" aria-label="주요 내비게이션"><div class="nav-links"><a href="' + url('index.html') + '"' + (!projectsPage ? ' aria-current="page"' : '') + '>Home</a><a href="' + url('projects/index.html') + '"' + (projectsPage ? ' aria-current="page"' : '') + '>Projects</a><a href="' + url('index.html#contact') + '">Contact</a></div></nav></div>';
  document.querySelector('[data-footer]').innerHTML = '<div class="container footer-inner"><p>© ' + new Date().getFullYear() + ' 2charie. All rights reserved.</p><a class="footer-github" href="' + escape(PORTFOLIO.github) + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const setMenu = open => {toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open ? '메뉴 닫기' : '메뉴 열기');nav.dataset.open = String(open);};
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {if(event.target.closest('a')) setMenu(false);});
  document.addEventListener('click', event => {if(!event.target.closest('.site-header')) setMenu(false);});
  document.addEventListener('keydown', event => {if(event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true'){setMenu(false);toggle.focus();}});
  matchMedia('(min-width:768px)').addEventListener('change', () => setMenu(false));
  const email = document.querySelector('[data-email]');
  if(email && PORTFOLIO.email){const link = document.createElement('a');link.className = 'contact-row';link.href = 'mailto:' + PORTFOLIO.email;link.innerHTML = '<span>Email</span><span>' + escape(PORTFOLIO.email) + ' ↗</span>';email.replaceWith(link);}
  // 동적으로 생성되는 헤더로 인한 앵커 위치 변화를 보정합니다.
  if(location.hash === '#contact') requestAnimationFrame(() => document.getElementById('contact')?.scrollIntoView());
})();
