"""Update the presentation to shared family artwork and exact emblem layers."""
from pathlib import Path
root=Path(__file__).resolve().parent/'dist'
p=root/'app.js';s=p.read_text()
s=s.replace("pose:'ambassador-welcome'","pose:'family-gold'")
s=s.replace("const P=window.MAX_PRESENTATION.create({D,R,ref,level,img,badge,zoomButton,esc});", "const C=window.MAX_COLLECTION_VIEWS.create({D,R,esc,badge});\n  const P=window.MAX_PRESENTATION.create({D,R,ref,level,img,badge,zoomButton,esc,C});")
s=s.replace("${l.outfit?' · outfit available':' · outfit needed'}", "")
s=s.replace("${img('proposal-gold','',true)}${zoomButton('proposal-gold')}","${C.character('gold','',true)}<button type=\"button\" class=\"circle-button image-open\" data-outfit=\"gold\" aria-label=\"Inspect Gold outfit\">↗</button>")
s=s.replace("${img('proposal-champion')}</div></section>","${C.character('champion')}</div></section>")
start=s.index('  function lookRail()');end=s.index('  function missingChange(',start)
s=s[:start]+'''  function lookRail(){return C.wardrobeRail();}
  function renderWardrobe(slug){
    const l=level(slug)||level(state.selected);state.selected=l.slug;state.annotation=0;
    return `<div class="wrap"><header class="page-heading compact-heading"><div><span class="eyebrow">Wardrobe / All 28 levels</span><h1>One wardrobe.<br><i>A family of ranks.</i></h1></div></header><div class="wardrobe-toolbar"><div class="select-group"><label for="level-select">Choose a level</label><select id="level-select">${selectOptions(l.slug)}</select></div><div class="level-status"><span class="status-text">${l.outfit.status}</span><button type="button" class="circle-button" data-step="-1" ${l.number===1?'disabled':''} aria-label="Previous loyalty level">←</button><button type="button" class="circle-button" data-step="1" ${l.number===28?'disabled':''} aria-label="Next loyalty level">→</button></div></div><div class="level-rail" aria-label="All 28 loyalty levels">${D.levels.map(x=>`<button type="button" class="level-step available" data-level="${x.slug}" aria-pressed="${x.slug===l.slug}" aria-label="Level ${x.number}, ${x.name}" title="${x.name}">${pad(x.number)}</button>`).join('')}</div>${C.rankSummary(l)}<section class="wardrobe-study"><div class="study-guidance"><span class="eyebrow">The complete costume</span></div>${C.annotated(l)}<div class="detail-controls"><button type="button" class="button secondary" data-outfit="${l.slug}">Enlarge the complete look ↗</button><a class="text-link" href="#detail/${l.slug}">Open the detailed study →</a></div><div class="annotation-inspector" id="annotation-panel" aria-live="polite">${annotationPanel(l,0)}</div></section>${familyPanel(l)}${P.completeWardrobe(l.outfit)}${lookRail()}</div>`;
  }
'''+s[end:]
s=s.replace('data-image="${l.outfit.ref}" data-focus=', 'data-outfit="${l.slug}" data-focus=')
start=s.index('  function detailCloseups(');end=s.index('  function poseContent(',start)
s=s[:start]+'''  function renderDetail(slug){
    const l=level(slug)||level(state.selected);state.selected=l.slug;state.annotation=0;
    return `<div class="wrap"><div class="detail-top"><a class="back-link" href="#wardrobe/${l.slug}">← Back to the wardrobe</a><div class="select-group"><label for="detail-select">Level</label><select id="detail-select">${selectOptions(l.slug)}</select></div></div><header class="detail-title"><div><span class="eyebrow">Costume study / Level ${pad(l.number)}</span><h1>${l.name}<i>.</i></h1></div><p>${l.outfit.subtitle}. Select a numbered garment detail or enlarge the artwork.</p></header><section aria-label="Annotated ${l.name} outfit">${C.annotated(l)}<div class="detail-controls"><button type="button" class="button secondary" data-outfit="${l.slug}">View complete look & zoom ↗</button><button type="button" class="button secondary" data-badge="${l.slug}">Inspect the official emblem ↗</button></div><div class="annotation-inspector" id="annotation-panel" aria-live="polite">${annotationPanel(l,0)}</div></section><section class="section-spaced"><div class="section-head"><div><span class="eyebrow">A closer reading</span><h2>The detail makes<br><i>the difference.</i></h2></div><p>Costume textures and the exact chest emblem, shown together at a closer scale.</p></div>${C.closeups(l)}</section>${C.rankSummary(l)}${P.completeWardrobe(l.outfit)}${familyPanel(l)}${lookRail()}</div>`;
  }
'''+s[end:]
s=s.replace("${img(p.ref,'',true)}${zoomButton(p.ref)}", "${p.level?C.character(p.level,'',true):img(p.ref,'',true)}${p.level?`<button type=\"button\" class=\"circle-button image-open\" data-outfit=\"${p.level}\" aria-label=\"Inspect this character pose\">↗</button>`:zoomButton(p.ref)}")
s=s.replace('${img(m.poster)}<span>Still reference', '${m.level?C.character(m.level):img(m.poster)}<span>Still reference')
s=s.replace('<span class="eyebrow">Same core / Evolving wings</span>', '<span class="eyebrow">${f.id===\'foundation\'?\'Six individual designs\':\'Same wardrobe / Evolving wings\'}</span>')
s=s.replace('<h2 id="family-title">The ${esc(f.name)} family.</h2>', '<h2 id="family-title">${esc(f.name)}${f.id===\'foundation\'?\'.\':\' family.\'}</h2>')
s=s.replace("${v.outfit?'OUTFIT AVAILABLE':'OUTFIT NOT SUPPLIED'}", "LEVEL ${pad(v.number)}")
s=s.replace("main.innerHTML=valid", "stopTour();\n    main.innerHTML=valid")
s=s.replace("document.querySelector('#announcement').textContent=", "initReveals();\n    document.querySelector('#announcement').textContent=")
s=s.replace("const im=document.querySelector('#viewer-image'),canvas=document.querySelector('.viewer-canvas'),area=document.querySelector('.viewer-scroll');", "const im=document.querySelector('#viewer-image'),figure=document.querySelector('#viewer-figure'),canvas=document.querySelector('.viewer-canvas'),area=document.querySelector('.viewer-scroll');")
s=s.replace("im.style.width=`${w}px`;im.style.height=`${h}px`;", "im.style.width=`${w}px`;im.style.height=`${h}px`;figure.style.width=`${w}px`;figure.style.height=`${h}px`;")
s=s.replace('im.offsetLeft+w*point[0]', 'figure.offsetLeft+w*point[0]').replace('im.offsetTop+h*point[1]', 'figure.offsetTop+h*point[1]')
s=s.replace("r.kind==='badge'?'Official Figma emblem':r.origin==='Generated proposal'?'Generated ambassador proposal':'Original reference artwork'", "r.kind==='badge'?'Official Figma emblem':r.kind==='outfit'?'Family wardrobe · official chest emblem':r.origin==='Generated proposal'?'Generated ambassador proposal':'Original reference artwork'")
s=s.replace("im.alt=r.description;im.onload=", "const crest=document.querySelector('#viewer-emblem');crest.hidden=r.kind!=='outfit';if(r.kind==='outfit'){const l=level(r.level),e=l.outfit.emblem;crest.src=l.badge;crest.alt=l.name+' official chest emblem';crest.style.left=e.x+'%';crest.style.top=e.y+'%';crest.style.width=e.width+'%';}document.querySelector('#viewer-original').textContent=r.kind==='outfit'?'Open artwork base ↗':'Open original ↗';im.alt=r.description;im.onload=")
marker='  function openBadge(slug)'
s=s.replace(marker,"  function openOutfit(slug,point){const l=level(slug),r=ref(l.outfit.ref);openImages([{...r,kind:'outfit',level:slug,title:l.name+' · '+l.outfit.pose,description:r.description+' '+l.name+' official emblem attached below NB. '+l.outfit.change}],r.id,point);}\n"+marker)
s=s.replace("if(b.dataset.campaign){", "if(b.dataset.carouselStep){stopTour();C.move(b.dataset.carousel,Number(b.dataset.carouselStep));refreshCarousel(b.dataset.carousel);return;}\n    if(b.dataset.carouselRank){stopTour();C.chooseRank(b.dataset.carousel,b.dataset.carouselRank);refreshCarousel(b.dataset.carousel);document.querySelector(`[data-carousel=\"${b.dataset.carousel}\"][data-carousel-rank=\"${b.dataset.carouselRank}\"]`)?.focus({preventScroll:true});return;}\n    if(b.dataset.tour){toggleTour(b.dataset.tour);return;}\n    if(b.dataset.shelf){document.querySelector('#wardrobe-shelf').scrollBy({left:Number(b.dataset.shelf)*document.querySelector('#wardrobe-shelf').clientWidth*.8,behavior:reducedMotion.matches?'instant':'smooth'});return;}\n    if(b.dataset.outfit){openOutfit(b.dataset.outfit,b.dataset.focus?.split(',').map(Number));return;}\n    if(b.dataset.campaign){")
s=s.replace("document.addEventListener('change',e=>{if(e.target.id", "document.addEventListener('change',e=>{if(e.target.dataset?.carouselSelect){stopTour();C.choose(e.target.dataset.carouselSelect,Number(e.target.value));refreshCarousel(e.target.dataset.carouselSelect);return;}if(e.target.id")
motion='''
  const reducedMotion=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
  let tourTimer=null,tourKey=null,revealObserver=null,swipe=null;
  function refreshCarousel(key){
    const body=document.querySelector('#carousel-'+key);body.innerHTML=C.carouselBody(key);
    document.querySelector(`[data-carousel-counter="${key}"]`).textContent=pad(C.positions[key]+1)+' / '+pad(C.sequences[key].length);
    document.querySelector(`[data-carousel-select="${key}"]`).value=String(C.positions[key]);
    document.querySelector(`[data-carousel-progress="${key}"]`).style.left=(C.positions[key]*100/C.sequences[key].length)+'%';
  }
  function stopTour(){if(tourTimer)window.clearInterval(tourTimer);tourTimer=null;tourKey=null;document.querySelectorAll('[data-tour]').forEach(b=>{b.setAttribute('aria-pressed','false');b.textContent='Play tour';});document.querySelectorAll('.carousel-body').forEach(el=>el.setAttribute('aria-live','polite'));}
  function toggleTour(key){const was=tourKey===key;stopTour();if(was||reducedMotion.matches)return;tourKey=key;const b=document.querySelector(`[data-tour="${key}"]`);b.setAttribute('aria-pressed','true');b.textContent='Pause tour';document.querySelector('#carousel-'+key).setAttribute('aria-live','off');tourTimer=window.setInterval(()=>{C.move(key,1);refreshCarousel(key);},6500);}
  function initReveals(){
    if(revealObserver)revealObserver.disconnect();
    document.querySelectorAll('[data-tour]').forEach(b=>{b.disabled=reducedMotion.matches;if(reducedMotion.matches)b.textContent='Manual browsing';});
    if(reducedMotion.matches||!('IntersectionObserver' in window))return;
    revealObserver=new window.IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');revealObserver.unobserve(e.target);}}),{threshold:.06});
    document.querySelectorAll('.section-spaced,.rank-summary,.ensemble-record').forEach(el=>{el.classList.add('reveal-ready');revealObserver.observe(el);});
  }
  document.addEventListener('keydown',e=>{const key=e.target.dataset?.carouselKeys;if(key&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();stopTour();if(e.key==='Home')C.choose(key,0);else if(e.key==='End')C.choose(key,C.sequences[key].length-1);else C.move(key,e.key==='ArrowRight'?1:-1);refreshCarousel(key);}if(e.key==='Escape')stopTour();});
  document.addEventListener('pointerdown',e=>{const target=e.target.closest('[data-carousel-keys]');if(target&&!e.target.closest('button,a,select')){swipe={key:target.dataset.carouselKeys,x:e.clientX,y:e.clientY};stopTour();}});
  document.addEventListener('pointerup',e=>{if(!swipe)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4){C.move(swipe.key,dx<0?1:-1);refreshCarousel(swipe.key);}swipe=null;});
  document.addEventListener('pointercancel',()=>{swipe=null;});
  document.addEventListener('pointerover',e=>{if(tourKey&&e.target.closest('.carousel-body'))stopTour();});
  document.addEventListener('focusin',e=>{if(tourKey&&!e.target.matches('[data-tour]'))stopTour();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTour();});
  reducedMotion.addEventListener?.('change',()=>{stopTour();initReveals();});
'''
s=s.replace("  window.addEventListener('hashchange',route);route();",motion+"\n  window.addEventListener('hashchange',route);route();")
p.write_text(s)

