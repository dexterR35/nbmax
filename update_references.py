"""Append the six user-supplied ambassador references without replacing prior sources."""
from pathlib import Path
from PIL import Image
import hashlib, json, shutil

root=Path(__file__).resolve().parent
assets=root/'dist/assets'
manifest=assets/'reference-manifest.json'
records=json.loads(manifest.read_text())
hashes={hashlib.sha256((root/'dist'/r['original']).read_bytes()).hexdigest():r for r in records}
inputs=[
 ('il_794xN.8349830402_7u4e(1).webp','Black, burgundy & gold · complete ensemble',['craft'],'Black split-tail long coat with burgundy ornamental lapels, gold-coloured floral borders, patterned waistcoat, burgundy cravat, chain, gloves, black trousers and lace-up footwear. Clothing reference only.'),
 ('il_794xN.8349099418_notk.webp','Gothic red embroidery · shaped tails',['craft'],'High winged collar, black long coat with red scrolling embroidery, dark patterned waistcoat, small red fastenings and red lining. Black trousers and lace-up shoes complete the mannequin outfit.'),
 ('il_794xN.7678859829_lrnh.webp','Navy & gold · restrained tailoring',['craft'],'A navy coat with gold piping, a dark waistcoat, white shirt and black cravat on a photographic clothing model. The source is cropped above the footwear; it is not Max’s face or body.'),
 ('8700d36b-29e4-4b4d-b3f8-585b1cd344d2.png','NetBet MAX · landing-page direction',['atmosphere','badges','poses'],'Supplied blue NetBet MAX landing composition: full-length Max at left, enlarged gemstone shields near his feet, concise message at right, electric-blue button, white/red wordmark and a midnight-blue background.'),
 ('10c65ca5-4a0e-4f23-a38f-da15aceb1969.png','Original long-legged character · screenshot',['identity','poses'],'Supplied screen capture of the angular navy-and-orange Max with swept silver hair, glasses, white beard, long legs and open palm. Interface text and the visible crop belong to the source screenshot.'),
 ('af63ac54-af4c-412e-a74c-790526359623.png','Regency layers · cream trousers',['craft'],'Navy double-breasted cutaway coat, warm patterned waistcoat, ivory shirt and cravat, and high-waisted cream trousers on a photographic clothing model. The reference establishes a complete colour relationship, not Max’s identity; shoes are outside the crop.')
]
next_id=max(int(r['id'].split('-')[1]) for r in records if r['id'].startswith('ref-'))+1
for name,title,roles,description in inputs:
 src=root.parent/'upload'/name; h=hashlib.sha256(src.read_bytes()).hexdigest()
 if h in hashes:
  r=hashes[h]
  if name not in r['files']:r['files'].append(name)
  print('Existing reference:',r['id'],name)
  continue
 id_=f'ref-{next_id:02}';next_id+=1
 original=assets/'originals'/(id_+src.suffix)
 shutil.copy2(src,original)
 im=Image.open(src);width,height=im.size
 if im.mode not in ('RGB','RGBA'):im=im.convert('RGBA')
 im.thumbnail((1600,1600));im.save(assets/'images'/(id_+'.webp'),quality=93,method=6)
 im.thumbnail((560,680));im.save(assets/'thumbs'/(id_+'.webp'),quality=86,method=6)
 r=dict(id=id_,title=title,roles=roles,description=description,width=width,height=height,image='assets/images/'+id_+'.webp',thumb='assets/thumbs/'+id_+'.webp',original='assets/originals/'+original.name,files=[name],origin='Supplied reference')
 records.append(r);hashes[h]=r;print('Added:',id_,name)
corrections={
 'ref-05':'Purple long coat with pale scrolling embroidery, an ivory/silver patterned waistcoat and pale cravat, charcoal trousers, black boots and a small purple chest shield. The actual rendered layers are light at the centre.',
 'ref-27':'Deep royal-blue long coat with silver-coloured floral borders, a matching blue patterned waistcoat, silver-grey cravat, dark navy trousers and polished black ankle boots. Cyan shield on the left chest.',
 'ref-34':'Dark green coat with gold-coloured scrolling borders, green patterned waistcoat, gold cravat, charcoal trousers and polished black ankle boots. Green chest shield beneath NB.'
}
for r in records:
 if r['id'] in corrections:r['description']=corrections[r['id']]
manifest.write_text(json.dumps(records,ensure_ascii=False,indent=2))
(root/'dist/inventory.js').write_text('window.MAX_REFERENCES = '+json.dumps(records,ensure_ascii=False,indent=2)+';\n')
print('Total unique reference records:',len(records))
