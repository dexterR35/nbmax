"""Package inspected family artwork; no generated pixels are changed.

Run only when the sibling family-assets source directory is available.
The website itself needs no preparation or build command.
"""
from pathlib import Path
from PIL import Image
import json
import shutil

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / 'family-assets'
ASSETS = ROOT / 'dist/assets'
records = json.loads((ASSETS / 'reference-manifest.json').read_text())
art = {}

def xy(p):
    return [p.get('x', p.get('xPct')), p.get('y', p.get('yPct'))]

foundation = {
 'member': [
  'A considered beginning.', 'A composed welcome',
  'The relaxed pocket hand and upright cane stance give Max a composed, approachable presence.',
  'A quiet introduction to the programme; the cane is a styling prop, not a pointer.',
  '“Welcome. Let’s get you acquainted.”',
  ['Navy patterned waistcoat with blue piping; no outer coat.', 'Ivory shirt and softly folded ivory cravat.', 'Charcoal trousers with a subtle patterned appearance.', 'Black polished ankle boots.', 'NB monogram and a dark cane with a silver-toned handle.'],
  'An ivory shirt cuff is exposed beside the cane hand.'
 ],
 'bronze': [
  'Warm metal. A longer silhouette.', 'A formal introduction',
  'One hand rests on the cane while the other stays in a pocket; the upright posture feels measured.',
  'An introductory portrait or a calm explanation of the loyalty programme.',
  '“I’ll help you find the details.”',
  ['Warm dark-brown long coat with copper-coloured edging.', 'Brown patterned waistcoat, ivory cravat and a gold-coloured watch chain.', 'Charcoal trousers balancing the warm brown upper layers.', 'Polished black ankle boots.', 'NB monogram, watch chain and a dark cane.'],
  'The brown coat sleeve ends beside the pocket hand; copper-toned edging ties it to the lapel.'
 ],
 'silver': [
  'Cool tones. Precise contrasts.', 'A poised host',
  'A steady cane hand and a relaxed pocket hand preserve the earlier composed stance.',
  'An elegant standing portrait beside programme information.',
  '“A little clarity makes all the difference.”',
  ['Charcoal cutaway coat with silver-coloured edging and buttons.', 'Pale silver patterned waistcoat with an ivory cravat.', 'Charcoal trousers extending the dark coat silhouette.', 'Polished black ankle boots.', 'NB monogram, pale metallic fastenings and a dark cane.'],
  'The charcoal cuff finishes close to the pocket hand, with pale edging visible against the cloth.'
 ],
 'gold': [
  'An open invitation, from cravat to Oxford.', 'The open-palm welcome',
  'An open palm extends toward the content; the other arm rests low. The shoulders stay relaxed.',
  'Welcome screens, a first visit and a helpful invitation to explore.',
  '“Welcome to NetBet MAX. Let me show you around.”',
  ['Navy long coat with gold piping and a pale pocket square.', 'Warm brown patterned waistcoat, gold-coloured chain and ivory cravat.', 'Cream trousers deliberately contrast with the navy coat.', 'Brown Oxford-style shoes complete the warmer lower half.', 'NB monogram, watch chain and a visible N cuff fastening.'],
  'The white shirt cuff and small N fastening remain visible beside the open hand.'
 ],
 'platinum': [
  'Pearl grey, with a personal greeting.', 'The raised-hand greeting',
  'An open hand is raised beside the shoulder; the other remains low. No cane interrupts the gesture.',
  'A returning-visitor greeting or a quiet acknowledgement after an action.',
  '“Good to see you. What would you like to explore?”',
  ['Pearl-grey long coat with midnight lapels, dark cuffs and fine silver edging.', 'Ivory patterned waistcoat, silver-coloured chain and steel-blue cravat.', 'Steel-grey trousers continue the cool tonal palette.', 'Charcoal double-monk shoes with pale metal buckles.', 'NB monogram, coordinated chain and small cuff fastenings.'],
  'A dark coat cuff edged in silver frames the raised wrist and pale shirt cuff.'
 ]
}
for source in json.loads((SOURCE / 'foundation-observations.json').read_text())['assets']:
    ident = source['filename'][7:-4]
    subtitle, pose, gesture, context, voice, garments, cuff = foundation[ident]
    p = source['points_percent']
    anchors = {k: xy(p[v]) for k,v in dict(coat='coat_lapel', layers='waistcoat', emblem='intended_shield_centre', cuff='cuff', trousers='trousers', shoes='footwear').items()}
    art[ident] = dict(subtitle=subtitle, pose=pose, gesture=gesture, context=context, voice=voice, garments=garments, cuff=cuff, anchors=anchors, nb=xy(p['NB']))

