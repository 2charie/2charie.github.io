(() => {
 const {url, escape, tags, image} = PortfolioUI;
 const host = document.querySelector('[data-project-detail]');
 const projects = PORTFOLIO.projects;
 const id = new URLSearchParams(location.search).get('id');
 const index = projects.findIndex(project => project.id === id);
 if(index < 0){document.title = '프로젝트를 찾을 수 없습니다 — 2charie';host.innerHTML = '<div class="empty-state"><p class="eyebrow">PROJECT NOT FOUND</p><h1>프로젝트를 찾을 수 없습니다.</h1><p>주소를 확인하거나 프로젝트 목록으로 돌아가 주세요.</p><a class="button" href="index.html">프로젝트 목록으로 돌아가기 ↗</a></div>';return;}
 const project = projects[index];
 if(project.sections) host.dataset.research = 'true';
 document.title = project.title + ' — 2charie';
 // 문자열 또는 paragraph/image/table/link 블록 배열로 본문을 확장할 수 있습니다.
 const blocks = content => {
   if(!content) return '';
   if(typeof content === 'string') return '<p>' + escape(content) + '</p>';
   if(!Array.isArray(content)) return '';
   return content.map(block => {
     if(typeof block === 'string') return '<p>' + escape(block) + '</p>';
     if(block.type === 'finding') return '<section class="research-finding"><h3>' + escape(block.title) + '</h3>' + blocks(block.content) + '</section>';
     if(block.type === 'details') return '<details class="research-details"><summary>' + escape(block.summary) + '</summary><div class="research-details-body">' + blocks(block.content) + '</div></details>';
     if(block.type === 'list' && block.items?.length) {
       const tag = block.ordered ? 'ol' : 'ul';
       return '<' + tag + ' class="research-list">' + block.items.map(item => '<li>' + (typeof item === 'string' ? escape(item) : '<strong>' + escape(item.title) + '.</strong> ' + escape(item.text)) + '</li>').join('') + '</' + tag + '>';
     }
     if(block.type === 'modelComparison' && block.models?.length) {
       return '<ol class="research-models">' + block.models.map(model => '<li><h4>' + escape(model.name) + '</h4><p class="research-model-variables">' + escape(model.variables) + '</p><dl><div><dt>B</dt><dd>' + escape(model.b) + '</dd></div><div><dt>R²</dt><dd>' + escape(model.r2) + '</dd></div></dl><p class="research-model-significance"><span aria-hidden="true">' + (model.significant ? '●' : '○') + '</span> ' + escape(model.significance) + '</p></li>').join('') + '</ol><p class="research-explainer">B: 사회적 바람직성의 비표준화 회귀계수 · R²: 모형 전체의 설명력</p>';
     }
     if(block.type === 'legend') return '<ul class="research-legend">' + block.items.map(item => '<li><span class="research-line ' + (item.style === 'dashed' ? 'is-dashed' : '') + '" aria-hidden="true"></span>' + escape(item.label) + '</li>').join('') + '</ul>';
     if(block.type === 'image' && block.naturalWidth && block.src) {
       return '<figure class="research-figure"><figcaption>' + escape(block.caption) + '</figcaption><div class="research-image"><img src="' + escape(url(block.src)) + '" alt="' + escape(block.alt) + '" width="' + Number(block.naturalWidth) + '" height="' + Number(block.naturalHeight) + '" loading="lazy"></div></figure>';
     }
     if(block.type === 'heading') return '<h3 class="research-subheading">' + escape(block.text) + '</h3>';
     if(block.type === 'note') return '<aside class="research-note">' + escape(block.text) + '</aside>';
     if(['steps', 'flow', 'findings'].includes(block.type) && block.items?.length) {
       const className = {steps:'research-steps', flow:'research-flow', findings:'research-findings'}[block.type];
       return '<ol class="' + className + '">' + block.items.map(item => '<li><h3>' + escape(item.title) + '</h3><p>' + escape(item.text) + '</p></li>').join('') + '</ol>';
     }
     if(block.type === 'barChart' && block.rows?.length && block.max > 0) {
       const rows = block.rows.filter(row => Number.isFinite(row.value) && row.value >= 0 && row.value <= block.max);
       return '<figure class="research-chart"><figcaption>' + escape(block.caption) + '</figcaption><p class="research-chart-unit">' + escape(block.unit) + '</p><div class="research-chart-rows">' + rows.map(row => '<div class="research-chart-row"><div class="research-chart-label"><strong>' + escape(row.label) + '</strong></div><div class="research-bar-track" aria-hidden="true"><div class="research-bar" style="width:' + (row.value / block.max * 100) + '%"></div></div><span class="research-chart-value">' + row.value.toFixed(2) + '</span></div>').join('') + '</div><div class="research-chart-axis" aria-hidden="true"><div>' + block.ticks.map(tick => '<span>' + escape(tick) + '</span>').join('') + '</div></div><p class="research-chart-key">' + rows.map(row => escape(row.label + ' · ' + row.detail)).join(' / ') + '</p><p class="research-chart-note">' + escape(block.note) + '</p></figure>';
     }
     if(block.type === 'image' && block.src) return '<figure><img src="' + escape(url(block.src)) + '" alt="' + escape(block.alt || '') + '" loading="lazy">' + (block.caption ? '<figcaption>' + escape(block.caption) + '</figcaption>' : '') + '</figure>';
     if(block.type === 'link' && block.href){const target = new URL(block.href, url('index.html'));if(!['http:','https:','mailto:'].includes(target.protocol)) return '';return '<p><a href="' + escape(target.href) + '">' + escape(block.label || block.href) + ' ↗</a></p>';}
     if(block.type === 'table' && block.headers?.length && block.rows?.length) return '<div class="table-scroll research-table' + (block.compact ? ' is-compact' : '') + '" role="region" tabindex="0" aria-label="' + escape(block.caption || '데이터 표') + '"><table><caption>' + escape(block.caption || '') + '</caption><thead><tr>' + block.headers.map(cell => '<th scope="col">' + escape(cell) + '</th>').join('') + '</tr></thead><tbody>' + block.rows.map(row => '<tr>' + row.map(cell => '<td>' + escape(cell) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
     return block.text ? '<p>' + escape(block.text) + '</p>' : '';
   }).join('');
 };
 const info = [['기간',project.period],['수행 유형',project.type],['담당 역할',project.role],['기술 및 도구',project.tools?.join(' · ')]] .filter(([,value]) => value);
 const sectionData = project.sections || [
   {title:'프로젝트 개요',content:project.overview},
   {title:'문제 정의 및 목표',content:project.problem},
   {title:'수행 과정',content:project.process},
   {title:'결과 및 성과',content:project.results},
   {title:'회고',content:project.reflection}
 ];
 const sections = sectionData.map(({title,content}) => {
   const body = blocks(content);
   return body ? '<section class="detail-section"><h2>' + escape(title) + '</h2>' + body + '</section>' : '';
 }).join('');
 const neighbor = (item,label) => item ? '<a href="detail.html?id=' + encodeURIComponent(item.id) + '"><small>' + label + '</small>' + escape(item.title) + ' ↗</a>' : '<span></span>';
 host.innerHTML = '<article><div class="detail-heading"><span class="eyebrow">PROJECT / ' + String(index+1).padStart(2,'0') + (project.placeholder ? ' · 콘텐츠 준비 중' : '') + '</span><h1>' + escape(project.title) + '</h1>' + (project.subtitle ? '<p class="research-subtitle">' + escape(project.subtitle) + '</p>' : '') + '<p>' + escape(project.summary) + '</p>' + tags(project.categories) + '</div>' + (project.image ? '<div class="detail-placeholder">' + image(project,'detail-cover') + (project.placeholder ? '<span class="placeholder-label" aria-hidden="true">PROJECT IMAGE</span>' : '') + '</div>' : '') + (info.length ? '<dl class="detail-info">' + info.map(([label,value]) => '<div><dt>' + label + '</dt><dd>' + escape(value) + '</dd></div>').join('') + '</dl>' : '') + (sections ? '<div class="detail-body">' + sections + '</div>' : '') + '<nav class="project-pagination" aria-label="인접 프로젝트">' + neighbor(projects[index-1],'← 이전 프로젝트') + neighbor(projects[index+1],'다음 프로젝트 →') + '</nav></article><div class="section-action"><a class="button button-secondary" href="index.html">프로젝트 목록으로 돌아가기 ↗</a></div>';
})();
