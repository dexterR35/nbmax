window.MAX_STUDIO_VIEWS={create({D,R,esc,badge,img}){
  const S=window.MAX_STUDIO,A=window.MAX_AMBASSADOR;
  const ref=id=>R.find(r=>r.id===id),level=slug=>D.levels.find(l=>l.slug===slug);
  function artwork(id,cls='',eager=false){
    const r=ref(id),meta=window.MAX_STUDIO_ASSETS?.[id],l=meta?.level?level(meta.level):null,e=meta?.emblem;
    if(!r)return '';
    return `<span class="studio-art ${cls}" style="--studio-ratio:${r.width}/${r.height}" data-studio-art="${id}"><img class="studio-base" src="${r.image}" alt="${esc(r.description)}" width="${r.width}" height="${r.height}" loading="${eager?'eager':'lazy'}" decoding="async">${l&&e?`<img class="studio-crest" src="${l.badge}" alt="${l.name} official chest emblem below NB" width="512" height="512" style="left:${e.x}%;top:${e.y}%;width:${e.width}%;transform:translate(-50%,-50%) rotate(${e.rotation||0}deg)">`:''}</span>`;
  }
  function faceRail(){return `<section class="section-spaced expression-intro"><div class="section-head"><div><span class="eyebrow">Beyond the hand gesture</span><h2>The face tells<br>the rest.</h2></div></div><div class="face-preview-rail">${S.expressions.map(p=>`<a href="#build/${p.id}" class="face-preview">${artwork(p.ref)}<strong>${p.title}</strong><span>${p.angle} · ${p.emotion}</span></a>`).join('')}</div><a class="button secondary" href="#build/face-front">Open Character Build →</a></section>`;}
  function studyPage(id='face-front'){
    const s=S.studies.find(x=>x.id===id)||S.studies[0],meta=window.MAX_STUDIO_ASSETS?.[s.ref];
    return `<div class="wrap build-view"><header class="build-heading"><div><span class="eyebrow">Character Build / Acting & silhouette</span><h1>One Max.<br><span>More expression.</span></h1></div><p>Explore the face, camera angle and costume together. These are proposed character studies, grounded in the original Max.</p></header><div class="build-controls"><div class="build-mode" aria-label="Study type"><a href="#build/face-front" ${s.type==='face'?'aria-current="page"':''}>Face & expression <span>12</span></a><a href="#build/build-front" ${s.type==='body'?'aria-current="page"':''}>Full character <span>4</span></a></div><label><span class="sr-only">Choose a character study</span><select id="study-select">${S.studies.map(p=>`<option value="${p.id}" ${p.id===s.id?'selected':''}>${p.type==='face'?'Face':'Body'} / ${p.title}</option>`).join('')}</select></label></div><section class="build-stage ${s.type==='body'?'is-body':''}"><figure>${artwork(s.ref,'',true)}<button class="circle-button image-open" type="button" data-studio-image="${s.ref}" aria-label="Enlarge ${esc(s.title)}">↗</button><figcaption>Generated character study · ${s.style} direction</figcaption></figure><div class="build-reading"><div class="study-tags"><span>${s.angle}</span><span>${s.emotion}</span><span>${s.style}</span></div><h2>${s.title}</h2><p class="study-observation">${esc(meta?.observation||s.visible)}</p><dl><div><dt>Acting direction</dt><dd>${s.context}</dd></div><div><dt>The wardrobe</dt><dd>${esc(meta?.garments||s.outfit)}</dd></div><div><dt>Brand & emblem placement</dt><dd>${s.brand}</dd></div></dl><div class="study-navigation"><a class="circle-button" href="#build/${S.studies[(S.studies.indexOf(s)-1+S.studies.length)%S.studies.length].id}" aria-label="Previous character study">←</a><span>${String(S.studies.indexOf(s)+1).padStart(2,'0')} / 16</span><a class="circle-button" href="#build/${S.studies[(S.studies.indexOf(s)+1)%S.studies.length].id}" aria-label="Next character study">→</a></div></div></section><section class="expression-library section-spaced" aria-labelledby="expression-title"><div class="section-head"><div><span class="eyebrow">The expression library</span><h2 id="expression-title">A wider emotional range.</h2></div><div class="expression-filters" aria-label="Filter expressions">${[['all','All faces'],['Front','Front'],['Profile','Profile'],['Three-quarter','Three-quarter']].map(([v,label])=>`<button type="button" data-face-filter="${v}" aria-pressed="${v==='all'}">${label}</button>`).join('')}</div></div><div class="expression-grid" id="expression-grid">${expressionGrid('all',s.id)}</div></section><section class="section-spaced build-body-section"><div class="section-head"><div><span class="eyebrow">Beyond a single stance</span><h2>Turn the whole character.</h2></div><p>Four full-length studies bring the new red-and-navy and Gothic references into the collection.</p></div><div class="body-study-grid">${S.bodies.map(p=>`<a href="#build/${p.id}" ${s.id===p.id?'aria-current="page"':''}>${artwork(p.ref)}<h3>${p.title}</h3><p>${p.style} · ${p.angle}</p></a>`).join('')}</div></section></div>`;
  }
  function expressionGrid(filter='all',selected=''){
    return S.expressions.filter(p=>filter==='all'||p.angle===filter).map(p=>`<a href="#build/${p.id}" class="expression-tile" ${selected===p.id?'aria-current="page"':''}>${artwork(p.ref)}<div><strong>${p.title}</strong><span>${p.angle} · ${p.style}</span></div></a>`).join('');
  }
  function sceneFrame(c,compact=false,eager=compact){
    const ensemble=c.composition==='ensemble';
    return `<div class="campaign-frame environment-frame ${ensemble?'ensemble-frame':'spotlight-frame'} ${compact?'compact-environment':''}" data-campaign-frame="${c.id}">
      <div class="campaign-header"><span class="netbet-wordmark"><img src="assets/logo/logo.webp" alt="NetBet" width="1200" height="247"><em>MAX</em></span><span>YOUR PERSONAL GUIDE</span><a href="#build">Meet Max</a></div>
      <div class="environment-body">
        <div class="environment-image">${artwork(c.scene,'',eager)}</div>
        <div class="environment-copy">
          <span class="eyebrow">${c.eyebrow}</span>
          <h2><span>${c.title}</span><strong>${c.accent}</strong></h2>
          <p>${c.body}</p>
          ${c.offer?`<div class="environment-offer"><span>Level-up reward</span><strong>${c.offer}</strong><p>${c.terms}</p></div>`:''}
          <div class="environment-action"><button type="button" class="button" data-campaign-action="${c.id}">${c.cta}<span aria-hidden="true">→</span></button></div>
          <div class="environment-badge-group"><span class="environment-badge-label">${c.badges.length===2?'One family · evolving wings':'Explore the emblems'}</span><div class="environment-badges">${c.badges.map(slug=>`<button type="button" data-badge="${slug}" aria-label="Inspect ${level(slug).name} emblem">${badge(level(slug))}<span>${level(slug).name}</span></button>`).join('')}</div></div>
        </div>
      </div>
      <div class="campaign-footer"><span>18+ · Play responsibly</span><span>Creative proposal · ${c.offer?'Current eligibility and terms apply':'Illustrative game-world setting'}</span></div>
    </div>`;
  }
  function suppliedFrame(c,eager=false){
    return `<div class="supplied-campaign-frame" data-supplied-frame="${c.id}">
      <div class="campaign-header"><span class="netbet-wordmark"><img src="assets/logo/logo.webp" alt="NetBet" width="1200" height="247"><em>MAX</em></span><span>YOUR PERSONAL GUIDE</span><a href="#build">Meet Max</a></div>
      <div class="supplied-campaign-stage">
        <img class="supplied-campaign-image" src="${c.image}" alt="${c.alt}" width="1536" height="1024" loading="${eager?'eager':'lazy'}" decoding="async">
        <div class="supplied-campaign-copy">
          <span class="eyebrow">${c.eyebrow}</span>
          <h3><span>${c.title}</span><strong>${c.accent}</strong></h3>
          <p>${c.body}</p>
          <a class="button" href="#wardrobe/${c.level}">${c.cta}<span aria-hidden="true">→</span></a>
          <div class="supplied-campaign-badges"><span>${c.badges.length===1?'Featured rank':'Explore the emblems'}</span><div>${c.badges.map(slug=>`<button type="button" data-badge="${slug}" aria-label="Inspect ${level(slug).name} emblem">${badge(level(slug))}<small>${level(slug).name}</small></button>`).join('')}</div></div>
        </div>
      </div>
      <div class="campaign-footer"><span>18+ · Play responsibly</span><span>Creative proposal · Illustrative game-world setting</span></div>
    </div>`;
  }
  const supplied=[
      {id:'supplied-1',label:'Northern welcome',name:'Northern welcome',image:'assets/landing_pages/1.png',alt:'Max with a cane beside a warrior and wolf in a snowy blue-and-gold landscape',level:'champion',badges:['sapphire','champion'],eyebrow:'The Sapphire collection',title:'Step into the north.',accent:'Max knows the way.',body:'A familiar guide for a world of ice, gold and legends.',cta:'Explore Sapphire'},
      {id:'supplied-2',label:'Candy promenade',name:'Candy promenade',image:'assets/landing_pages/2.png',alt:'Max beside a candy-inspired woman and robot in a burgundy confectionery landscape',level:'ace',badges:['ruby','ace'],eyebrow:'The Ruby collection',title:'A sweeter world.',accent:'The same sharp guide.',body:'Let Max introduce the Ruby ranks in a world full of colour.',cta:'Explore Ruby'},
      {id:'supplied-3',label:'Egyptian hall',name:'Egyptian hall',image:'assets/landing_pages/3.png',alt:'Max beside Egyptian-inspired characters in an ivory and navy temple setting',level:'gold',badges:['gold'],eyebrow:'The Gold rank',title:'Treasures ahead.',accent:'Let Max guide you.',body:'A composed welcome to your level, benefits and next discovery.',cta:'Explore Gold'},
      {id:'supplied-4',label:'Royal hall',name:'Royal hall',image:'assets/landing_pages/4.png',alt:'Max beside a princess and lion guard in a black and burgundy royal hall',level:'reserve',badges:['reserve','signature','infinite'],eyebrow:'The Reserve collection',title:'Enter the royal hall.',accent:'Your Reserve, made clear.',body:'Max presents the collection and its evolving red-diamond wings.',cta:'Explore Reserve'},
      {id:'supplied-5',label:'Emerald garden',name:'Emerald garden',image:'assets/landing_pages/5.png',alt:'Max beside green-clad characters in a luminous emerald garden',level:'elite-pro',badges:['emerald','elite-pro'],eyebrow:'The Emerald collection',title:'Follow the green.',accent:'A familiar face.',body:'Discover two Emerald ranks with Max beside you.',cta:'Explore Emerald'},
      {id:'supplied-6',label:'Northern champion',name:'Northern champion',image:'assets/landing_pages/6.png',alt:'A hammer-carrying Max beside a warrior and wolf in a snowy northern landscape',level:'centurion-elite',badges:['premier','elite-premier','centurion','centurion-elite'],eyebrow:'The Prismatic collection',title:'A legendary welcome.',accent:'Every detail, presented.',body:'Four ranks build toward the collection’s widest ceremonial wings.',cta:'Explore Prismatic'},
      {id:'supplied-7',label:'Candy ensemble',name:'Candy ensemble',image:'assets/landing_pages/7.png',alt:'Max beside a candy-inspired woman and robot in a bright confectionery world',level:'ace',badges:['ruby','ace'],eyebrow:'The Ace rank',title:'A little delight.',accent:'A lot of character.',body:'Meet the winged Ruby emblem in Max’s burgundy collection.',cta:'Explore Ace'}
    ];
  function landing(id,device){
    const allIds=[...supplied.map(x=>x.id),...A.campaigns.map(x=>x.id)],selectedId=allIds.includes(id)?id:supplied[0].id,count=allIds.length;
    const tabs=[...supplied,...A.campaigns].map((x,index)=>`<a id="campaign-tab-${x.id}" href="#landing/${x.id}" data-campaign-link="${x.id}" ${x.id===selectedId?'aria-current="page"':''}><span>${String(index+1).padStart(2,'0')}</span>${x.label}</a>`).join('');
    const suppliedPages=supplied.map((x,index)=>`<section class="landing-page-entry supplied-landing-entry${x.id===selectedId?' is-selected':''}" id="landing-page-${x.id}" aria-labelledby="landing-page-title-${x.id}"><header><span>${String(index+1).padStart(2,'0')} / ${count}</span><h2 id="landing-page-title-${x.id}">${x.name}</h2></header>${suppliedFrame(x,index===0||x.id===selectedId)}</section>`).join('');
    const conceptPages=A.campaigns.map((x,index)=>`<section class="landing-page-entry${x.id===selectedId?' is-selected':''}" id="landing-page-${x.id}" aria-labelledby="landing-page-title-${x.id}"><header><span>${String(index+supplied.length+1).padStart(2,'0')} / ${count}</span><h2 id="landing-page-title-${x.id}">${x.name}</h2></header>${sceneFrame(x,false,x.id===selectedId)}</section>`).join('');
    return `<div class="wrap landing-view environment-view">
      <header class="landing-heading"><div><span class="eyebrow">Landing-page collection / ${count} pages</span><h1>All landing pages.</h1></div><p>Seven supplied compositions first,<br>followed by ten developed concepts.</p></header>
      <nav class="campaign-toolbar landing-selector" aria-label="Select a landing page">
        <div class="campaign-tabs">${tabs}</div>
      </nav>
      <div class="landing-stack" aria-label="All landing pages">${suppliedPages}${conceptPages}</div>
    </div>`;
  }
  return {artwork,faceRail,studyPage,expressionGrid,sceneFrame,landing,suppliedPreview:id=>suppliedFrame(supplied.find(c=>c.id===id),false)};
}};