gem_copy = {
 'sapphire': ['A royal-blue ensemble, made to explain.', 'Pointing the way', 'Programme explanations, navigation and pointing to a relevant benefit.', '“The details you need are just here.”'],
 'ruby': ['Burgundy embroidery. A quieter flourish.', 'An inviting presentation', 'Introducing a benefit with the terms positioned beside the open hand.', '“Let’s take a closer look.”'],
 'emerald': ['Green from coat to trouser, grounded in brown.', 'A warm acknowledgement', 'Acknowledging a completed action or introducing the current level.', '“Here is what your level includes.”'],
 'amethyst': ['Plum, dark pattern and an easy stance.', 'A relaxed explanation', 'A conversational assistant panel, with supporting information beside the palm.', '“I can help explain that.”'],
 'diamond': ['Blue and silver, with room to explain.', 'Explaining with both hands', 'Comparing benefits or explaining two choices without directing a wager.', '“Let’s look at the options together.”']
}
for source in json.loads((SOURCE / 'gem-observations.json').read_text())['assets']:
    ident = source['family']; p = source['anchors']; g = source['wardrobe']
    subtitle, pose, context, voice = gem_copy[ident]
    anchors = {k: xy(p[v]) for k,v in dict(coat='coatLapel', layers='waistcoat', emblem='intendedShieldCentre', cuff='cuff', trousers='trousers', shoes='shoes').items()}
    garments = [g['coat'],g['waistcoat']+' '+g['neckwear'],g['trousers'],g['shoes'],'NB monogram and coordinated cuff and garment fastenings.']
    art[ident] = dict(subtitle=subtitle, pose=pose, gesture=source['pose'], context=context, voice=voice, garments=garments, cuff=g['cuffs'], anchors=anchors, nb=xy(p['NB']))

royal_copy = {
 'elite': ['Navy, plum and a precise direction.', 'The helpful pointer', 'A programme walkthrough or contextual link, with both hands visible.', '“I’ll guide you to the right section.”'],
 'black-diamond': ['Dark texture, defined in silver.', 'A measured invitation', 'A calm introduction to detailed programme information.', '“Everything is here to explore at your pace.”'],
 'red-diamond': ['Burgundy, gold and the complete gesture.', 'Presenting the full picture', 'A landing-page offer with its important conditions close to the gesture.', '“Here is the offer, and here are the details.”'],
 'private': ['A dark coat. A distinctly checked trouser.', 'Directing attention below', 'Pointing toward a detail panel or the next section while keeping the other palm open.', '“You’ll find the explanation just below.”'],
 'prismatic': ['A cape completes the collection.', 'The ceremonial welcome', 'An editorial introduction to the highest family, with the full silhouette in view.', '“Welcome. Let me introduce this collection.”']
}
for source in json.loads((SOURCE / 'royal-observations.json').read_text())['assets']:
    ident = source['file'][7:-4]; p = source['points']; g = source['garments']
    subtitle, pose, context, voice = royal_copy[ident]
    anchors = {k: xy(p[v]) for k,v in dict(coat='coat_lapel', layers='waistcoat', emblem='emblem_blank_centre', cuff='cuff', trousers='trousers', shoes='footwear').items()}
    coat = g['coat_lapel'].replace(' Viewer-right lapel below NB is now plain navy after one targeted repair.', '').replace('; chest lapel stays plain beneath NB.', '.')
    if ident == 'prismatic':
        coat += ' A full black cape with gold lining and a floral gold border extends the silhouette.'
    garments = [text.replace('Original ', '').replace(' retained.', '.') for text in [coat,g['waistcoat']+' '+g['neckwear'],g['trousers'],g['footwear'],'NB monogram and coordinated metallic garment fastenings.']]
    gesture=source['pose'].replace('Original two-hand', 'Two-hand').replace('original crossed', 'crossed')
    art[ident] = dict(subtitle=subtitle, pose=pose, gesture=gesture, context=context, voice=voice, garments=garments, cuff=g['cuff'], anchors=anchors, nb=xy(p['nb']))

