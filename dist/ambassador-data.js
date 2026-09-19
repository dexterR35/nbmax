/* Second archive review and proposed ambassador extensions.
   Existing artwork stays intact; generated looks have explicit proposal status. */
(() => {
  const D=window.MAX_DATA;
  const find=slug=>D.levels.find(l=>l.slug===slug);
  const facts={
    member:['Navy waistcoat; no outer coat','Pale cravat and white shirt','Charcoal tailored trousers','Polished black ankle boots','Small blue chest shield; cane'],
    bronze:['Brown long coat with copper-coloured piping','Warm patterned waistcoat, pale cravat','Charcoal tailored trousers','Polished black ankle boots','Gold-coloured waistcoat chain; bronze shield; cane'],
    silver:['Charcoal cutaway coat with pale edging','Light patterned waistcoat and pale cravat','Charcoal tailored trousers','Polished black ankle boots','Silver-toned fastenings; small shield; cane'],
    amethyst:['Plum long coat with tonal scrollwork','Black patterned waistcoat and dark cravat','Charcoal tailored trousers','Polished black ankle boots','Purple shield; metallic-looking buttons; cane'],
    diamond:['Blue velvet-like long coat; silver floral borders','Blue patterned waistcoat; silver-grey cravat','Dark navy tailored trousers','Polished black ankle boots','Cyan shield; silver-toned buttons; cane'],
    'black-diamond':['Black raised-collar cutaway tailcoat','Black patterned waistcoat; pale cravat','Charcoal trousers with a subtle vertical pattern','Polished black ankle boots','Dark gem shield; silver-coloured edgework; cane'],
    ace:['Burgundy long coat; tonal vine-like embroidery','Black patterned waistcoat and black cravat','Charcoal tailored trousers','Polished black ankle boots','Pink chest shield; NB; cane'],
    'elite-pro':['Forest-green long coat; gold floral borders','Green patterned waistcoat; gold-coloured cravat','Charcoal tailored trousers','Polished black ankle boots','Green shield; small decorative chain detail; cane'],
    icon:['Purple long coat; pale floral borders','Ivory/silver patterned waistcoat; pale cravat','Charcoal tailored trousers','Polished black ankle boots','Purple shield; silver-toned buttons; cane'],
    'centurion-elite':['Black coat and cape with gold borders and lining','Black patterned waistcoat; gold-coloured cravat','Black tailored trousers','Polished black ankle boots','Prismatic shield; gold buttons; cane']
  };
  for(const l of D.levels){if(l.outfit){l.outfit.status='Existing concept artwork';l.outfit.garments=facts[l.slug];l.outfit.pose='Cane study';}}
  const diamond=find('diamond').outfit;
  diamond.tags=['Blue patterned waistcoat','Silver-grey cravat','Dark navy trousers'];
  diamond.change='From Amethyst: the coat and waistcoat become blue; the cravat becomes silver-grey and the trouser colour shifts to dark navy. Pale floral borders replace tonal purple decoration.';
  Object.assign(diamond.annotations[1],{title:'Blue waistcoat & silver cravat',text:'The supplied artwork shows a blue patterned waistcoat beneath a silver-grey tied cravat. Bright buttons form a vertical line through the blue centre.',finish:'Brocade-like blue surface and satin-like silver-grey folds.',delta:'The black waistcoat and cravat of Amethyst become blue and silver-grey.'});
  Object.assign(diamond.annotations[5],{title:'Dark navy trousers & black boots',text:'Dark navy trousers sit between the brighter blue coat tails. Black polished ankle boots retain the long lower silhouette.',finish:'Dark blue woven-cloth appearance; black leather-like gloss.',delta:'Dark navy replaces the charcoal trousers visible in Amethyst.'});
  const elite=find('elite-pro').outfit;
  elite.tags=['Green patterned waistcoat','Gold-coloured cravat','Charcoal trousers'];
  elite.change='From Ace: both the coat and patterned waistcoat become green. The black cravat becomes gold-coloured, matching the contrasting floral borders. The charcoal trousers and black boots remain in the supplied image.';
  Object.assign(elite.annotations[1],{title:'Green brocade-like centre',text:'The waistcoat is visibly green, with a scrolling pattern and warm buttons. A gold-coloured cravat sits over the black shirt collar.',finish:'Green patterned cloth appearance and lustrous gold neckwear.',delta:'Green and gold replace Ace’s black waistcoat and cravat.'});
  const icon=find('icon').outfit;
  icon.subtitle='Purple coat / ivory-silver waistcoat';
  icon.tags=['Ivory patterned waistcoat','Pale cravat','Purple coat'];
  icon.change='From Elite Pro: purple replaces green, and the waistcoat and cravat become pale ivory/silver. Cool floral edging replaces gold. The supplied charcoal trousers and black boots stay unchanged.';
  Object.assign(icon.annotations[1],{title:'Ivory waistcoat & pale cravat',text:'A light ivory/silver waistcoat carries a scrolling pattern below the pale cravat. This bright central layer is clearly visible in the supplied artwork.',finish:'Pale brocade-like pattern and soft, lustrous neckwear.',delta:'Light ivory/silver replaces Elite Pro’s green waistcoat and gold-coloured cravat.'});
  Object.assign(find('bronze').outfit.annotations[1],{text:'The warm patterned waistcoat is crossed by a visible gold-coloured chain. A pale cravat sits above it inside the brown coat.',finish:'Copper-brown brocade-like pattern, a metallic-looking chain and pale satin-like neckwear.'});

  // New records are completed with artwork-specific anchors after generation QA.
  window.MAX_AMBASSADOR={
    source:'https://casino.netbet.co.uk/netbet-max',
    sourceChecked:'19 September 2026',
    campaigns:[
      {id:'welcome',label:'Welcome',level:'gold',ref:'proposal-gold',number:'01',title:'Meet Max.',accent:'Your personal guide.',body:'Your levels and benefits, made simple.',cta:'Explore NetBet MAX',action:'wardrobe',badges:['ruby','emerald','centurion-elite'],purpose:'A first introduction',gesture:'An open palm leaves room for the message.',outfit:'Navy tailoring, a warm brocade-like waistcoat, cream trousers and brown shoes.',note:'Proposed welcome composition. The character is generated from the original Max; the official emblems remain separate source assets.'},
      {id:'weekly',label:'Rewards guide',level:'champion',ref:'proposal-champion',number:'02',title:'Your weekly rewards.',accent:'Made clear by Max.',body:'Playback and cashback benefits, explained in one place.',cta:'See how rewards work',action:'rewards',badges:['sapphire','champion'],purpose:'A helpful explanation',gesture:'A directional hand guides attention to the reward information.',outfit:'Royal blue tailoring, blue trousers with a dark side stripe and navy footwear.',note:'Proposed benefits composition. Reward categories come from the live NetBet Max page; eligibility and the current terms apply.'},
      {id:'reserve',label:'Offer spotlight',level:'reserve',ref:'proposal-reserve',number:'03',title:'A closer look at',accent:'your Reserve reward.',body:'Let Max guide you through the details.',offer:'£20 casino bonus',terms:'Reserve level-up prize · 10× wagering · Max win £100. Eligibility and full terms apply.',cta:'View reward details',action:'reserve',badges:['reserve','signature','infinite'],purpose:'An offer with its details',gesture:'Two open hands present the information without hiding the costume.',outfit:'Black and burgundy embroidered tailoring, burgundy trousers, a watch chain and dark lace-up footwear.',note:'Proposed offer composition. The stated Reserve prize and conditions were checked against the official level schedule; this is not a live account offer.'}
    ]
  };
})();
