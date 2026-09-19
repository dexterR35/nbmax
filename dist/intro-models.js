/* Eight selected artworks, grouped into four outfit models. */
window.MAX_INTRO_MODELS=[
  {id:'gothic',name:'Black & burgundy',ref:'build-gothic',upload:'build-gothic.webp',views:[{ref:'build-gothic',label:'Three-quarter',upload:'build-gothic.webp'},{ref:'build-back',label:'Back',upload:'build-back.webp'}],subtitle:'A composed stance, with a richer Gothic character.',garments:['Black long coat with burgundy embroidery, collar and lining.','Burgundy waistcoat, black neckwear and a red jewelled fastening.','Dark pinstriped trousers.','Black lace-up boots and black gloves.'],detail:'#build/build-gothic'},
  {id:'navy-red',name:'Navy & red',ref:'build-front',upload:'build-front.webp',views:[{ref:'build-front',label:'Front',upload:'build-front.webp'},{ref:'build-profile',label:'Profile',upload:'build-profile.webp'}],subtitle:'An open welcome, in navy, red and ivory.',garments:['Navy long coat with red piping and a red lining.','Red patterned waistcoat and bow tie over a white shirt.','Ivory tailored trousers.','Brown-and-ivory lace-up shoes.'],detail:'#build/build-front'},
  {id:'classic-gold',name:'Navy & gold',ref:'family-gold',upload:'family-gold (2).webp',views:[{ref:'family-gold',label:'Presenting',upload:'family-gold (2).webp'},{ref:'proposal-gold',label:'Gold badge',upload:'proposal-gold.webp'}],subtitle:'A familiar guide, with warm gold details.',garments:['Navy long coat with gold-coloured piping.','Brown patterned waistcoat, ivory cravat and a decorative chain.','Cream tailored trousers.','Brown polished lace-up shoes.'],detail:'#detail/gold'},
  {id:'emerald',name:'Emerald & gold',ref:'family-emerald',upload:'family-emerald.webp',views:[{ref:'family-emerald',label:'Gesture',upload:'family-emerald.webp'},{ref:'pose-emerald-cane',label:'Cane pose',upload:'Emerald,Elite Pro.png'}],subtitle:'A confident green direction, finished with warm gold ornament.',garments:['Forest-green long coat with gold-coloured floral borders.','Green patterned waistcoat and gold-coloured neckwear.','Dark coordinated trousers.','Brown polished shoes and a formal cane.'],detail:'#detail/emerald'}
];
window.MAX_INTRO_VIEWS={create({R,esc,img}){
  const models=window.MAX_INTRO_MODELS,views={};
  const artwork=(id,cls='',eager=false)=>`<span class="intro-selected-art ${cls}" data-intro-art="${id}">${img(id,'',eager)}</span>`;
  function choices(index){return `<div class="intro-model-choices" aria-label="Four selected outfit models">${models.map((m,i)=>`<button type="button" data-intro-model="${i}" aria-pressed="${i===index}">${artwork(m.ref)}<span><small>0${i+1}</small><strong>${m.name}</strong></span></button>`).join('')}</div>`;}
  function chooseView(index,ref){if(models[index].views.some(v=>v.ref===ref))views[models[index].id]=ref;}
  function carouselBody(index){
    const m=models[index],v=m.views.find(v=>v.ref===views[m.id])||m.views[0];
    return `<article class="collection-slide intro-model-slide" role="group" aria-roledescription="slide" aria-label="${index+1} of ${models.length}: ${m.name}" data-intro-outfit="${m.id}">
      <figure class="collection-portrait">${artwork(v.ref,'',true)}<figcaption>${v.label} view <span>Selected character artwork</span></figcaption></figure>
      <div class="collection-story"><span class="eyebrow">Outfit model / 0${index+1}</span><h3>${m.name}<span>.</span></h3><p class="collection-description">${m.subtitle}</p>
        ${m.views.length>1?`<div class="intro-view-switch" role="group" aria-label="View of the navy-and-red outfit">${m.views.map(view=>`<button type="button" data-intro-pose="${view.ref}" aria-pressed="${view.ref===v.ref}">${view.label} view</button>`).join('')}</div>`:''}
        <dl class="carousel-garments">${['Coat','Layers','Trousers','Finishing details'].map((label,i)=>`<div><dt>${label}</dt><dd>${m.garments[i]}</dd></div>`).join('')}</dl>
        <div class="button-row"><button type="button" class="button secondary" data-image="${v.ref}">Inspect the artwork <span aria-hidden="true">↗</span></button><a class="text-link" href="${m.detail}">Explore this model →</a></div>
      </div></article>`;
  }
  return {models,artwork,choices,chooseView,carouselBody};
}};