colours = {'member':'#84909f','bronze':'#c48657','silver':'#c9d4e1','gold':'#eac877','platinum':'#b9cfe6','elite':'#b994e6','sapphire':'#5689ff','ruby':'#ec6386','emerald':'#52d9a4','amethyst':'#bc80ea','diamond':'#85cafa','black-diamond':'#a4b1c9','red-diamond':'#fa536d','private':'#8aafff','prismatic':'#ba96ff'}
names = {'black-diamond':'Black Diamond','red-diamond':'Red Diamond','private':'Private Black Diamond'}
for ident, item in art.items():
    item['ref'] = rid = 'family-'+ident
    item['color'] = colours[ident]
    item['influence'] = ('A proposed Regency-inspired combination of a cravat, fitted layers and an elongated silhouette; it is not a reconstruction of a dated garment.' if ident in ['member','gold','platinum'] else 'A proposed Victorian/Gothic blend, visible in the long coat, formal layers and decorative edging. Period associations describe the concept, not verified historical construction.')
    item['emblem'] = dict(x=item['anchors']['emblem'][0],y=item['anchors']['emblem'][1],width=4.6)
    if ident == 'member': item['emblem'].update(y=21.8,width=5.2)
    if ident == 'sapphire': item['emblem'].update(width=4.9)
    if ident == 'red-diamond': item['emblem'].update(width=4.4)
    if ident == 'private': item['emblem'].update(width=4.3)
    if ident == 'prismatic': item['emblem'].update(width=4.5)
    item['anchors']['emblem'] = [item['emblem']['x'],item['emblem']['y']]
    item['finishes'] = ['Cloth texture, shaped edges and visible decorative trim.', 'Patterned layers and soft folds at the neck.', item['cuff'], 'Colour and pattern extend the complete ensemble.', 'Polished surfaces with the visible shoe fastening.']
    title = names.get(ident, ident.title()) + ' · ' + item['pose'].lower()
    description = 'Max with swept silver hair, black rectangular glasses, white beard and long-legged proportions. '+' '.join(item['garments'][:4])+' '+item['gesture']+' Generated family wardrobe proposal; the website attaches the exact official rank emblem below NB.'
    original = ASSETS / 'originals' / (rid+'.png')
    shutil.copyfile(SOURCE / (rid+'.png'), original)
    with Image.open(original) as im:
        im.save(ASSETS / 'images' / (rid+'.webp'), quality=93, method=6)
        thumbnail=im.copy();thumbnail.thumbnail((560,680))
        thumbnail.save(ASSETS / 'thumbs' / (rid+'.webp'), quality=85, method=6)
        record=dict(id=rid,title=title,roles=['wardrobe','poses','identity','proposals'],description=description,width=im.width,height=im.height,image=f'assets/images/{rid}.webp',thumb=f'assets/thumbs/{rid}.webp',original=f'assets/originals/{rid}.png',files=[rid+'.png'],origin='Generated proposal')
    records=[r for r in records if r['id']!=rid];records.append(record)

(ROOT / 'dist/family-art.js').write_text('window.MAX_FAMILY_ART = '+json.dumps(art,indent=2,ensure_ascii=False)+';\n')
(ASSETS / 'family-wardrobes.json').write_text(json.dumps(art,indent=2,ensure_ascii=False)+'\n')
(ASSETS / 'reference-manifest.json').write_text(json.dumps(records,indent=2,ensure_ascii=False)+'\n')
(ROOT / 'dist/inventory.js').write_text('window.MAX_REFERENCES = '+json.dumps(records,indent=2,ensure_ascii=False)+';\n')
generation=ASSETS / 'generation';generation.mkdir(exist_ok=True)
for name in ['foundation','gem','royal']:
    for kind in ['prompts','observations']:
        shutil.copyfile(SOURCE / f'{name}-{kind}.json', generation / f'{name}-{kind}.json')
print(f'Packaged {len(art)} family designs; {len(records)} archive entries.')
