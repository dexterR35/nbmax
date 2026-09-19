"""Prepare unchanged source artwork and web display copies. Run from project root."""
from pathlib import Path
from PIL import Image
import json, shutil

ROOT = Path(__file__).resolve().parent
WORK = ROOT.parent
ASSETS = ROOT / 'dist/assets'
for folder in ['originals', 'images', 'thumbs', 'documents']:
    (ASSETS/folder).mkdir(parents=True, exist_ok=True)
inventory = json.loads((WORK/'tmp/inventory/unique.json').read_text())
all_files = json.loads((WORK/'tmp/inventory/files.json').read_text())
descriptions = {
'ref-01': ('Bronze · the first coat', ['wardrobe','identity'], 'Warm brown long coat, pale cravat, copper-toned waistcoat and a bronze chest shield. Cane pose.'),
'ref-02': ('Silver · early suit study', ['wardrobe','poses'], 'Silver-grey contemporary three-piece tailoring; an open palm and crossed, elongated legs. An earlier exploration.'),
'ref-03': ('Regency cutaway reference', ['craft'], 'Navy cutaway coat, cream waistcoat and pale trousers shown on a mannequin, front and back. Clothing reference, not Max.'),
'ref-04': ('Gold · early suit study', ['wardrobe','poses'], 'Gold-coloured suit, white shirt, dark tie and open palm. An early colour exploration, not an approved Gold-level outfit.'),
'ref-05': ('Icon · purple and silver', ['wardrobe','identity'], 'Purple long coat with pale scrolling trim, dark patterned waistcoat and winged purple chest shield.'),
'ref-06': ('Blue velvet-like coat reference', ['craft'], 'Deep blue coat with broad gold floral decoration at the front and cuffs. The supplied photograph is cropped.'),
'ref-07': ('Ace · presenting gesture', ['poses','wardrobe'], 'Burgundy coat, one hand extended toward viewer-right, the other resting in a pocket. Full silhouette on white.'),
'ref-08': ('Black and gold · early host', ['identity','poses','wardrobe'], 'Silver-haired Max in glasses; black three-piece suit, gold piping, MAX nameplate, N pin and open palm.'),
'ref-09': ('Assistant at the screen edge', ['atmosphere'], 'Supplied website composition showing Max beside the interface. A placement study, not the current site implementation.'),
'ref-10': ('The presenting host', ['identity','poses'], 'Navy and gold tailoring, silver hair and beard, dark spectacles and an extended hand. Elongated proportions.'),
'ref-11': ('Black Diamond · Gothic cutaway', ['wardrobe','identity'], 'Black coat with silver-toned border decoration, dark waistcoat and a near-black chest shield.'),
'ref-12': ('Cane and open palm', ['poses','wardrobe'], 'Burgundy Max retains his cane while opening the other hand toward the interface. A supported alternate pose.'),
'ref-13': ('Centurion Elite · badge context', ['badges'], 'Supplied screen extract of the Centurion Elite emblem and label.'),
'ref-14': ('Prestige, Reserve and Signature', ['badges','atmosphere'], 'Actual site screen showing three loyalty cards and their emblem treatments.'),
'ref-15': ('Craftsmanship benchmark', ['craft'], 'Black and burgundy formal coat, dense gold-coloured floral borders, decorative fastenings, chain, gloves and boots. Provisional final-reference target; not Max artwork.'),
'ref-16': ('Navy and gold · early host', ['identity','poses','wardrobe'], 'Gold-edged navy suit, MAX nameplate and open-hand welcome. An earlier character outfit.'),
'ref-17': ('The original angular study', ['identity','poses'], 'Swept silver hair, glasses, white beard, long legs, navy planes and orange lining. Early stylised character study.'),
'ref-18': ('Foundation badge references', ['badges'], 'Member, Bronze and Silver emblems in their original interface context.'),
'ref-19': ('The character and cane master', ['identity','wardrobe','poses'], 'The reference pose: right hand on cane at viewer-left, left hand in pocket, slight head tilt, long burgundy coat and NB above the pink shield.'),
'ref-20': ('Champion, Ace and Elite Pro', ['badges','atmosphere'], 'Supplied site screen showing the winged blue, pink and green shields.'),
'ref-21': ('Landing-page composition study', ['atmosphere'], 'Earlier character-led page concept, with Max and badge imagery against a dark setting.'),
'ref-22': ('First gem shield family', ['badges'], 'Ruby, Emerald and Amethyst screen references; the same shield language with different gem colours.'),
'ref-23': ('Bronze · early suit study', ['wardrobe','poses'], 'Brown contemporary tailoring and an open palm on white; separate from the later cane collection.'),
'ref-24': ('Centurion Elite · the ceremonial cape', ['wardrobe','identity'], 'Black coat and cape with gold-coloured scrolling decoration, gold lining and cravat, NB and a small chest shield.'),
'ref-25': ('The emblem design vocabulary', ['badges'], 'Supplied asset sheet with Bronze, Silver, Platinum and numbered gem/wing variations. Source asset names are distinct from the customer-facing tier names.'),
'ref-26': ('Centurion pair', ['badges'], 'Centurion and Centurion Elite shown together in the supplied loyalty interface.'),
'ref-27': ('Diamond · blue and silver', ['wardrobe','identity'], 'Deep blue long coat, pale floral border decoration, dark layered waistcoat and cyan chest emblem.'),
'ref-28': ('Amethyst, Diamond, Black Diamond', ['badges'], 'Three unwinged gem emblems shown in the original interface.'),
'ref-29': ('Black-and-gold cape reference', ['craft'], 'Formal black clothing with gold floral front borders and an extended cape. Mannequin inspiration, not Max artwork.'),
'ref-30': ('Burgundy Gothic coat reference', ['craft'], 'High-collared long burgundy coat, dark layers and cane in the supplied menswear image. Costume inspiration only.'),
'ref-31': ('Winged gem references', ['badges'], 'Ace, Elite Pro and Icon repeat the pink, green and purple cores with added metal wings.'),
'ref-32': ('Black Diamond · explaining', ['poses','wardrobe'], 'Black formal coat and a hand extended toward viewer-right. A supplied gesture study, not a moving character.'),
'ref-33': ('Ace · burgundy embroidery', ['wardrobe','identity'], 'Burgundy long coat with tone-on-tone scrolling borders, black patterned waistcoat, NB and pink winged shield.'),
'ref-34': ('Elite Pro · green and gold', ['wardrobe','identity'], 'Dark green long coat with gold-coloured borders, dark vest and small green winged chest shield.')
}
extra = [
 ('session-member','exec-9473c251-2dcc-46b3-a4d8-b051f2e1893f.png','Member · the foundation','Navy waistcoat, white shirt and pale cravat; no outer coat. Earlier artwork from this same conversation.'),
 ('session-silver','exec-91b66503-92fa-4911-a8f8-d0e26c09b338.png','Silver · cutaway tailoring','Charcoal cutaway coat, pale patterned waistcoat and cravat. Earlier artwork from this same conversation.'),
 ('session-amethyst','exec-7a10e56f-01f8-4f88-bf6e-5a3974321e8c.png','Amethyst · velvet-like plum','Long purple coat, dark layers and purple shield. Earlier artwork from this same conversation.')
]
for id_, name, title, desc in extra:
    src=WORK/'generated_images'/name
    inventory.append({'id':id_,'name':name,'size':list(Image.open(src).size),'session':True})
    descriptions[id_] = (title,['wardrobe','identity'],desc)
