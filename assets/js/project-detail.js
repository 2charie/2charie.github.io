(() => {
 const {url, escape, tags, image} = PortfolioUI;
 const host = document.querySelector('[data-project-detail]');
 const projects = PORTFOLIO.projects;
 const id = new URLSearchParams(location.search).get('id');
 const index = projects.findIndex(project => project.id === id);
 if(index < 0){document.title = '프로젝트를 찾을 수 없습니다 — 2charie';host.innerHTML = '<div class="empty-state"><p class="eyebrow">PROJECT NOT FOUND</p><h1>프로젝트를 찾을 수 없습니다.</h1><p>주소를 확인하거나 프로젝트 목록으로 돌아가 주세요.</p><a class="button" href="index.html">프로젝트 목록으로 돌아가기 ↗</a></div>';return;}
 const project = projects[index];
 document.title = project.title + ' — 2charie';
 // 문자열 또는 paragraph/image/table/link 블록 배열로 본문을 확장할 수 있습니다.
 const blocks = content => {
   if(!content) return '';
   if(typeof content === 'string') return '<p>' + escape(content) + '</p>';
   if(!Array.isArray(content)) return '';
   return content.map(block => {
     if(typeof block === 'string') return '<p>' + escape(block) + '</p>';
     if(block.type === 'image' && block.src) return '<figure><img src="' + escape(url(block.src)) + '" alt="' + escape(block.alt || '') + '" loading="lazy">' + (block.caption ? '<figcaption>' + escape(block.caption) + '</figcaption>' : '') + '</figure>';
     if(block.type === 'link' && block.href){const target = new URL(block.href, url('index.html'));if(!['http:','https:','mailto:'].includes(target.protocol)) return '';return '<p><a href="' + escape(target.href) + '">' + escape(block.label || block.href) + ' ↗</a></p>';}
     if(block.type === 'table' && block.headers?.length && block.rows?.length) return '<div class="table-scroll"><table><caption>' + escape(block.caption || '') + '</caption><thead><tr>' + block.headers.map(cell => '<th scope="col">' + escape(cell) + '</th>').join('') + '</tr></thead><tbody>' + block.rows.map(row => '<tr>' + row.map(cell => '<td>' + escape(cell) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
     return block.text ? '<p>' + escape(block.text) + '</p>' : '';
   }).join('');
 };
 const info = [['기간',project.period],['수행 유형',project.type],['담당 역할',project.role],['기술 및 도구',project.tools?.join(' · ')]] .filter(([,value]) => value);
 const sections = [['프로젝트 개요',project.overview],['문제 정의 및 목표',project.problem],['수행 과정',project.process],['결과 및 성과',project.results],['회고',project.reflection]].map(([title,content]) => {const body = blocks(content);return body ? '<section class="detail-section"><h2>' + title + '</h2>' + body + '</section>' : '';}).join('');
 const neighbor = (item,label) => item ? '<a href="detail.html?id=' + encodeURIComponent(item.id) + '"><small>' + label + '</small>' + escape(item.title) + ' ↗</a>' : '<span></span>';
 host.innerHTML = '<article><div class="detail-heading"><span class="eyebrow">PROJECT / ' + String(index+1).padStart(2,'0') + (project.placeholder ? ' · 콘텐츠 준비 중' : '') + '</span><h1>' + escape(project.title) + '</h1><p>' + escape(project.summary) + '</p>' + tags(project.categories) + '</div>' + (project.image ? '<div class="detail-placeholder">' + image(project,'detail-cover') + (project.placeholder ? '<span class="placeholder-label" aria-hidden="true">PROJECT IMAGE</span>' : '') + '</div>' : '') + (info.length ? '<dl class="detail-info">' + info.map(([label,value]) => '<div><dt>' + label + '</dt><dd>' + escape(value) + '</dd></div>').join('') + '</dl>' : '') + (sections ? '<div class="detail-body">' + sections + '</div>' : '') + '<nav class="project-pagination" aria-label="인접 프로젝트">' + neighbor(projects[index-1],'← 이전 프로젝트') + neighbor(projects[index+1],'다음 프로젝트 →') + '</nav></article><div class="section-action"><a class="button button-secondary" href="index.html">프로젝트 목록으로 돌아가기 ↗</a></div>';
})();
