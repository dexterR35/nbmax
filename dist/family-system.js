/* One wardrobe artwork per family; the exact Figma emblem is a separate,
   image-relative layer. Original studies stay in the reference catalogue. */
(() => {
  const D=window.MAX_DATA, art=window.MAX_FAMILY_ART;
  const definitions=[
    ['member','Member',['member']], ['bronze','Bronze',['bronze']],
    ['silver','Silver',['silver']], ['gold','Gold',['gold']],
    ['platinum','Platinum',['platinum']], ['elite','Elite',['elite']],
    ['sapphire','Sapphire',['sapphire','champion']],
    ['ruby','Ruby',['ruby','ace']], ['emerald','Emerald',['emerald','elite-pro']],
    ['amethyst','Amethyst',['amethyst','icon']], ['diamond','Diamond',['diamond','legend']],
    ['black-diamond','Black Diamond',['black-diamond','prestige']],
    ['red-diamond','Red Diamond',['reserve','signature','infinite']],
    ['private','Private Black Diamond',['private','select','elite-black']],
    ['prismatic','Prismatic',['premier','elite-premier','centurion','centurion-elite']]
  ];
  D.originalOutfits=D.levels.filter(l=>l.outfit).map(l=>({level:l.slug,...l.outfit}));
  D.wardrobes=definitions.map(([id,name,slugs])=>({id,name,slugs,ref:'family-'+id,...art[id]}));
  const find=slug=>D.levels.find(l=>l.slug===slug);
  const garmentTitles=['Coat & silhouette','Waistcoat & neckwear','NB & the level shield','Cuff & gesture','Trousers','Footwear'];
  const anchorKeys=['coat','layers','emblem','cuff','trousers','shoes'];
  for(const w of D.wardrobes){
    for(const [rank,slug] of w.slugs.entries()){
      const l=find(slug), prev=rank?find(w.slugs[rank-1]):null;
      l.wardrobeId=w.id;
      l.familyRank=rank+1;
      l.familySize=w.slugs.length;
      const steady='The coat, layers, trousers, footwear and pose stay the same within this family.';
      const change=prev?`Within the ${w.name} family, ${l.name} follows ${prev.name}. The ${l.wingLabel.toLowerCase()} replaces the ${prev.wingLabel.toLowerCase()}. ${steady}`:w.slugs.length>1?`${l.name} establishes the ${w.name} wardrobe and its unwinged shield. Later ranks retain this ensemble and add the official wing treatments.`:`${l.name} has its own foundation shield and complete wardrobe. The foundation designs are separate emblems, not wing variants of one gemstone.`;
      const texts=[w.garments[0],w.garments[1],`The exact ${l.name} emblem sits below NB on Max’s left chest, viewer-right. NB identifies the ambassador; the ${l.wingLabel.toLowerCase()} identifies this rank.`,w.cuff+' '+w.gesture,w.garments[2],w.garments[3]];
      const finishes=[w.finishes?.[0]||'Visible cloth, edging and reflected highlights.',w.finishes?.[1]||'Layered cloth with patterned and lustrous surfaces.',`${l.wingLabel}; gemstone and frame retained exactly from the Figma export.`,w.finishes?.[2]||'Visible cuff fabric, trim and fastenings.',w.finishes?.[3]||'Tailored cloth appearance; exact fibre is unspecified.',w.finishes?.[4]||'Polished leather-like surfaces and visible fastenings.'];
      const meanings=['The outer silhouette defines the wardrobe family.','The inner layers coordinate with the full ensemble.','Recognizable core, clearly expressed rank.','The gesture supports Max’s role as a guide.','The lower half is a deliberate part of this wardrobe.','Footwear completes the colour and material relationship.'];
      l.outfit={
        slug,ref:w.ref,title:w.name+' wardrobe',subtitle:w.subtitle,
        color:w.color||'#84a8ff',status:'Family wardrobe proposal',pose:w.pose,
        influence:w.influence,change,garments:[...w.garments.slice(0,4),w.garments[4]+` · ${l.name} official chest emblem`],
        tags:[w.pose,w.slugs.length>1?`${w.slugs.length} ranks · one wardrobe`:'Individual foundation design',l.wingLabel],
        emblem:{...w.emblem},familyId:w.id,closeups:[w.anchors.layers,w.anchors.emblem,w.anchors.cuff],
        annotations:anchorKeys.map((key,i)=>({
          title:w.id==='member'&&i===0?'Waistcoat silhouette':garmentTitles[i],x:w.anchors[key][0],y:w.anchors[key][1],
          side:[0,1,4].includes(i)?'left':'right',row:[20,39,18,43,67,86][i],
          ...(i===2?{buttonX:Math.min(91,w.anchors[key][0]+7),buttonY:w.anchors[key][1]+1}:{}),
          text:texts[i],finish:finishes[i],meaning:meanings[i],
          delta:i===2?change:prev?`Unchanged from ${prev.name}: this family advances through the chest emblem and wings.`:w.slugs.length>1?`This garment is shared by ${w.slugs.map(s=>find(s).name).join(', ')}.`:'A distinct ensemble for this foundation level.'
        }))
      };
    }
  }
  // Promote useful family gestures while retaining every earlier pose study.
  D.poses=D.wardrobes.filter(w=>!['member','bronze','silver'].includes(w.id)).map(w=>({
    id:'family-'+w.id,title:w.pose,ref:w.ref,level:w.slugs[0],status:'Generated family proposal',
    gesture:w.gesture,context:w.context,voice:w.voice||'“Let me show you the details.”',
    note:`One ${w.name} wardrobe serves ${w.slugs.map(s=>find(s).name).join(', ')}. The official chest shield changes with the rank.`
  })).concat(D.poses);
  window.MAX_AMBASSADOR.campaigns.forEach(c=>{c.ref=find(c.level).outfit.ref;});
  D.motion[0].poster='family-bronze';D.motion[0].level='bronze';
})();
