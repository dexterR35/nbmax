"""Ingest the selected scene/acting outputs and supplied references.
Only copies and resolution/encoding derivatives; no image-content editing.
"""
from pathlib import Path
from PIL import Image
import json, shutil, hashlib

ROOT=Path(__file__).resolve().parent
ASSETS=ROOT/'dist/assets'
SOURCE=ROOT.parent/'studio-assets'
UPLOAD=ROOT.parent/'upload'
records=json.loads((ASSETS/'reference-manifest.json').read_text())
studio={}

def package(source,rid,title,roles,description,origin):
    global records
    ext=source.suffix.lower()
    original=ASSETS/'originals'/(rid+ext)
    shutil.copyfile(source,original)
    with Image.open(original) as im:
        im.save(ASSETS/'images'/(rid+'.webp'),quality=92,method=6)
        thumb=im.copy();thumb.thumbnail((560,680))
        thumb.save(ASSETS/'thumbs'/(rid+'.webp'),quality=85,method=6)
        r=dict(id=rid,title=title,roles=roles,description=description,width=im.width,height=im.height,image=f'assets/images/{rid}.webp',thumb=f'assets/thumbs/{rid}.webp',original=f'assets/originals/{rid}{ext}',files=[source.name],origin=origin)
    records=[r for r in records if r['id']!=rid]+[r]

supplied=[
 ('Screenshot_20260919_160416.png','Gothic coat / cropped reference','Black shaped tailcoat with burgundy lapels, cuffs and lining, gold floral borders, a chain, dark trousers and black shoes.'),
 ('Screenshot_20260919_160335.png','Navy and red / cropped reference','Photographic model in a navy red-piped long coat, red waistcoat and bow tie, white trousers and light shoes. Costume inspiration only.'),
 ('il_1140xN.8244318812_eltj.webp','Navy, red and ivory / full reference','A clothing reference showing a navy and red ensemble, ivory trousers and light shoes in a Paris-themed setting. The model is not Max.'),
 ('il_794xN.7767725409_l53f.webp','Red tailcoat / pale layers','A red coat with dark lapels and pale edging, pale waistcoat, ivory cravat and pale trousers. The reference is cropped above the footwear.'),
 ('il_794xN.7624968443_7uy7.webp','Cravat and waistcoat / detail','Close-up of an ivory cravat, white shirt, warm brown patterned waistcoat and navy coat with a white pocket square.'),
 ('il_794xN.8289169857_72ua.webp','Black and burgundy / shaped tails','A black coat on a mannequin with burgundy lapels, waistcoat and lining, delicate dark floral ornament, black trousers and black footwear.'),
 ('il_794xN.8415388345_8xvo.webp','Gothic tailoring / three views','A commercial clothing sheet showing front, three-quarter detail and back views. Raised collar, burgundy layers, long tails and subdued decorative borders are visible. Printed construction claims are not independently verified.'),
 ('il_794xN.8367507706_iifi.webp','Rear waist and hem / garment reference','Rear mannequin view of a long dark coat, with a waist tab, two buttons, central burgundy opening and fine hem ornament.'),
 ('il_794xN.8415388303_harh.webp','Side silhouette / garment reference','Side mannequin view of a black and burgundy long coat, raised collar, fitted waist, decorative edges and dark trousers and shoes.'),
 ('il_794xN.8367507720_16x2.webp','Walking silhouette / garment reference','Black and burgundy Gothic ensemble on a mannequin in a walking stance. Long shaped coat fronts, burgundy waistcoat, dark cravat, trousers and boots are visible.'),
 ('ChatGPT Image Sep 9, 2026, 02_29_28 AM (5).png','Game-world landing / emblem cluster','Supplied blue landing composition with headline at left, gold lightning and XP symbols, blue shield, clover, small game-character portraits and a rank sequence at right.'),
 ('ChatGPT Image Sep 9, 2026, 02_29_28 AM (4).png','Game-world landing / left visual','Supplied navy landing composition with a large symbol cluster at left, white text and a blue button at right, game-character portraits and coloured emblems below.'),
 ('ChatGPT Image Sep 9, 2026, 02_29_27 AM (2).png','Game-world landing / orbit','Supplied navy landing concept with orbiting game-character portraits, a large gold lightning motif, clover and shield, and a row of loyalty emblems.'),
 ('ChatGPT Image Sep 9, 2026, 02_27_53 AM (3)(3).png','Game characters / layered composition','Supplied landscape concept showing a queen, folklore figure and Norse-inspired warrior, with gold symbols, blue atmosphere and white campaign text.'),
 ('ChatGPT Image Sep 9, 2026, 02_27_53 AM (1)(2).png','Game characters / foreground invitation','Supplied landscape with a queen’s open palm in the foreground, smaller supporting characters behind, flowing blue shapes and a central message.'),
 ('ChatGPT Image Sep 9, 2026, 02_27_44 AM (5).png','Game characters / mobile hierarchy','Supplied portrait campaign showing layered game characters above a large white headline, gold symbols and an electric-blue action button.'),
 ('ChatGPT Image Sep 9, 2026, 02_27_44 AM (3)(1).png','Game characters / royal environment','Supplied portrait campaign with royal blue columns and banners, three game characters, floating symbols and a message below.'),
 ('ChatGPT Image Sep 9, 2026, 01_57_01 AM (2)(5).png','Game characters / ensemble','Supplied landscape artwork with queen, folklore and Norse-inspired characters behind gold lightning, clover, XP and gemstone symbols. A lower row compares winged emblems.')
]
for n,(file,title,description) in enumerate(supplied,1):
    rid=f'new-ref-{n:02}'
    package(UPLOAD/file,rid,title,['wardrobe','craft'] if n<=10 else ['atmosphere','badges'],description,'Supplied reference')

