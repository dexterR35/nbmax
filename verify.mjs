/* Dependency-free source/render contract checks. This is not a browser layout test. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.join(import.meta.dirname,'dist');
const events={},elements=new Map(),timers=new Map();
let timerId=0;
const motionPreference={matches:false,addEventListener(type,fn){this.change=fn;}};
class Element {
 constructor(key){this.key=key;this.dataset={};this.innerHTML='';this.style={};this.clientWidth=800;this.clientHeight=600;this.offsetLeft=0;this.offsetTop=0;const classes=new Set();this.classList={add(...names){names.forEach(n=>classes.add(n));},remove(...names){names.forEach(n=>classes.delete(n));},contains:n=>classes.has(n),toggle(n,force){const enabled=force??!classes.has(n);enabled?classes.add(n):classes.delete(n);return enabled;}};this.attributes={};this.handlers={};this.playCalls=0;}
 addEventListener(type,fn){this.handlers[type]=fn;}
 setAttribute(k,v){this.attributes[k]=String(v);}
 removeAttribute(k){delete this.attributes[k];}
 hasAttribute(k){return Object.hasOwn(this.attributes,k);}
 querySelector(s){return get(s);}
 querySelectorAll(){return [];}
 focus(){this.focused=true;} scrollTo(){} scrollBy(){} scrollIntoView(options){this.scrollOptions=options;} showModal(){this.open=true;} close(){this.open=false;this.handlers.close?.();} matches(s){return this.key===s;}
 play(){this.playCalls++;return this.playError?Promise.reject(this.playError):Promise.resolve();}
}
const get=s=>{if(!elements.has(s))elements.set(s,new Element(s));return elements.get(s);};
const introDevices=['desktop','mobile'].map(device=>{const button=get(`[data-intro-device="${device}"]`);button.dataset.introDevice=device;return button;});
const document={querySelector:get,querySelectorAll:s=>s==='[data-tour]'?[get('[data-tour="intro"]'),get('[data-tour="character"]')]:s==='[data-intro-device]'?introDevices:[],body:get('body'),activeElement:null,addEventListener:(t,f)=>{(events[t]??=[]).push(f);}};
const window={document,scrollY:0,scrollTo(){},matchMedia:()=>motionPreference,setInterval(fn,ms){assert.equal(ms,2500);timers.set(++timerId,fn);return timerId;},clearInterval(id){timers.delete(id);},addEventListener:(t,f)=>{(events[t]??=[]).push(f);}};
const context=vm.createContext({window,document,location:{hash:'#intro'},requestAnimationFrame:f=>f(),console});
for(const file of ['inventory.js','new-pose-data.js','data.js','ambassador-data.js','ambassador-looks.js','family-art.js','family-system.js','intro-models.js','collection-views.js','studio-data.js','studio-assets.js','studio-views.js','presentation.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const D=window.MAX_DATA,R=window.MAX_REFERENCES;
assert.equal(D.levels.length,28);assert.equal(D.levels.filter(l=>l.outfit).length,28);assert.equal(R.length,117);assert.equal(D.wardrobes.length,15);assert.equal(window.MAX_NEW_POSE_ART.length,9);assert.equal(window.MAX_GUIDE_ART.length,4);
assert.equal(new Set(D.levels.map(l=>l.slug)).size,28);
assert.equal(D.families.flatMap(f=>f.slugs).length,28);
assert.equal(new Set(D.families.flatMap(f=>f.slugs)).size,28);
const referenceIds=new Set(R.map(r=>r.id));
const validatedAssets=new Set();
function asset(src){if(!src||src.startsWith('http')||src.startsWith('#'))return;const local=src.split(/[?#]/)[0];assert.ok(fs.existsSync(path.join(root,local)),`Missing asset ${src}`);validatedAssets.add(local);}
for(const r of R){[r.image,r.thumb,r.original].forEach(asset);assert.ok(r.description.length>30);}
for(const l of D.levels){asset(l.badge);if(l.outfit){assert.ok(referenceIds.has(l.outfit.ref));assert.equal(l.outfit.annotations.length,6);for(const a of l.outfit.annotations){assert.ok(a.x>0&&a.x<100&&a.y>0&&a.y<100);for(const key of ['title','text','finish','meaning','delta'])assert.ok(a[key]?.length);}}}
// Family membership must keep the complete costume and pose fixed, not merely similar.
assert.equal(new Set(D.levels.map(l=>l.outfit.ref)).size,15);
for(const w of D.wardrobes){
 const first=D.levels.find(l=>l.slug===w.slugs[0]);
 for(const [i,slug] of w.slugs.entries()){
  const l=D.levels.find(l=>l.slug===slug),o=l.outfit;
  assert.equal(o.ref,first.outfit.ref);assert.equal(o.pose,first.outfit.pose);
  assert.deepEqual(o.garments.slice(0,4),first.outfit.garments.slice(0,4));
  assert.deepEqual(o.emblem,first.outfit.emblem);
  assert.deepEqual(o.annotations.map(a=>[a.x,a.y]),first.outfit.annotations.map(a=>[a.x,a.y]));
  assert.equal(l.familyRank,i+1);assert.equal(l.familySize,w.slugs.length);
  assert.ok(o.emblem.x>50&&o.emblem.x<70&&o.emblem.y>17&&o.emblem.y<25);
  assert.ok(o.emblem.width>=4&&o.emblem.width<=5.5);
  assert.equal(o.annotations[2].x,o.emblem.x);assert.equal(o.annotations[2].y,o.emblem.y);
  if(i)assert.notEqual(l.badge,first.badge);
 }
}
assert.ok(new Set(D.wardrobes.map(w=>w.garments[2])).size>=12,'Trousers must vary across families');
assert.ok(new Set(D.wardrobes.map(w=>w.garments[3])).size>=12,'Footwear must vary across families');
const rendered=[];
function checkHTML(html,route){
 assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,`${route}: one primary heading`);
 for(const match of html.matchAll(/<(?:img|script|source)\b[^>]*\bsrc="([^"]+)"[^>]*>/g))asset(match[1]);
 for(const match of html.matchAll(/<video\b[^>]*\bposter="([^"]+)"[^>]*>/g))asset(match[1]);
 for(const match of html.matchAll(/<img\b([^>]+)>/g)){assert.ok(/\balt="[^"]+"/.test(match[1]),`${route}: meaningful alt`);assert.ok(/\bwidth="\d+"/.test(match[1]),`${route}: dimensions`);}
 for(const m of html.matchAll(/\bhref="([^"]+)"/g)){if(!m[1].startsWith('http')&&!m[1].startsWith('#'))asset(m[1]);}
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`${route}: duplicate IDs`);
 assert.ok(!html.includes('undefined')&&!html.includes('NaN'),`${route}: unresolved data`);
 rendered.push({route,html});
}
function visit(route){context.location.hash='#'+route;events.hashchange[0]();const html=get('main').innerHTML;checkHTML(html,route);return html;}
for(const route of ['intro','story','poses','references','references/sources','landing/welcome','landing/weekly','landing/reserve'])visit(route);
for(const l of D.levels){
 const w=visit('wardrobe/'+l.slug);assert.ok(w.includes('data-card-collection="collection"'));assert.equal((w.match(/<a class="collection-card(?:\s|\")/g)||[]).length,15);
 assert.notEqual(get('#card-dialog').open,true);assert.ok(w.includes(`href="#detail/`));
 const detail=visit('detail/'+l.slug);assert.equal((detail.match(/class="hotspot"/g)||[]).length,6);assert.ok(detail.includes(l.outfit.change));
 const expected=`left:${l.outfit.emblem.x}%;top:${l.outfit.emblem.y}%;width:${l.outfit.emblem.width}%`;
 assert.equal((detail.split(expected).length-1)>=1,true,'Selected wardrobe keeps its exact emblem coordinates');
 assert.ok(detail.includes('Badge reference / This wardrobe only'));assert.ok(!detail.includes('The full collection'));assert.ok(!detail.includes('detail-select'));
}
visit('references');for(const fn of events.input)fn({target:{matches:s=>s==='.archive-search',value:'nonexistent-query-xyz'}});assert.ok(get('#reference-grid').innerHTML.includes('No references match'));
for(const fn of events.input)fn({target:{matches:s=>s==='.archive-search',value:'cane'}});assert.ok(get('#reference-grid').innerHTML.includes('ref-19'));
const click=dataset=>{for(const fn of events.click)fn({target:{closest:()=>({dataset})}});};
visit('detail/centurion-elite');click({level:'centurion'});assert.equal(context.location.hash,'detail/centurion');
visit('detail/ace');click({annotation:'2'});assert.ok(get('#annotation-panel').innerHTML.includes('NB & the level shield'));
const posesPage=visit('poses');assert.equal((posesPage.match(/class="card-corner-badge"/g)||[]).length,21);assert.ok(!posesPage.includes('class="character-emblem"'),'Pose cards keep the corner badge and do not overlay a second chest emblem');assert.ok(posesPage.includes('assets/new_image/guid_max1.png'));assert.ok(posesPage.includes('assets/new_image/guide_max2.png'));click({pose:'present'});assert.equal(get('#card-dialog').open,true);assert.ok(get('#card-dialog-content').innerHTML.includes('Present, then step aside'));get('#card-dialog').close();
visit('wardrobe/ace');click({badge:'ace'});assert.equal(get('#viewer').open,true);assert.equal(get('#viewer-image').src,'assets/badges/ace.png');get('#viewer').close();
// New ambassador routes must pair the right gesture, complete ensemble and badge.
const proposals=R.filter(r=>r.origin==='Generated proposal');
assert.equal(proposals.length,44);
assert.equal(D.poses.length,21);
for(const c of window.MAX_AMBASSADOR.campaigns){
 const html=visit('landing/'+c.id);
 assert.ok(html.includes('assets/images/'+c.scene+'.webp'));
 assert.ok(html.includes(c.cta));
 assert.ok(html.includes('Creative proposal'));
 for(const slug of c.badges)assert.ok(html.includes('assets/badges/'+slug+'.png'));
 const l=D.levels.find(l=>l.slug===c.level);
 assert.equal(window.MAX_STUDIO_ASSETS[c.scene].level,c.level);
 assert.equal(l.outfit.closeups.length,3);
 for(const point of l.outfit.closeups)for(const n of point)assert.ok(n>0&&n<100);
}
for(const p of D.poses){
 const html=visit('poses/'+p.id),art=R.find(r=>r.id===p.ref);assert.ok(html.includes(p.title));assert.ok(html.includes(art.image));
}
visit('landing/reserve');click({campaignAction:'reserve'});assert.equal(get('#campaign-dialog').open,true);
assert.ok(get('#campaign-dialog-content').innerHTML.includes('£20'));
assert.ok(get('#campaign-dialog-content').innerHTML.includes('10×'));
assert.ok(get('#campaign-dialog-content').innerHTML.includes('£100'));
get('#campaign-dialog').close();
visit('landing/weekly');click({campaignAction:'weekly'});assert.ok(get('#campaign-dialog-content').innerHTML.includes('Playback and cashback'));get('#campaign-dialog').close();
visit('landing/welcome');click({campaignAction:'welcome'});assert.equal(context.location.hash,'wardrobe/gold');
const landingCollection=visit('landing/supplied-1');assert.equal((landingCollection.match(/class="landing-page-entry/g)||[]).length,17);assert.equal((landingCollection.match(/class="landing-page-entry supplied-landing-entry/g)||[]).length,7);assert.equal((landingCollection.match(/data-supplied-frame=/g)||[]).length,7);assert.equal((landingCollection.match(/data-campaign-frame=/g)||[]).length,10);assert.equal((landingCollection.match(/assets\/landing_pages\/[1-7]\.png/g)||[]).length,7);assert.ok(landingCollection.includes('Step into the north.'));assert.ok(landingCollection.includes('A little delight.'));assert.ok(landingCollection.includes('href="#wardrobe/centurion-elite"'));for(const slug of ['sapphire','champion','ruby','ace','gold','reserve','signature','infinite','emerald','elite-pro','premier','elite-premier','centurion','centurion-elite'])assert.ok(landingCollection.includes(`data-badge="${slug}"`));assert.ok(!landingCollection.includes('environment-contact-sheet'));assert.ok(!landingCollection.includes('environment-references'));assert.ok(!landingCollection.includes('device-switch'));
get('#guide-toggle').handlers.click();assert.equal(get('#guide-toggle').attributes['aria-expanded'],'true');
visit('story');assert.equal(get('#guide-panel').hidden,true);
// The removed archive-reading section stays absent and collection sections use linked cards.
const story=visit('story');assert.ok(!story.includes('A closer archive reading'));assert.ok(story.includes('data-card-collection="character"'));
assert.equal((story.match(/<a class="collection-card(?:\s|\")/g)||[]).length,10);assert.equal((story.match(/class="card-corner-badge"/g)||[]).length,10);assert.equal((story.match(/class="character-emblem"/g)||[]).length,2,'Story cards keep the corner badge; only the opener and assistant keep a chest emblem');assert.ok(story.includes('Open character page'));assert.ok(!story.includes('data-collection-card="character"'));
assert.equal((story.match(/data-paired-wardrobe=/g)||[]).length,7);assert.ok(story.includes('assets/new_image/platinum.png'));
for(const slug of ['gold','platinum','champion','ruby','emerald','amethyst','prestige','private','premier','reserve']){assert.ok(story.includes(`data-character-card="${slug}"`));assert.ok(story.includes(`href="#story/${slug}"`));const characterPage=visit('story/'+slug);assert.ok(characterPage.includes('character-route-detail'));assert.ok(characterPage.includes(`href="#detail/${slug}"`));}
const intro=visit('intro');assert.ok(intro.includes('data-card-collection="intro"'));assert.ok(intro.includes('hero-concept-label">CONCEPT'));assert.ok(intro.includes('hero-character-title'));assert.ok(intro.includes('Calm. Familiar. Friendly.'));assert.ok(intro.includes('Concept demonstration only.'));assert.ok(intro.includes('Max has a calm, approachable expression'));
assert.equal((intro.match(/<a class="collection-card(?:\s|\")/g)||[]).length,4);assert.equal(timers.size,0,'Static card grids do not start carousel timers');
assert.equal((intro.match(/class="card-corner-badge"/g)||[]).length,4);assert.equal((intro.match(/data-paired-intro=/g)||[]).length,4);
assert.ok(!intro.includes('class="character-emblem"'),'Introduction cards do not overlay a second chest emblem');
for(const model of window.MAX_INTRO_MODELS){assert.ok(intro.includes(`data-intro-card="${model.id}"`));assert.ok(intro.includes(`href="${model.detail}"`));}assert.ok(!intro.includes('data-collection-card="intro"'));
for(const href of ['#build/face-front','#build/face-three-quarter','#build/face-profile','#poses/family-gold','#poses/family-sapphire','#landing/welcome','#landing/salon-ensemble'])assert.ok(intro.includes(`href="${href}"`));
assert.ok(!intro.includes('A language of emblems'));
assert.ok(!intro.includes('intro-model-choices'));assert.ok(!intro.includes('data-carousel-select="intro"'));
assert.equal(window.MAX_INTRO_MODELS.length,4);assert.ok(intro.includes('Four looks. One Max.'));assert.ok(intro.includes('pose-emerald-cane'));
for(const id of ['build-front','build-profile','build-gothic'])assert.ok(intro.includes('data-intro-art="'+id+'"'));
assert.ok(!intro.includes('data-character-level="champion"'),'Introduction uses only the newly selected portrait models');
assert.ok(intro.includes('build-gothic.webp'));assert.ok(intro.includes('family-gold.webp'));
assert.equal((intro.match(/data-promotion-line=/g)||[]).length,6);assert.ok(!intro.includes('Navy textured long tailcoat with red piping and lining'));assert.ok(intro.includes('data-intro-art="build-front"'));assert.ok(intro.includes('Calm, familiar and friendly'));assert.ok(!intro.includes('aria-label="Detail 1: Calm, familiar and friendly"'));
click({promotionAnnotation:'6'});assert.ok(get('#promotion-annotation-panel').innerHTML.includes('Oxford shoes'));
// Introduction deep links, preview controls and visitor-started playback.
for(const section of ['film','example']){
 const target=get('#intro-'+section);target.scrollOptions=null;
 const html=visit('intro/'+section);assert.equal(get('main').dataset.view,'intro');assert.ok(html.includes(`id="intro-${section}"`));assert.equal(target.scrollOptions?.block,'start');
}
const clickElement=button=>{for(const fn of events.click)fn({target:{closest:selector=>selector==='button'?button:null}});};
for(const [device,pressed] of [['desktop','true'],['mobile','false']])assert.match(intro,new RegExp(`<button\\b[^>]*data-intro-device="${device}"[^>]*aria-pressed="${pressed}"`));
for(const selected of [introDevices[1],introDevices[0]]){
 clickElement(selected);assert.equal(get('#intro-site-preview').classList.contains('is-mobile'),selected.dataset.introDevice==='mobile');
 for(const button of introDevices)assert.equal(button.attributes['aria-pressed'],String(button===selected));
}
const videoMarkup=intro.match(/<video\b[^>]*id="intro-video"[^>]*>/)?.[0];
assert.ok(videoMarkup,'Introduction provides a native video');
for(const attribute of ['controls','playsinline','hidden'])assert.match(videoMarkup,new RegExp(`\\s${attribute}(?:\\s|>|=)`));
assert.ok(!/\sautoplay(?:\s|>|=)/.test(videoMarkup),'Film starts only when requested');
const introVideo=get('#intro-video'),introCover=get('.intro-video-cover'),introStatus=get('.intro-video-status'),watchButton=get('[data-intro-watch]');
introVideo.hidden=true;introVideo.controls=true;introCover.hidden=false;introStatus.hidden=true;watchButton.setAttribute('data-intro-watch','');
assert.equal(introVideo.playCalls,0);clickElement(watchButton);await Promise.resolve();
assert.equal(introVideo.playCalls,1);assert.equal(introVideo.hidden,false);assert.equal(introVideo.focused,true);assert.equal(introCover.hidden,true);assert.equal(introStatus.hidden,true);
introVideo.playError=new Error('Playback blocked');clickElement(watchButton);await Promise.resolve();
assert.equal(introVideo.playCalls,2);assert.equal(introStatus.hidden,false);assert.ok(introStatus.textContent.length>0,'Failed playback provides recovery guidance');
assert.equal(introVideo.hidden,false);assert.equal(introVideo.controls,true,'Native controls remain available after a rejected play request');assert.equal(introCover.hidden,true);introVideo.playError=null;
const wardrobeCards=visit('wardrobe/gold');assert.ok(wardrobeCards.includes('data-card-collection="collection"'));
assert.equal((wardrobeCards.match(/<a class="collection-card(?:\s|\")/g)||[]).length,15);
assert.equal((wardrobeCards.match(/class="card-corner-badge"/g)||[]).length,15);
assert.ok(!wardrobeCards.includes('class="character-emblem"'),'Wardrobe cards keep the corner badge and do not overlay a second chest emblem');
assert.equal((wardrobeCards.match(/data-paired-wardrobe=/g)||[]).length,9);for(const pose of window.MAX_NEW_POSE_ART)assert.ok(wardrobeCards.includes(pose.image));
assert.ok(wardrobeCards.includes('data-wardrobe-card="member"'));assert.ok(wardrobeCards.includes('href="#detail/member"'));assert.ok(!wardrobeCards.includes('data-collection-card="collection"'));
// Zoom preserves the exact emblem relative to the complete high-resolution image.
click({outfit:'infinite',focus:'55.9,20.65'});
assert.equal(get('#viewer-image').src,'assets/originals/family-red-diamond.png');
assert.equal(get('#viewer-emblem').src,'assets/badges/infinite.png');assert.equal(get('#viewer-emblem').hidden,false);
assert.equal(get('#viewer-emblem').style.left,'55.9%');assert.equal(get('#viewer-emblem').style.top,'20.65%');
get('#viewer-image').naturalWidth=1024;get('#viewer-image').naturalHeight=1536;get('#viewer-image').onload();
assert.equal(get('#viewer-figure').style.width,get('#viewer-image').style.width);
assert.equal(get('#viewer-figure').style.height,get('#viewer-image').style.height);
assert.equal(get('#zoom-value').textContent,'300%');get('#viewer').close();
click({badge:'infinite'});assert.equal(get('#viewer-emblem').hidden,true);get('#viewer').close();
visit('references');for(const fn of events.input)fn({target:{matches:s=>s==='.archive-search',value:''}});click({filter:'proposals'});assert.ok(get('#reference-grid').innerHTML.includes('proposal-gold'));assert.ok(!get('#reference-grid').innerHTML.includes('data-gallery-image="ref-19"'));
assert.equal(window.MAX_AMBASSADOR.campaigns.length,10);
assert.equal(window.MAX_AMBASSADOR.campaigns.filter(c=>c.composition==='ensemble').length,5);
for(const c of window.MAX_AMBASSADOR.campaigns.filter(c=>c.composition==='ensemble')){
 const html=visit('landing/'+c.id);
 assert.ok(html.includes('ensemble-frame'));
 assert.ok(html.includes(c.name));
 assert.equal((html.match(/data-campaign-link=/g)||[]).length,17);
 assert.equal((html.match(/class="landing-page-entry/g)||[]).length,17);
 const e=window.MAX_STUDIO_ASSETS[c.scene].emblem;
 assert.ok(e.x>55&&e.x<90&&e.y>8&&e.y<45,'Measured emblem belongs to Max in the right-side scene group');
 click({studioImage:c.scene});assert.equal(get('#viewer-emblem').src,D.levels.find(l=>l.slug===c.level).badge);get('#viewer').close();
}
assert.ok(visit('landing/temple-ensemble').includes('href="#landing/convergence-ensemble"'));
const suppliedLanding=visit('landing/supplied-7');assert.ok(suppliedLanding.includes('aria-current="page"'));assert.ok(suppliedLanding.indexOf('assets/landing_pages/1.png')<suppliedLanding.indexOf('data-campaign-frame="welcome"'));
visit('landing/northern-ensemble');click({campaignAction:'northern-ensemble'});assert.equal(get('#campaign-dialog').open,true);assert.ok(get('#campaign-dialog-content').innerHTML.includes('£20'));get('#campaign-dialog').close();
for(const id of ['temple-ensemble','garden-ensemble','salon-ensemble','convergence-ensemble']){visit('landing/'+id);click({campaignAction:id});assert.equal(context.location.hash,'wardrobe/'+window.MAX_AMBASSADOR.campaigns.find(c=>c.id===id).level);}
assert.equal(window.MAX_STUDIO.expressions.length,12);
assert.equal(window.MAX_STUDIO.bodies.length,4);
for(const study of window.MAX_STUDIO.studies){const html=visit('build/'+study.id);assert.ok(html.includes(study.title));assert.ok(html.includes('data-studio-image="'+study.ref+'"'));click({studioImage:study.ref});assert.equal(get('#viewer-image').src,R.find(r=>r.id===study.ref).original);assert.equal(Boolean(get('#viewer-emblem').hidden),!window.MAX_STUDIO_ASSETS[study.ref].emblem);get('#viewer').close();}
visit('build/face-front');click({faceFilter:'Profile'});assert.ok(get('#expression-grid').innerHTML.includes('face-profile'));assert.ok(!get('#expression-grid').innerHTML.includes('face-angry'));
for(const fn of events.change)fn({target:{id:'study-select',value:'face-sad'}});assert.equal(context.location.hash,'build/face-sad');
for(const id of ['emerald','prismatic']){visit('landing/'+id);click({campaignAction:id});assert.equal(context.location.hash,'wardrobe/'+window.MAX_AMBASSADOR.campaigns.find(c=>c.id===id).level);}
click({studioImage:'build-gothic'});assert.ok(get('#viewer-emblem').style.transform.includes('7deg'));get('#viewer').close();
const shell=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const m of shell.matchAll(/(?:src|href)="((?:assets\/|[a-z-]+\.)(?:[^"#]*))"/g))asset(m[1]);
assert.ok(fs.readFileSync(path.join(root,'brand.css'),'utf8').includes('--blue:#244bff'));
assert.ok(fs.readFileSync(path.join(root,'styles.css'),'utf8').includes('prefers-reduced-motion'));
fs.mkdirSync(path.join(import.meta.dirname,'.qa'),{recursive:true});
fs.writeFileSync(path.join(import.meta.dirname,'.qa','rendered.json'),JSON.stringify(rendered));
console.log(`PASS: ${rendered.length} rendered route checks; 28 complete rank presentations; 15 shared wardrobe designs; 168 bounded annotation anchors; ${validatedAssets.size} local assets; 19 wardrobe poses; 16 character studies; 7 supplied landing pages plus 10 developed concepts; introduction deep links, preview controls and playback recovery; exact-emblem family continuity, linked collection cards, reduced-motion behavior, composite zoom, selectors, search, offer actions and assistant.`);
console.log('Source/render checks do not assert visual layout, actual media decoding or assistive-technology behavior.');
