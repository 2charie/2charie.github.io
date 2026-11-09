const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const base=process.env.DETAIL_TEST_URL || 'http://127.0.0.1:4173';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.route('https://**',r=>r.abort());
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try {
   for(const path of ['/index.html','/projects/index.html','/projects/detail.html?id=project-001']){
     for(const width of [1440,834,390,360]){
       await page.setViewportSize({width,height:900});await page.goto(base+path);
       if(path==='/index.html')assert.equal(await page.locator('#contact a[href^="mailto:"]').getAttribute('href'),'mailto:cksfl0214@gmail.com');
       const before=page.url();
       if(width<768)await page.locator('.menu-toggle').click();
       await page.locator('[data-contact-open]').focus();await page.keyboard.press('Enter');
       const dialog=page.getByRole('dialog');await dialog.waitFor({state:'visible'});
       assert.equal(page.url(),before,'no navigation');
       assert.equal(await page.locator('dialog a[href^="mailto:"]').getAttribute('href'),'mailto:cksfl0214@gmail.com');
       assert.equal(await page.locator('dialog a[href^="https:"]').getAttribute('href'),'https://github.com/2charie');
       assert(await page.locator('.contact-dialog-close').evaluate(e=>e===document.activeElement));
       await page.keyboard.press('Tab');assert(await page.locator('dialog a[href^="mailto:"]').evaluate(e=>e===document.activeElement));
       await page.keyboard.press('Tab');assert(await page.locator('dialog a[href^="https:"]').evaluate(e=>e===document.activeElement));
       await page.keyboard.press('Tab');await page.keyboard.press('Tab');
       assert(await page.evaluate(()=>!document.activeElement.closest('.site-header')),'background inert');
       const bounds=await dialog.boundingBox();assert(bounds.x>=0 && bounds.x+bounds.width<=width);
       assert(await dialog.evaluate(e=>e.scrollWidth<=e.clientWidth),'no dialog overflow');
       if(path==='/index.html' && [1440,360].includes(width))await page.screenshot({path:`output/playwright/contact-modal-${width}.png`});
       await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
       await page.waitForFunction(()=>!document.body.classList.contains('contact-modal-open'));
       assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('contact-modal-open')),false);
       assert(await page.locator(width<768?'.menu-toggle':'[data-contact-open]').evaluate(e=>e===document.activeElement),'focus return');
       if(width<768)await page.locator('.menu-toggle').click();
       await page.locator('[data-contact-open]').click();await dialog.waitFor({state:'visible'});
       await page.locator('.contact-dialog-close').click();await dialog.waitFor({state:'hidden'});
       if(width<768)await page.locator('.menu-toggle').click();
       await page.locator('[data-contact-open]').click();await dialog.waitFor({state:'visible'});
       await page.mouse.click(5,5);await dialog.waitFor({state:'hidden'});
     }
   }
   const mobile=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
   await mobile.route('https://**',r=>r.abort());const touch=await mobile.newPage();await touch.goto(base+'/index.html');
   await touch.locator('.menu-toggle').tap();await touch.locator('[data-contact-open]').tap();
   assert(await touch.getByRole('dialog').isVisible());await touch.locator('.contact-dialog-close').tap();assert(!await touch.getByRole('dialog').isVisible());
   assert.deepEqual(errors,[]);console.log('PASS: email, modal on all 3 pages at 4 widths, keyboard focus, Escape/close/backdrop, no navigation/overflow, touch.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