warm=json.loads((SOURCE/'face-warm-metadata.json').read_text())
dramatic=json.loads((SOURCE/'face-dramatic-metadata.json').read_text())
face_observations={
 'front':'A centred frontal face, level eyes and a subtle closed-mouth smile.',
 'profile':'A true right-facing profile shows the spectacle arm, nose and beard silhouette.',
 'three-quarter':'The head turns toward image-right while the eyes glance left; a slight tilt accompanies a small smile.',
 'talking':'The head turns slightly to image-right; the mouth is open mid-speech with the upper teeth visible.',
 'excited':'Raised brows and a broad toothy smile, with the head slightly turned.',
 'funny':'An asymmetric eyebrow and a cheeky closed-mouth grin, with a turned and tilted head.'
}
for a in warm['assets']:
    source=Path(a['path']);rid=source.stem;key=rid[5:]
    studio[rid]=dict(observation=face_observations[key],garments='Navy coat with gold edging, ivory cravat and brown patterned waistcoat.',type='face')
for a in dramatic['images']:
    rid='face-'+a['name']
    neckwear='burgundy' if a['name'] in ['smile','angry','danger'] else 'black'
    studio[rid]=dict(observation=a['head_angle']+'. '+a['expression']+'.',garments=f'Black and burgundy raised collar, ornamental borders and {neckwear} neckwear over patterned dark layers.',type='face')
for rid,v in list(studio.items()):
    description='Max expression study: '+v['observation']+' Silver swept hair, black rectangular glasses and a white beard. '+v['garments']+' Generated creative proposal.'
    package(SOURCE/(rid+'.png'),rid,'Max / '+rid[5:].replace('-',' ').title(),['identity','poses','proposals'],description,'Generated proposal')

for a in json.loads((SOURCE/'body-metadata.json').read_text())['assets']:
    rid=Path(a['file']).stem;e=a['shieldOverlay']
    studio[rid]=dict(observation=a['pose'],garments=a['garments'],type='body',level='gold' if rid in ['build-front','build-profile'] else 'reserve')
    if e['visible']: studio[rid]['emblem']=dict(x=e['centerXPct'],y=e['centerYPct'],width=e['widthPct'],rotation=e.get('rotationDeg',0))
    description='Max full-character study. '+a['pose']+' '+a['garments']+' Generated styling proposal.'
    package(SOURCE/a['file'],rid,'Max / '+rid[6:].title()+' body study',['wardrobe','poses','identity','proposals'],description,'Generated proposal')

for a in json.loads((SOURCE/'scene-metadata.json').read_text())['assets']:
    rid='scene-'+a['id'];e=a['badge'];slug={'welcome':'gold','temple':'champion','emerald':'emerald','royal':'reserve','prismatic':'centurion-elite'}[a['id']]
    studio[rid]=dict(observation=a['pose']+' '+a['scene'],garments=a['outfit'],type='scene',level=slug,emblem=dict(x=e['x_percent'],y=e['y_percent'],width=e['width_percent']))
    description='Max in the '+a['id']+' game-world concept. '+a['pose']+' '+a['outfit']+' '+a['scene']+' Generated environment proposal with game motifs subordinate to Max.'
    package(SOURCE/(rid+'.png'),rid,'Max / '+a['id'].title()+' environment',['atmosphere','poses','proposals'],description,'Generated proposal')

(ASSETS/'reference-manifest.json').write_text(json.dumps(records,indent=2,ensure_ascii=False)+'\n')
(ROOT/'dist/inventory.js').write_text('window.MAX_REFERENCES = '+json.dumps(records,indent=2,ensure_ascii=False)+';\n')
(ASSETS/'studio-manifest.json').write_text(json.dumps(studio,indent=2,ensure_ascii=False)+'\n')
(ROOT/'dist/studio-assets.js').write_text('window.MAX_STUDIO_ASSETS = '+json.dumps(studio,indent=2,ensure_ascii=False)+';\n')
for name in ['scene','body','face-warm','face-dramatic']:
    shutil.copyfile(SOURCE/(name+'-metadata.json'),ASSETS/'generation'/(name+'-metadata.json'))
print(f'Integrated {len(studio)} studio artworks and {len(supplied)} supplied references; {len(records)} total catalogue records.')
