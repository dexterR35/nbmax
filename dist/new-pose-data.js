/* Newly supplied cane-pose portraits. These remain unchanged source assets and
   are paired only with the wardrobe whose clothing direction they depict. */
window.MAX_NEW_POSE_ART=[
  {id:'pose-member-cane',wardrobeId:'member',title:'Member · cane portrait',file:'member-first badge.png',description:'Full-length Member portrait with a navy waistcoat, ivory shirt and cravat, charcoal trousers, black boots and a relaxed cane stance.'},
  {id:'pose-bronze-cane',wardrobeId:'bronze',title:'Bronze · cane portrait',file:'bronza.png',description:'Full-length Bronze portrait with a warm brown long coat, patterned waistcoat, pale cravat, charcoal trousers and cane.'},
  {id:'pose-platinum-cane',wardrobeId:'platinum',title:'Platinum · cane portrait',file:'platinum.png',description:'Full-length Platinum portrait with a charcoal coat, silver patterned waistcoat, pale neckwear and a formal cane stance.'},
  {id:'pose-prismatic-cane',wardrobeId:'prismatic',title:'Prismatic · cane portrait',file:'elite, premiere.png',description:'Full-length Prismatic portrait with black-and-gold ceremonial tailoring, an extended coat silhouette and cane.'},
  {id:'pose-sapphire-cane',wardrobeId:'sapphire',title:'Sapphire · cane portrait',file:'saphire,champion.png',description:'Full-length Sapphire-family portrait with a royal-blue long coat, silver ornament, dark trousers and cane.'},
  {id:'pose-ruby-cane',wardrobeId:'ruby',title:'Ruby · cane portrait',file:'ruby,ace.png',description:'Full-length Ruby-family portrait with a burgundy long coat, tonal embroidery, dark formal layers and cane.'},
  {id:'pose-emerald-cane',wardrobeId:'emerald',title:'Emerald · cane portrait',file:'Emerald,Elite Pro.png',description:'Full-length Emerald-family portrait with a forest-green coat, gold ornament, dark trousers and cane.'},
  {id:'pose-amethyst-cane',wardrobeId:'amethyst',title:'Amethyst · cane portrait',file:'aymethyst,icon.png',description:'Full-length Amethyst-family portrait with a purple long coat, dark patterned layers and cane.'},
  {id:'pose-black-diamond-cane',wardrobeId:'black-diamond',title:'Black Diamond · cane portrait',file:'black diamon,prestice.png',description:'Full-length Black Diamond-family portrait with black cutaway tailoring, restrained silver ornament, pale cravat and cane.'}
].map(item=>({...item,roles:['wardrobe','poses','proposals'],width:1024,height:1536,image:`assets/new_image/${item.file}`,thumb:`assets/new_image/${item.file}`,original:`assets/new_image/${item.file}`,files:[item.file],origin:'Supplied character pose'}));
window.MAX_REFERENCES.push(...window.MAX_NEW_POSE_ART);
