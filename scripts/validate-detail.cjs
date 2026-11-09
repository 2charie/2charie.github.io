// Run against scripts/serve.mjs; fixture data is intercepted in-browser only.
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.DETAIL_TEST_URL || 'http://127.0.0.1:4173';
const widths = [1440,1280,834,390,360];
const results = [];
(async () => {
 const browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
 console.log('Chromium started');
 const page = await browser.newPage();
 // External font CDN availability must not stall local layout verification.
 await page.route('https://**',route=>route.abort());
 const errors = [];
 page.on('pageerror', error => errors.push(error.message));
 const measure = async () => page.evaluate(() => {
   const box = selector => { const e = document.querySelector(selector); if(!e) return null; const r = e.getBoundingClientRect(); return {x:r.x,width:r.width,y:r.y}; };
   return {
     edges:['.detail-heading','.detail-placeholder','.detail-info','.detail-body','.project-pagination'].map(box).filter(Boolean),
     meta:[...document.querySelectorAll('.detail-meta-item')].map(e => ({label:e.querySelector('dt').textContent,...box('.detail-meta-item:nth-child(' + ([...e.parentNode.children].indexOf(e)+1) + ')')})),
     overflow:document.documentElement.scrollWidth > innerWidth,
     wide:box('.detail-wide'),
     tableScrollable:[...document.querySelectorAll('.table-scroll')].some(e=>e.scrollWidth > e.clientWidth),
     brokenImages:[...document.images].filter(e=>e.complete && !e.naturalWidth).length
   };
 });
 const check = (m,width) => {
   assert(!m.overflow, 'page overflow at '+width);
   assert.equal(m.brokenImages,0,'broken image');
   for(const edge of m.edges) {
     assert(Math.abs(edge.x-m.edges[0].x)<1,'left alignment');
     assert(Math.abs(edge.width-m.edges[0].width)<1,'width alignment');
   }
   assert(Math.abs(m.edges[0].width-Math.min(800,width-(width<768?40:64)))<1,'container token');
   const type=m.meta.find(e=>e.label==='수행 유형'), role=m.meta.find(e=>e.label==='담당 역할');
   if(type && role && width>=768) { assert.equal(type.y,role.y); assert.equal(type.width,role.width); }
   for(const item of m.meta) if(width<768 || !['수행 유형','담당 역할'].includes(item.label) || !(type && role)) assert(Math.abs(item.width-m.edges[0].width)<1,'full meta row');
 };
 try {
   for(const id of ['project-001','project-002','project-003','project-004']) {
     for(const width of widths) {
       await page.setViewportSize({width,height:960});
       console.log('Checking '+id+' @ '+width);
       await page.goto(base+'/projects/detail.html?id='+id);
       await page.locator('.detail-body').waitFor();
       await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});
       const m=await measure(); check(m,width); results.push({id,width,...m});
       if(width===1440 || width===360) await page.screenshot({path:`output/playwright/detail-system-${id}-${width}.png`,fullPage:true});
       if(id==='project-002' && width===1440) {
         const choice=page.locator('.planning-demo-company').nth(1);
         await choice.click(); assert.equal(await choice.getAttribute('aria-pressed'),'true','planning demo interaction');
       }
     }
   }
   const data=fs.readFileSync('assets/js/projects-data.js','utf8');
   const long='LongTechnologyAndURLWithoutAnyBreak'.repeat(16);
   const fixtures=[{type:'개인'}, {role:'담당'}, {tools:['도구']}, {}, {type:'유형',role:'역할',tools:[long],period:'기간',metadata:[{label:'추가',value:long},{label:'빈 값',value:'  '}]}, {type:' ',role:'',tools:['',' '],period:' '}];
   for(const [index,meta] of fixtures.entries()) {
     await page.route('**/assets/js/projects-data.js',route=>route.fulfill({contentType:'text/javascript',body:data+'\nPORTFOLIO.projects.push('+JSON.stringify({id:'layout-fixture',title:long,summary:long,categories:[],...meta,sections:[{title:'Fixture',content:[{type:'paragraph',text:long},{type:'table',width:'wide',caption:'wide table',headers:Array(10).fill('열'),rows:[Array(10).fill(long)]},{type:'barChart',width:'wide',caption:'그래프',unit:'값',max:10,ticks:[0,10],rows:[{label:'항목',detail:'설명',value:5}],note:'검증'},{type:'details',summary:'상세',content:[{type:'paragraph',text:'내용'}]}]}]})+');'}));
     for(const width of widths) {
       await page.setViewportSize({width,height:960}); await page.goto(base+'/projects/detail.html?id=layout-fixture');
       // Exercise long neighboring titles without changing source project data.
       await page.locator('.project-pagination a').first().evaluate((e,title)=>{e.append(document.createTextNode(title));},long);
       const m=await measure(); check(m,width);
       assert.equal(m.meta.length,[1,1,1,0,5,0][index],'empty metadata omission');
       assert(Math.abs(m.wide.width-Math.min(1160,width-(width<768?40:64)))<1,'wide token');
       assert(m.wide.x>=0,'wide left overflow'); if(width<768) assert(m.tableScrollable,'table internal scroll');
       await page.locator('summary').click(); assert(await page.locator('details').evaluate(e=>e.open),'details interaction');
       results.push({fixture:index,width,...m});
     }
     await page.unroute('**/assets/js/projects-data.js');
   }
   assert.deepEqual(errors,[]);
   fs.writeFileSync('output/playwright/detail-system-results.json',JSON.stringify({cases:results.length,errors,results},null,2));
   console.log('PASS: '+results.length+' layout cases; no page errors.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
