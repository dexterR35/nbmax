"""Package five inspected ensemble originals and encoding-only derivatives."""
from pathlib import Path
from PIL import Image
import json
import shutil

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / 'dist/assets'
SOURCE = ROOT.parent / 'ensemble-assets'
records = json.loads((ASSETS / 'reference-manifest.json').read_text())
studio = json.loads((ASSETS / 'studio-manifest.json').read_text())
metadata = json.loads((SOURCE / 'ensemble-metadata.json').read_text())
levels = {'temple': 'champion', 'garden': 'emerald', 'northern': 'reserve',
          'salon': 'gold', 'convergence': 'centurion-elite'}

for asset in metadata['assets']:
    rid = asset['id']
    source = SOURCE / (rid + '.png')
    original = ASSETS / 'originals' / source.name
    shutil.copyfile(source, original)
    garments = '; '.join(asset['visible_garments']) + '.'
    cast = ', '.join(item['character'] for item in asset['background_figures'])
    description = ('Max in the ' + rid[9:] + ' ensemble. ' + asset['pose'] +
                   ' ' + garments + ' Supporting game cast: ' + cast +
                   '. Generated styling proposal; not an official game-title asset.')
    with Image.open(original) as image:
        image.save(ASSETS / 'images' / (rid + '.webp'), quality=92, method=6)
        thumb = image.copy()
        thumb.thumbnail((560, 680))
        thumb.save(ASSETS / 'thumbs' / (rid + '.webp'), quality=85, method=6)
        record = dict(id=rid, title='Max / ' + rid[9:].title() + ' ensemble',
                      roles=['atmosphere', 'poses', 'proposals'], description=description,
                      width=image.width, height=image.height,
                      image=f'assets/images/{rid}.webp', thumb=f'assets/thumbs/{rid}.webp',
                      original=f'assets/originals/{rid}.png', files=[source.name],
                      origin='Generated proposal')
    records = [r for r in records if r['id'] != rid] + [record]
    emblem = asset['chest_emblem']
    studio[rid] = dict(observation=asset['pose'] + ' Supporting cast: ' + cast + '.',
                      garments=garments, type='scene', level=levels[rid[9:]],
                      emblem=dict(x=emblem['x_percent'], y=emblem['y_percent'],
                                  width=emblem['width_percent']))

def write_json(path, value):
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n')

write_json(ASSETS / 'reference-manifest.json', records)
write_json(ASSETS / 'studio-manifest.json', studio)
(ROOT / 'dist/inventory.js').write_text('window.MAX_REFERENCES = ' + json.dumps(records, indent=2, ensure_ascii=False) + ';\n')
(ROOT / 'dist/studio-assets.js').write_text('window.MAX_STUDIO_ASSETS = ' + json.dumps(studio, indent=2, ensure_ascii=False) + ';\n')
shutil.copyfile(SOURCE / 'ensemble-metadata.json', ASSETS / 'generation/ensemble-metadata.json')
print(f'Integrated 5 ensemble scenes; {len(records)} archive records; {len(studio)} studio assets.')