p=root/'presentation.js';s=p.read_text().replace('zoomButton,esc})','zoomButton,esc,C})')
s=s.replace("${img(c.ref,'campaign-character',true)}", "${C.character(c.level,'campaign-character',true)}")
s=s.replace("${img('proposal-gold','ambassador-portrait',true)}", "${C.character('gold','ambassador-portrait',true)}")
s=s.replace('NEW POSE & WARDROBE PROPOSAL / GOLD','FAMILY WARDROBE PROPOSAL / GOLD')
s=s.replace('<strong>03</strong> New ambassador looks','<strong>15</strong> Complete wardrobes')
start=s.index('    <section class="wrap section-spaced"><div class="section-head"><div><span class="eyebrow">A wardrobe for an ambassador')
end=s.index('    <section class="blue-feature">',start)
s=s[:start]+'''    <div class="wrap">${C.carousel('intro',{title:'Every look. Every layer.',eyebrow:'The wardrobe carousel / 15 designs · 28 levels',intro:'Start with Gold, Champion and Reserve. Explore every complete outfit, then compare the ranks that share it.'})}</div>
'''+s[end:]
s=s.replace("${img('proposal-champion')}","${C.character('champion')}")
s=s.replace('Three earlier conversation images and three new generated proposals are also included, with their origin clearly marked.', 'Three earlier conversation images, three previous generated concepts and fifteen new family wardrobe bases are included, with their origin clearly marked.')
s=s.replace('The new Gold, Champion and Reserve images are generated proposals, using the clothing photographs for garments only.', 'The fifteen family wardrobe images are generated proposals, using the clothing photographs for garments only. Each official rank has a complete presentation; sibling ranks share one image and garment design while the exact chest emblem changes.')
s=s.replace('Tiny rendered chest/cuff marks still need production-level brand review against the exact source assets.', 'The active wardrobe uses the exact exported PNG as an image-relative chest layer. The same layer stays attached in full views, close-ups and zoom. NB and cuff N marks remain rendered parts of the costume. The foundation shields are separate designs; gemstone families have two, three or four ranks.')
s=s.replace('<li><strong>${missing.length} levels without matching outfit artwork:</strong> ${missing.map(l=>l.name).join(\', \')}.</li>', '<li><strong>Wardrobe coverage:</strong> all 28 levels are presented with 15 complete family designs and their exact official chest emblems. Original and newly generated artwork are labelled separately.</li>')
s=s.replace('<h3>Still to complete</h3>', '<h3>Coverage & production notes</h3>')
s=s.replace('exact small NB/N marks, chest-wing variants, fabric and embroidery specifications', 'the small rendered NB/N marks, final garment construction and embroidery specifications')
s=s.replace('Static character artwork remains still; only interface elements transition.', 'Carousels, selected-emblem states and annotation lines use restrained transitions. Optional tours pause on interaction. Reduced-motion preferences disable animation and automatic playback. Static character artwork is not rigged or distorted.')
p.write_text(s)

p=root/'index.html';s=p.read_text()
s=s.replace('  <script defer src="presentation.js"></script>', '  <script defer src="family-art.js"></script>\n  <script defer src="family-system.js"></script>\n  <script defer src="collection-views.js"></script>\n  <script defer src="presentation.js"></script>')
s=s.replace('  <link rel="stylesheet" href="brand.css">','  <link rel="stylesheet" href="brand.css">\n  <link rel="stylesheet" href="collection.css">')
s=s.replace('<div class="viewer-canvas"><img id="viewer-image" alt=""></div>', '<div class="viewer-canvas"><div id="viewer-figure"><img id="viewer-image" alt=""><img id="viewer-emblem" alt="" hidden></div></div>')
s=s.replace('href="assets/images/proposal-gold.webp"','href="assets/images/family-gold.webp"')
p.write_text(s)
print('Updated wardrobe, detail, carousel and composite-viewer views.')