result=[]
for item in inventory:
    id_=item['id'];name=item['name'];src=WORK/('generated_images' if item.get('session') else 'upload')/name
    original=ASSETS/'originals'/(id_+src.suffix.lower())
    shutil.copy2(src,original)
    im=Image.open(src)
    if im.mode not in ['RGB','RGBA']: im=im.convert('RGBA')
    im.thumbnail((1600,1600))
    im.save(ASSETS/'images'/(id_+'.webp'),'WEBP',quality=92,method=6)
    im.thumbnail((560,680));im.save(ASSETS/'thumbs'/(id_+'.webp'),'WEBP',quality=84,method=6)
    title,roles,desc=descriptions[id_]
    aliases=[f['name'] for f in all_files if f.get('hash')==item.get('hash')] if item.get('hash') else [name]
    result.append({'id':id_,'title':title,'roles':roles,'description':desc,'width':item['size'][0],'height':item['size'][1],
                   'image':'assets/images/'+id_+'.webp','thumb':'assets/thumbs/'+id_+'.webp','original':'assets/originals/'+original.name,
                   'files':aliases,'origin':'Prior artwork in this conversation' if item.get('session') else 'Supplied reference'})
shutil.copy2(WORK/'upload/NetBet Max (3).pdf',ASSETS/'documents/netbet-max-brief.pdf')
(ROOT/'dist/inventory.js').write_text('window.MAX_REFERENCES = '+json.dumps(result,ensure_ascii=False,indent=2)+';\n')
(ROOT/'dist/assets/reference-manifest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(f'Prepared {len(result)} unique artworks, all supplied file aliases and the character brief.')
