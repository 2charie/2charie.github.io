const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const base=process.env.DETAIL_TEST_URL || 'http://127.0.0.1:4173';
const tags=['심리학','서비스 기획','웹 분석','인공지능','스마트팜'];
const paragraphs=[
 '대학에서 심리학을 전공했으며, 통계와 계량심리학을 중심으로 사람의 행동과 심리적 특성을 측정하고 해석하는 방법을 다뤘습니다.',
 '현재는 SI업체에서 웹사이트의 데이터 분석과 웹 기획 업무를 하고 있습니다. 웹 로그 분석 솔루션을 활용한 데이터 수집과 이용행태 분석, 서비스 요구사항 정의와 화면 설계를 수행합니다.',
 'AI스마트팜학과에서는 인공지능, IoT, 재배환경 제어를 다루며, 데이터 기반의 환경 모니터링과 자동 제어로 분야를 넓혀가고 있습니다.'
];
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.route('https://**',r=>r.abort());
 const page=await context.newPage(), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const checkFilter=async expected=>{
   const state=await page.evaluate(()=>({
     chosen:[...document.querySelectorAll('[aria-pressed="true"][data-category]')].map(e=>e.dataset.category),
     ids:[...document.querySelectorAll('.project-card-link')].map(e=>new URL(e.href).searchParams.get('id')),
     projects:PORTFOLIO.projects.map(p=>({id:p.id,categories:p.categories})),
     results:document.querySelector('[data-results]').textContent,
     tag:new URL(location.href).searchParams.get('tag')
   }));
   const ids=state.projects.filter(p=>expected==='전체'||p.categories.includes(expected)).map(p=>p.id);
   assert.deepEqual(state.chosen,[expected]); assert.deepEqual(state.ids,ids);
   assert.equal(state.results,expected+' · '+ids.length+' projects');
   if(expected!=='전체') assert.equal(state.tag,expected);
 };
 try {
   for(const width of [1440,1280,834,390,360]){
     await page.setViewportSize({width,height:1000});await page.goto(base+'/index.html');
     assert.deepEqual(await page.locator('.about-copy > p:not(.about-label)').allTextContents(),paragraphs);
     assert.deepEqual(await page.locator('main > section').evaluateAll(es=>es.map(e=>e.classList.contains('hero')?'Hero':e.querySelector('h2').textContent.trim())),['Hero','Selected Projects.','About.','Skills.',"Let's Connect."]);
     assert.equal(await page.locator('.skill-card').count(),5);
     await page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('.about-image')].map(i=>{i.loading='eager';return i.decode();}));});
     assert.deepEqual(await page.locator('.about-copy h3').allTextContents(),['심리학','웹 기획 · 데이터 분석','AI · 스마트팜']);
     assert.deepEqual(await page.locator('.about-label').allTextContents(),['대학','현재 업무','배우고 있는 것']);
     const layout=await page.evaluate(()=>{
       const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
       return {
         overflow:document.documentElement.scrollWidth>innerWidth,
         stories:[...document.querySelectorAll('.about-story')].map(e=>({image:box(e.querySelector('img')),text:box(e.querySelector('.about-copy')),natural:e.querySelector('img').naturalWidth/e.querySelector('img').naturalHeight})),
         cards:[...document.querySelectorAll('.skill-card')].map(box),
         grid:box(document.querySelector('.skills-grid'))
       };
     });
     assert(!layout.overflow);
     for(const [index,{image,text,natural}] of layout.stories.entries()){
       assert(Math.abs(natural-4/3)<.001);
       assert(Math.abs(image.width/image.height-4/3)<.01);
       if(width<768)assert(text.y>=image.bottom);
       else {assert(index===1?image.x>text.right:text.x>image.right);assert(Math.abs(image.width-text.width)<1);assert(Math.abs(image.y+image.height/2-text.y-text.height/2)<1);}
     }
     const details=await page.locator('.skill-card').evaluateAll(es=>es.map(e=>{
       const rect=s=>e.querySelector(s).getBoundingClientRect();const icon=rect('.skill-icon'),title=rect('h3'),action=rect('.skill-action');
       return {centerDelta:Math.abs(icon.y+icon.height/2-title.y-title.height/2),gap:title.x-icon.right,actionBottom:e.getBoundingClientRect().bottom-action.bottom,background:getComputedStyle(e.querySelector('.skill-icon')).backgroundColor};
     }));
     for(const detail of details){assert(detail.centerDelta<1);assert(Math.abs(detail.gap-12)<1);assert.equal(detail.background,'rgba(0, 0, 0, 0)');assert.equal(detail.actionBottom,details[0].actionBottom);}
     const cards=layout.cards;
     if(width>=1024)for(const card of cards)assert(card.height>=190 && card.height<=210);
     for(const card of cards){assert(Math.abs(card.width-cards[0].width)<1);assert(Math.abs(card.height-cards[0].height)<1);}
     if(width>=1024){assert.equal(cards[0].y,cards[2].y);assert.equal(cards[3].y,cards[4].y);assert(cards[3].y>cards[0].y);assert(Math.abs((cards[3].x+cards[4].right)/2-(layout.grid.x+layout.grid.width/2))<1);}
     else if(width>=768){assert.equal(cards[0].y,cards[1].y);assert(cards[2].y>cards[0].y);}
     else {for(let i=1;i<cards.length;i++)assert(cards[i].y>cards[i-1].y);}
     assert.equal(await page.locator('.skill-card a, .skill-card button').count(),0);
     assert.equal(await page.locator('.skill-action').first().textContent(),'프로젝트 보기↗');
     const link=page.locator('.skill-card').first();
     const before=await link.boundingBox();await link.hover();
     assert.equal((await link.boundingBox()).height,before.height);
     assert.equal(await link.evaluate(e=>getComputedStyle(e).borderTopColor),'rgb(23, 23, 23)');
     assert.equal(await link.locator('.skill-icon').evaluate(e=>getComputedStyle(e).color),'rgb(23, 23, 23)');
     assert.equal(await link.evaluate(e=>getComputedStyle(e).transform),'none','reduced motion');
     const icons=await page.locator('.skill-icon svg').evaluateAll(es=>es.map(e=>({shape:e.innerHTML,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,stroke:e.getAttribute('stroke-width')})));
     assert.equal(icons.length,5);assert.equal(new Set(icons.map(i=>i.shape)).size,5);
     for(const icon of icons){assert.equal(icon.width,30);assert.equal(icon.height,30);assert.equal(icon.stroke,'1.5');}
     await page.mouse.move(0,0); await link.focus();await page.keyboard.press('Tab');
     assert(await page.locator('.skill-card').nth(1).evaluate(e=>e===document.activeElement));
     assert.equal(await page.locator('.skill-card').nth(1).evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
     if(width===1440||width===360){
       const style='.site-header,.skip-link { visibility:hidden!important; }';
       await page.locator('#about').screenshot({path:`output/playwright/home-about-v3-${width}.png`,style});
       await page.locator('.skills').screenshot({path:`output/playwright/home-skills-v4-${width}.png`,style});
     }
   }
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.goto(base+'/index.html');
   const animated=page.locator('.skill-card').first();await animated.scrollIntoViewIfNeeded();
   const resting=await animated.boundingBox();await animated.hover();await page.waitForTimeout(250);
   assert.equal(await animated.evaluate(e=>getComputedStyle(e).transform),'none');
   assert.equal((await animated.boundingBox()).height,resting.height);
   await page.mouse.move(0,0);await animated.focus();await page.keyboard.press('Tab');await page.waitForTimeout(250);
   assert.equal(await page.locator('.skill-card').nth(1).evaluate(e=>getComputedStyle(e).transform),'none');
   await page.emulateMedia({reducedMotion:'reduce'});
   for(const [i,tag] of tags.entries()){
     await page.goto(base+'/index.html');const link=page.locator('.skill-card').nth(i);
     assert.equal(new URL(await link.getAttribute('href'),base).searchParams.get('tag'),tag);
     await link.focus();await page.keyboard.press('Enter');await page.waitForURL('**/projects/index.html?*');
     await checkFilter(tag);await page.reload();await checkFilter(tag);
   }
   await page.goto(base+'/projects/index.html?tag='+encodeURIComponent('심리학'));
   const choose=tag=>page.locator('.filter-group').first().getByRole('button',{name:tag,exact:true}).click();
   await choose('웹 분석');await checkFilter('웹 분석');
   await choose('전체');await checkFilter('전체');assert(!new URL(page.url()).searchParams.has('tag'));
   await page.goBack();await checkFilter('웹 분석');await page.goBack();await checkFilter('심리학');
   await page.goForward();await checkFilter('웹 분석');await page.goForward();await checkFilter('전체');
   await choose('클라우드');await checkFilter('클라우드');await page.locator('[data-reset]').click();await checkFilter('전체');
   assert(!new URL(page.url()).searchParams.has('tag'));
   for(const query of ['', '?tag=invalid','?tag=%E0%A4%A']){await page.goto(base+'/projects/index.html'+query);await checkFilter('전체');}
   const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
   await touch.route('https://**',r=>r.abort());const mobile=await touch.newPage();
   for(const [i,tag] of tags.entries()){
     await mobile.goto(base+'/index.html');await mobile.locator('.skill-card').nth(i).tap();
     await mobile.waitForURL('**/projects/index.html?*');assert.equal(new URL(mobile.url()).searchParams.get('tag'),tag);
     assert.equal(await mobile.locator('[data-category][aria-pressed="true"]').getAttribute('data-category'),tag);
   }
   assert.deepEqual(errors,[]);console.log('PASS: exact About copy; five responsive sizes; five keyboard and touch links; filters, counts, reload, reset, history, invalid tags; no page errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
