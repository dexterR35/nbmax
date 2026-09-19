"""Package the three generated proposals without altering their visual content."""
from pathlib import Path
from PIL import Image
import json
import shutil

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / 'dist/assets'
SOURCE = ROOT.parent / 'ambassador-assets'
records = json.loads((ASSETS / 'reference-manifest.json').read_text())
proposals = [
    ('gold', 'welcome', 'Gold · a welcoming ambassador', 'Max with silver hair, black glasses and a white beard, offering an open palm. Navy gold-edged coat, brown patterned waistcoat, ivory cravat, cream trousers and brown Oxford shoes. NB, a small gold shield and N cuff fastening. Generated wardrobe and gesture proposal.'),
    ('champion', 'explain', 'Champion · explaining the way', 'The same silver-haired Max points toward viewer-right and opens the other palm. Royal-blue coat with gold floral borders, navy patterned waistcoat, silver-blue neckwear, blue trousers with a dark stripe and navy buckle boots. NB and a blue winged shield. Generated wardrobe and gesture proposal.'),
    ('reserve', 'present', 'Reserve · presenting the details', 'The same silver-haired Max presents with both hands open. Black textured split-tail coat, burgundy gold-embroidered lapels and cuffs, dark patterned waistcoat, burgundy cravat and trousers, and black lace-up boots with burgundy panels. NB, red shield, watch chain and N cuff details. Generated wardrobe and gesture proposal.')
]
for slug, pose, title, description in proposals:
    rid = 'proposal-' + slug
    source = SOURCE / f'max-{slug}-{pose}-navy.png'
    original = ASSETS / 'originals' / (rid + '.png')
    shutil.copyfile(source, original)
    with Image.open(source) as im:
        im.save(ASSETS / 'images' / (rid + '.webp'), quality=93, method=6)
        thumbnail = im.copy()
        thumbnail.thumbnail((560, 680))
        thumbnail.save(ASSETS / 'thumbs' / (rid + '.webp'), quality=85, method=6)
        record = dict(id=rid, title=title, roles=['wardrobe','poses','identity','proposals'], description=description, width=im.width, height=im.height, image=f'assets/images/{rid}.webp', thumb=f'assets/thumbs/{rid}.webp', original=f'assets/originals/{rid}.png', files=[source.name], origin='Generated proposal')
    records = [r for r in records if r['id'] != rid]
    records.append(record)
(ASSETS / 'reference-manifest.json').write_text(json.dumps(records, indent=2, ensure_ascii=False) + '\n')
(ROOT / 'dist/inventory.js').write_text('window.MAX_REFERENCES = ' + json.dumps(records, indent=2, ensure_ascii=False) + ';\n')
shutil.copyfile(SOURCE / 'prompts.json', ASSETS / 'ambassador-generation-prompts.json')
print(f'Integrated 3 proposals; {len(records)} catalogue records.')
