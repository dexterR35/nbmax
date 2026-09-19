# NetBet MAX — The Ambassador Collection

A responsive HTML/CSS/JavaScript character exhibition. No build step, runtime dependency, external font request or analytics service is required.

## Run

Open `dist/index.html` in a current browser. Hash navigation works directly from the extracted folder. For an optional local HTTP server:

```sh
python3 -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. To use another static host, publish all contents of `dist/` while preserving the asset folders.

## Included

- Introduction, character story, wardrobe explorer, detailed studies, poses, Character Build, a scrollable collection of ten landing-page concepts and a complete reference archive.
- The NetBet MAX midnight-navy, electric-blue, white and red palette.
- Fifteen generated family wardrobe designs covering all 28 official Figma ranks. Every rank has its exact exported shield attached below NB on Max’s left chest, viewer-right.
- An introduction with six hero images, the main film, and an annotated `build-front` promotion study for the navy/red/ivory outfit. Six selectable leader lines document the coat, waistcoat, bow tie and NB mark, cuffs and gesture, trousers, and Oxford shoes. Four large, paired-image outfit cards—including Emerald—link directly to their complete Character Build or wardrobe-detail pages.
- Ten gesture cards on the Character page link directly to dedicated `#story/{character}` pages containing the complete artwork, gesture, role, voice, progression, garments and associated badges. The Pose page retains all 19 current and earlier studies and a scrollable rail of 12 face studies.
- Fifteen concise wardrobe-family cards covering every rank. Each card links directly to its own `#detail/{rank}` route with the annotated outfit, garment-line data, complete ensemble record and only that wardrobe’s badge references. The full collection is not repeated on detail pages.
- Composite zoom and three close-ups per rank; the exact emblem stays attached while inspecting the clothing.
- Varied complete ensembles: cream, grey, blue, green, burgundy, checked and pinstriped trousers; coordinated Oxfords, loafers, boots and monk shoes. Member has no outer coat. Twelve new family poses guide without a cane; three foundation portraits retain it.
- All 66 supplied image-file references, representing 57 unique images with duplicate aliases preserved. Three earlier conversation artworks and 44 generated proposals bring the archive to 104 records. Supplied originals remain unchanged.
- Full-resolution PNG artwork, WebP display/thumbnail copies, 28 exact badge exports, the supplied PDF brief, an inventory and generation records.
- Keyboard focus, native image dialogs, a visitor-opened Max guide, desktop/mobile landing previews and working benefit explanations.
- Restrained interface fades and annotation reveals. Introduction, Character and wardrobe cards open dedicated detail routes directly; pose cards retain large detail modals. Mobile stacks modal artwork and information into one column.
- Two visitor-controlled character films: the main film on the Introduction page and a shorter Bronze presentation in the Character section.

## Wardrobes and ranks

| Wardrobe | Official ranks sharing it |
|---|---|
| Member | Member |
| Bronze | Bronze |
| Silver | Silver |
| Gold | Gold |
| Platinum | Platinum |
| Elite | Elite |
| Sapphire | Sapphire, Champion |
| Ruby | Ruby, Ace |
| Emerald | Emerald, Elite Pro |
| Amethyst | Amethyst, Icon |
| Diamond | Diamond, Legend |
| Black Diamond | Black Diamond, Prestige |
| Red Diamond | Reserve, Signature, Infinite |
| Private Black Diamond | Private, Select, Elite Black |
| Prismatic | Premier, Elite Premier, Centurion, Centurion Elite |

The six foundation shields are independent designs. Within a gemstone family, the complete outfit, pose and overlay coordinates remain fixed; selecting another rank changes the official shield and wings. No replacement tier names are introduced.

## Edit

Scripts load in this order:

