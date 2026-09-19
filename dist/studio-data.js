/* Character acting studies and campaign environments are creative extensions.
   The established loyalty wardrobe and exact rank order remain unchanged. */
(() => {
  const A=window.MAX_AMBASSADOR;
  const scenes=[
    ['welcome','scene-welcome','The blue gallery','An open invitation.','Crystal architecture, subtle table-game motifs and a warm welcome.'],
    ['weekly','scene-temple','The temple world','A guide through the details.','An Egyptian-inspired game world recedes behind Max.'],
    ['reserve','scene-royal','The royal hall','A considered presentation.','Blue columns and a distant Norse-inspired game figure support the foreground host.'],
    ['emerald','scene-emerald','The emerald garden','A different world. The same Max.','Soft clover and game-world details sit behind a brighter character gesture.'],
    ['prismatic','scene-prismatic','The prismatic collection','Every world has a familiar guide.','Quiet game portals and refracted blue light frame the ceremonial silhouette.']
  ];
  A.campaigns.push(
    {id:'emerald',label:'Emerald garden',level:'emerald',number:'04',title:'A world to explore.',accent:'A familiar guide.',body:'Meet Max in the Emerald wardrobe.',cta:'Explore the Emerald family',action:'wardrobe',badges:['emerald','elite-pro'],purpose:'A brighter introduction',gesture:'An expressive greeting brings warmth to the game-world setting.',outfit:'Green tailoring with coordinated layers and footwear.',note:'A proposed game-world composition. The background motifs are illustrative, not a catalogue of available titles.'},
    {id:'prismatic',label:'Prismatic world',level:'centurion-elite',number:'05',title:'Every world.',accent:'Always Max.',body:'Discover the ceremonial wardrobe and its evolving emblem.',cta:'Explore the Prismatic family',action:'wardrobe',badges:['premier','elite-premier','centurion','centurion-elite'],purpose:'The collection’s ceremonial scene',gesture:'A composed greeting keeps Max recognizable within the wider game universe.',outfit:'Black and gold tailoring, a cape and coordinated formal footwear.',note:'A proposed campaign scene. The games are supporting scenery; no availability or reward outcome is implied.'}
  );
  for(const [id,scene,name,tagline,environment] of scenes){
    const c=A.campaigns.find(c=>c.id===id);
    Object.assign(c,{scene,environment,name,tagline});
  }
  A.campaigns[0].label='Blue gallery';A.campaigns[1].label='Temple world';A.campaigns[2].label='Royal reserve';
  // A second art direction: Max belongs to the game-world background ensemble.
  // These are campaign compositions, not additional loyalty tiers.
  const copy={
    welcome:['Meet Max.','Your personal guide.','Your levels and benefits, made simple.','Explore NetBet MAX'],
    weekly:['Your benefits.','Clearly explained.','Let Max guide you through playback and cashback.','Explore your benefits'],
    reserve:['Your Reserve.','Made clear.','A closer look at your level-up reward.','View reward details'],
    emerald:['A familiar face.','A different world.','Meet Max in the Emerald collection.','Explore Emerald'],
    prismatic:['Every world.','Always Max.','Discover the Prismatic wardrobe and its evolving emblem.','Explore the collection']
  };
  for(const c of A.campaigns){
    [c.title,c.accent,c.body,c.cta]=copy[c.id];
    c.composition='spotlight';
    c.eyebrow=c.offer?'Reserve / Level-up reward':'Your NetBet MAX guide';
  }
  A.campaigns.push(
    {id:'temple-ensemble',scene:'ensemble-temple',number:'06',label:'Temple cast',name:'The temple ensemble',composition:'ensemble',level:'champion',title:'New worlds.',accent:'A familiar guide.',body:'Your levels and benefits, with Max by your side.',cta:'Meet your Max',action:'wardrobe',badges:['sapphire','champion'],eyebrow:'Meet the NetBet MAX ambassador',tagline:'Max, within the world.',environment:'Max joins an Egyptian-inspired cast in a blue and gold temple.'},
    {id:'garden-ensemble',scene:'ensemble-garden',number:'07',label:'Garden cast',name:'The midnight garden',composition:'ensemble',level:'emerald',title:'A little wonder.',accent:'Always Max.',body:'Explore the Emerald collection with a familiar host.',cta:'Explore Emerald',action:'wardrobe',badges:['emerald','elite-pro'],eyebrow:'The Emerald collection',tagline:'A quieter kind of magic.',environment:'Green tailoring connects Max to the midnight garden and its folklore character.'},
    {id:'northern-ensemble',scene:'ensemble-northern',number:'08',label:'Northern cast',name:'The northern hall',composition:'ensemble',level:'reserve',title:'Your Reserve.',accent:'Made clear.',body:'Let Max walk you through the details.',cta:'View reward details',action:'reserve',badges:['reserve','signature','infinite'],eyebrow:'Reserve / Level-up reward',tagline:'A host among legends.',environment:'Max’s black and burgundy tailoring sits within a blue hall and a supporting game cast.'},
    {id:'salon-ensemble',scene:'ensemble-salon',number:'09',label:'Salon cast',name:'The grand salon',composition:'ensemble',level:'gold',title:'Welcome to',accent:'NetBet MAX.',body:'One host for your levels, benefits and next question.',cta:'Explore NetBet MAX',action:'wardrobe',badges:['gold','ruby','emerald'],eyebrow:'Meet your personal guide',tagline:'The collection comes together.',environment:'Max and the game cast share a navy salon with subtle table-game details.'},
    {id:'convergence-ensemble',scene:'ensemble-convergence',number:'10',label:'All worlds',name:'Where worlds meet',composition:'ensemble',level:'centurion-elite',title:'Many worlds.',accent:'One Max.',body:'Explore the Prismatic collection and its changing wings.',cta:'Explore the collection',action:'wardrobe',badges:['premier','elite-premier','centurion','centurion-elite'],eyebrow:'The Prismatic collection',tagline:'One unmistakable ambassador.',environment:'A crystalline setting brings the game cast together around Max’s ceremonial silhouette.'}
  );
  const reserve=A.campaigns.find(c=>c.id==='reserve');
  Object.assign(A.campaigns.find(c=>c.id==='northern-ensemble'),{offer:reserve.offer,terms:reserve.terms});
  const expressions=[
    ['front','Front / attentive','Front','Neutral','Regency','Eyes level, mouth resting and the face centred.','A stable identity reference before expression or camera angle changes.'],
    ['profile','Side profile','Profile','Neutral','Regency','A true side view reveals the hair sweep, spectacle arm, nose and beard silhouette.','Check recognition from the side, without shifting the features to face the viewer.'],
    ['three-quarter','Three-quarter smile','Three-quarter','Smile','Regency','A soft smile accompanies a turned head and an off-centre gaze.','A conversational portrait beside a guide panel.'],
    ['talking','Mid-conversation','Front','Talking','Regency','Parted lips and attentive eyes suggest a moment during speech.','A still key-pose proposal for an explanation; it is not lip-synced animation.'],
    ['excited','Bright excitement','Front','Excited','Regency','Raised brows and a broad smile lift the expression.','An enthusiastic greeting or editorial reveal.'],
    ['funny','A little mischief','Three-quarter','Funny','Regency','An asymmetric brow and playful grin give Max a touch of dry humour.','A light moment in the character story.'],
    ['smile','The familiar smile','Front','Smile','Gothic','A gentle, closed-mouth smile softens the formal collar.','A calm welcome, with expression carrying more warmth than gesture.'],
    ['sad','A quieter moment','Three-quarter','Sad','Gothic','Lowered eyes and a subdued mouth show a softer emotional range.','An empathetic acting study; not a response to a player’s losses.'],
    ['angry','Restrained anger','Front','Angry','Gothic','Furrowed brows and pressed lips create tension without changing the face.','Dramatic character development, separate from the helpful host’s default behaviour.'],
    ['villain','The theatrical smirk','Three-quarter','Villain','Gothic','A knowing smirk and one raised brow explore a mischievous antagonist reading.','A fictional acting experiment, not Max’s canonical personality.'],
    ['danger','Alert to something','Three-quarter','Alert','Gothic','Widened eyes and slightly parted lips suggest surprise or concern.','A warning or suspense key-pose study without violence.'],
    ['laughing','An unguarded laugh','Front','Laughing','Gothic','An open laugh and creased eyes make the expression visibly different from a smile.','A humorous character-story beat.']
  ].map(([id,title,angle,emotion,style,visible,context])=>({id:'face-'+id,ref:'face-'+id,title,angle,emotion,style,visible,context,type:'face',outfit:style==='Regency'?'Navy and gold collar, ivory neckwear and warm patterned layers.':'Black and burgundy raised collar with restrained decorative edging.',brand:'This head-and-shoulders crop ends above the chest shield. The emblem has not been moved onto the face or collar.'}));
  const bodies=[
    {id:'build-front',title:'An expressive front view',angle:'Front',emotion:'Excited',style:'Regency',level:'gold',visible:'A centred, full-length pose opens the hands and keeps the long-legged silhouette readable.',context:'An expressive greeting with the entire costume in view.',outfit:'Navy and red tailoring, a red waistcoat and bow tie, ivory trousers and coordinated light shoes.'},
    {id:'build-profile',title:'The true side silhouette',angle:'Profile',emotion:'Neutral',style:'Regency',level:'gold',visible:'The body turns fully sideways; the head, coat tails and footwear form a clear profile.',context:'Character development from a genuinely different camera angle.',outfit:'The navy, red and ivory direction seen in profile.'},
    {id:'build-gothic',title:'A confident three-quarter',angle:'Three-quarter',emotion:'Villain',style:'Gothic',level:'reserve',visible:'A turned stance and folded arms create a more theatrical reading.',context:'An alternative dramatic pose, kept separate from the default assistant stance.',outfit:'Black and burgundy formal layers, patterned dark trousers and black boots.'},
    {id:'build-back',title:'The back of the coat',angle:'Back',emotion:'Neutral',style:'Gothic',level:'reserve',visible:'The rear waist, coat opening and hem take priority. A slight head turn keeps a hint of Max’s identity.',context:'A garment-development view for reading the back silhouette.',outfit:'Black Gothic coat with burgundy lining and restrained rear ornamentation.'}
  ].map(b=>({...b,ref:b.id,type:'body',brand:['build-profile','build-back'].includes(b.id)?'The chest is hidden from this angle. NB and the loyalty emblem stay on the front of the garment; they are not moved onto its back.':'NB identifies Max. The separate official shield is placed below it on the chest. This outfit is an additional styling proposal, not a replacement loyalty tier.'}));
  window.MAX_STUDIO={expressions,bodies,studies:[...expressions,...bodies]};
})();
