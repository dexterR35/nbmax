"""Apply view refinements for the expanded ambassador catalogue."""
from pathlib import Path
p=Path(__file__).resolve().parent/'dist/app.js'
s=p.read_text()
start=s.index('  function collection()')
end=s.index('  function renderIntro()',start)
s=s[:start]+s[end:]
s=s.replace("['atmosphere','Interface']", "['atmosphere','Interface'],['proposals','New proposals']")
s=s.replace("r.kind==='badge'?'Official Figma emblem':'Original reference artwork'", "r.kind==='badge'?'Official Figma emblem':r.origin==='Generated proposal'?'Generated ambassador proposal':'Original reference artwork'")
start=s.index('<div class="craft-grid">',s.index('  function renderDetail('))
end=s.index('<p class="fine-note" style="margin-top:30px">',start)
s=s[:start]+'${detailCloseups(o)}'+s[end:]
function='''  function detailCloseups(o){
    const anchors=o.closeups||[[49,27],[o.annotations[2].x,o.annotations[2].y],[29,43]];
    const labels=[['Layer & texture','The collar, neckwear and patterned centre.'],['The chest signature','NB and the level shield, visibly part of the artwork.'],['The finishing detail','The cuff, its fastening and the character’s gesture.']];
    return `<div class="craft-grid">${anchors.map(([x,y],i)=>`<figure><div class="craft-closeup anchored-closeup" style="--crop-left:${50-x*4}%;--crop-top:${50-y*6}%">${img(o.ref)}<button type="button" class="circle-button" data-image="${o.ref}" data-focus="${x},${y}" aria-label="Inspect ${labels[i][0]}">↗</button></div><figcaption><strong>${labels[i][0]}</strong>${labels[i][1]}</figcaption></figure>`).join('')}</div>`;
  }
'''
s=s.replace('  function renderDetail(slug)',function+'  function renderDetail(slug)')
s=s.replace('A full-length ${l.name} outfit in the reference pose', 'A full-length ${l.name} outfit in an approved ambassador pose')
s=s.replace('a full-length ${l.name} outfit in the reference pose', 'a full-length ${l.name} outfit in an approved ambassador pose')
s=s.replace("const restoreSelector=focused?.id?", "const restoreSelector=focused?.dataset.campaign&&view==='landing'?`#campaign-tab-${arg}`:focused?.id?")
p.write_text(s)