1. `dist/inventory.js`: all reference and generated images, their purpose, descriptions, filename aliases and paths. `assets/reference-manifest.json` is the portable equivalent.
2. `dist/data.js`: original Figma levels, exact badges, families, source node IDs, original outfits, poses and motion slots.
3. `dist/ambassador-data.js` and `dist/ambassador-looks.js`: archive corrections, campaign copy and the three earlier generated proposals. These remain accessible as historical studies.
4. `dist/family-art.js`: 15 active wardrobe bases, visible garments, pose descriptions, contexts, emblem positions and garment anchors. `assets/family-wardrobes.json` is the portable equivalent.
5. `dist/family-system.js`: maps those bases to all 28 levels, creates annotations and explains what remains unchanged within a family.
6. `dist/intro-models.js`: four selected introduction models and their eight paired image references. `assets/intro-selection.json` records the original uploaded filenames. `dist/collection-views.js`: shared character/emblem rendering, annotation geometry, crops, carousels and wardrobe shelf.
7. `dist/studio-data.js`, `dist/studio-assets.js` and `dist/studio-views.js`: 12 expression portraits, four full-body studies and ten game-world scenes, with observed garments, image coordinates and view templates. `assets/studio-manifest.json` is the portable asset metadata.
8. `dist/presentation.js` and `dist/app.js`: page views, navigation, large card-detail modals, zoom, archive filtering, guide and offer dialogs.

`styles.css` is the base layout, `brand.css` defines the NetBet direction and `collection.css` handles the family composites, card grids, detail modals and restrained motion. `studio.css` adds the Character Build layouts; `landing.css` refines the typography, live campaign copy, ten-example navigation and responsive scene compositions. `intro-models.css` presents the selected introduction artwork with complete silhouettes. `index.html` is the semantic shell.

Coordinates are percentages of the complete image measured from its top-left corner. `emblem.width` includes the exact PNG’s transparent padding. Keep the same scale within a family: the core and wing shapes are intentional parts of the official exports. Annotation `side` and `row` position desktop labels; mobile keeps the same image-relative garment coordinates.

The viewer combines the high-resolution base with the exact shield. Its **Open artwork base** link opens the uncomposited source PNG. The archive displays these generated bases without a rank overlay, with captions explaining their purpose.

The Landing pages section displays seven supplied compositions first, followed by ten developed concepts, in one vertical, scrollable collection with a sticky jump selector. Each supplied composition has distinct campaign copy, a wardrobe CTA and the badge family matched to its costume direction. The supplied artwork routes are `#landing/supplied-1` through `#landing/supplied-7`; the existing concept routes remain available. Character Build begins at `#build/face-front`; all 16 studies have individual routes. Landing-page buttons lead to the wardrobe or a benefit explanation with the official source.

Nine additional supplied cane-pose portraits are paired side by side with their matching gesture artwork in the Wardrobe and Character card collections. They are also available as individual, zoomable records in the Archive under Wardrobe, Pose & gesture, and New proposals.

Videos live in `dist/assets/video/`. The Introduction film is assigned in `MAX_DATA.introVideo`; Character films are assigned in `MAX_DATA.motion`. Each uses visitor-controlled playback with a still poster; optional WebVTT captions can be set with `captions`. No video autoplays.

## Sources and production questions

Figma: https://www.figma.com/design/7XyxLDzYaGxD4i81uIeXIZ/Loyalty-Plan?node-id=4340-11687

Identity and visible costume descriptions come from the artwork. Role and personality come from the supplied PDF. Dialogue, styling associations and assistant interactions are labelled creative interpretations. No exact fibre, stitch, internal construction or historical date is asserted.

- All 28 wardrobe presentations are covered. The 15 active family bases are generated proposals, not newly supplied canonical artwork. Original identity, long-legged proportions and visible garments informed generation. All 15 outputs were visually inspected before integration.
- Original Icon, Diamond and Elite Pro studies remain in the archive with corrected descriptions. Historical clothing may differ from the new shared-family proposal; those sources are not recoloured.
- Two character videos are supplied: the main film is integrated into the Introduction page, while the shorter film remains in the Character motion section.
- Small NB and N marks are rendered into the generated costumes and need final brand approval. Shields use the exact Figma exports. Member and Sapphire retain faint dark cloth outlines from an earlier miniature shield; the official layer is positioned over that area. Production artwork should reconcile those pixels if a badge-free cutout is required.
- Images have opaque navy backgrounds with slight tonal variation, not transparency.
- Figma uses **Elite Premier**, while another supplied interface uses **Premier Elite**. The exhibition preserves Figma’s label and omits conflicting XP values.
- The new face studies cover front, true profile and three-quarter views, including talking, excitement, humour, sadness, anger, danger and a theatrical villain smirk. These are acting proposals; still mouth shapes are not speech animation. The four body studies include front, profile, a Gothic stance and a rear coat view. The rear study omits the gloves visible in the Gothic front study; these are styling studies, not an approved production turnaround.
- All ten game-world scenes keep Max foremost. Original scenery is illustrative. The new scene clothing is a styling extension, not a pixel-identical rendering of the fixed family base. Exact official shield overlays stay on the visible left chest; profile and back views do not relocate an occluded badge. Royal retains a small gold line and Prismatic a dark rectangular trim beneath NB in their generated bases. These details are recorded for final artwork refinement.
- The latest cream-trouser photograph informs the full Regency direction. Black/burgundy clothing references inform embroidery and accessories. Photograph models never define Max’s identity.
- The supplied PDF asks for review of appearance changes tied to loyalty progression. This remains a creative exhibition, not a live loyalty service.
- Landing benefit categories and the Reserve £20 casino bonus, 10× wagering and £100 maximum win were checked on https://casino.netbet.co.uk/netbet-max on 19 September 2026. Examples are illustrative, not personalised or claimable; current official terms take precedence.

## Preparation records

Prepared assets are included; these scripts are not needed to run the site. `prepare_assets.py`, `update_references.py` and `integrate_ambassador.py` record earlier preparation. `integrate_families.py` packages the 15 inspected outputs and requires the sibling `family-assets` folder and Pillow. `integrate_studio.py` packages the 18 latest supplied references and 21 generated studio assets; it requires the sibling `upload` and `studio-assets` folders and Pillow. Prepared assets are already included. Do not rerun old ingest scripts over the expanded catalogue.

The new ensemble backgrounds use left-side live copy and a separate right-side game cast. Grid layout lets the message grow without covering Max. Mobile shows the complete height of the right-side figure group with the text below; the reduced-motion preference remains respected. No game title availability is claimed.

`integrate_ensembles.py` packages the five new assets and their measured shield coordinates from the sibling `ensemble-assets` folder; completed derivatives and original images are already included.

Exact family prompts and observations are in `dist/assets/generation/`. Earlier proposal prompts are in `assets/ambassador-generation-prompts.json`. Image content edits used the image-generation tool. Display and thumbnail files are only size/encoding derivatives; no Python compositing or retouching was used.

## Verification

Run `node verify.mjs` with Node 22+. The final run checks all rendered routes, all 28 rank presentations, 15 shared family designs, 168 bounded annotation anchors, all local assets, 19 wardrobe poses, 16 character studies and ten landing concepts. It checks family continuity, coordinates in full views and crops, collection card links, reduced motion, composite zoom, search, offer actions and the guide.

The four selected WebP attachments were verified byte-for-byte against the existing display images; those exact images are reused without retouching or new generation. The introduction uses the selected artwork directly. Official rank assignments remain in the wardrobe explorer.

These are source/render-contract checks. This environment does not provide browser preview for a buildless static Sites project, so actual browser layout and assistive-technology behavior have not been manually verified here. Responsive rules cover desktop, tablet and mobile, including 1100, 800 and 640-pixel collection breakpoints.

Supplied artwork is retained for this character concept; no rights or ownership in third-party clothing references are implied.
