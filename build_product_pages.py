#!/usr/bin/env python3
"""Generate all 7 IronCub product pages."""

import os

MACHINES = [
    {
        "id": "vth360",
        "name": "VTH 360",
        "subtitle": "Mini Skid Steer Loader",
        "price": 5824,
        "priceDisplay": "€5.824",
        "poa": False,
        "img": "vth-360.jpg",
        "badge": "Compact",
        "badgeClass": "",
        "fuel": "elektrisch",
        "fuelLabel": "Elektrisch",
        "powerKw": 5,
        "powerHp": 6.8,
        "speedKmh": 4.2,
        "pushPullKg": 350,
        "breakoutKg": 500,
        "weightKg": 620,
        "ratedLoadKg": 200,
        "maxLoadKg": 375,
        "bucketM3": 0.08,
        "widthMm": 940,
        "engine": "Elektromotor 48V",
        "steering": "Schrank",
        "branches": ["Hoveniers", "Manege", "Agrarisch"],
        "specs": ["Elektrisch", "Joystick", "ROPS/TOPS", "CE-gecertificeerd"],
        "desc": "Meest compacte loader. Zero-emission, ideaal voor binnenshuis, stallen en krappe ruimtes. De VTH 360 combineert lage emissies met een wendbare bouw — perfect voor gebruik in overdekte ruimtes, hoveniersbedrijven en maneges.",
    },
    {
        "id": "vth480w",
        "name": "VTH 480W",
        "subtitle": "Skid Steer Loader (wielen)",
        "price": 7063,
        "priceDisplay": "€7.063",
        "poa": False,
        "img": "vth-480w.jpg",
        "badge": "Populair",
        "badgeClass": "badge-pop",
        "fuel": "elektrisch",
        "fuelLabel": "Elektrisch",
        "powerKw": 5,
        "powerHp": 6.8,
        "speedKmh": 4.5,
        "pushPullKg": 400,
        "breakoutKg": 550,
        "weightKg": 680,
        "ratedLoadKg": 200,
        "maxLoadKg": 480,
        "bucketM3": 0.15,
        "widthMm": 1050,
        "engine": "Elektromotor 48V",
        "steering": "Schrank",
        "branches": ["Hoveniers", "Bouw", "Agrarisch"],
        "specs": ["Elektrisch", "Wielen", "ROPS/TOPS", "CE-gecertificeerd"],
        "desc": "Onze allrounder op wielen. Krachtig, veelzijdig en geschikt voor uiteenlopende werkzaamheden. Met 480 kg maximaal laadvermogen en een grotere bak van 0.15 m³ is dit de meest verkochte machine in ons assortiment.",
    },
    {
        "id": "vth480wr",
        "name": "VTH 480W",
        "subtitle": "Skid Steer Loader (rupsbanden)",
        "price": 7063,
        "priceDisplay": "€7.063",
        "poa": False,
        "img": "vth-480w-crawler.jpg",
        "badge": "Rupsbanden",
        "badgeClass": "",
        "fuel": "elektrisch",
        "fuelLabel": "Elektrisch",
        "powerKw": 5,
        "powerHp": 6.8,
        "speedKmh": 4.5,
        "pushPullKg": 450,
        "breakoutKg": 600,
        "weightKg": 750,
        "ratedLoadKg": 200,
        "maxLoadKg": 480,
        "bucketM3": 0.15,
        "widthMm": 1050,
        "engine": "Elektromotor 48V",
        "steering": "Schrank",
        "branches": ["Hoveniers", "Bouw", "Agrarisch", "Manege"],
        "specs": ["Elektrisch", "Rupsbanden", "ROPS/TOPS", "CE-gecertificeerd"],
        "desc": "Maximale tractie op elk terrein. Perfect voor zachte of ongelijke ondergronden. De rupsbanden verdelen het gewicht optimaal, waardoor u ook op zand, modder of glooiend terrein productief kunt werken.",
    },
    {
        "id": "vth480wd",
        "name": "VTH 480W KOOP",
        "subtitle": "Diesel (wielen)",
        "price": None,
        "priceDisplay": "Prijs op aanvraag",
        "poa": True,
        "img": "product-white.jpg",
        "badge": "Diesel",
        "badgeClass": "badge-diesel",
        "fuel": "diesel",
        "fuelLabel": "Diesel",
        "powerKw": 8.6,
        "powerHp": 11.5,
        "speedKmh": 5,
        "pushPullKg": 500,
        "breakoutKg": 650,
        "weightKg": 780,
        "ratedLoadKg": 238,
        "maxLoadKg": 480,
        "bucketM3": 0.15,
        "widthMm": 1050,
        "engine": "Diesel (China)",
        "steering": "Schrank",
        "branches": ["Bouw", "Agrarisch", "Sloop", "Wegenbouw"],
        "specs": ["Diesel", "Wielen", "ROPS/TOPS", "CE-gecertificeerd"],
        "desc": "Diesel variant voor langdurig en intensief gebruik zonder stroomaansluiting. Ideaal voor locaties zonder elektriciteitsaansluiting of bij langdurige shifts waarbij opladen niet praktisch is.",
    },
    {
        "id": "vth480k",
        "name": "VTH 480 Kubota",
        "subtitle": "Diesel (rupsbanden)",
        "price": None,
        "priceDisplay": "Prijs op aanvraag",
        "poa": True,
        "img": "rippa-compact-track.webp",
        "badge": "Kubota",
        "badgeClass": "badge-diesel",
        "fuel": "diesel",
        "fuelLabel": "Diesel",
        "powerKw": 18.2,
        "powerHp": 24.4,
        "speedKmh": 8,
        "pushPullKg": 670,
        "breakoutKg": 750,
        "weightKg": 1230,
        "ratedLoadKg": 300,
        "maxLoadKg": 670,
        "bucketM3": 0.16,
        "widthMm": 1000,
        "engine": "Kubota D1105",
        "steering": "Schrank",
        "branches": ["Bouw", "Agrarisch", "Sloop", "Wegenbouw", "Hoveniers"],
        "specs": ["Kubota D1105", "Rupsbanden", "ROPS/TOPS", "CE-gecertificeerd"],
        "desc": "Premium Kubota motor op rupsbanden. 18.2 kW, professionele hydrauliek. De Kubota D1105 staat bekend om zijn betrouwbaarheid en lange levensduur — ideaal voor de meest veeleisende professionele toepassingen.",
    },
    {
        "id": "vth140",
        "name": "VTH 140",
        "subtitle": "Loader (Loncin benzine)",
        "price": None,
        "priceDisplay": "Prijs op aanvraag",
        "poa": True,
        "img": "product-white.jpg",
        "badge": "Benzine",
        "badgeClass": "badge-benzine",
        "fuel": "benzine",
        "fuelLabel": "Benzine",
        "powerKw": 9.9,
        "powerHp": 13.5,
        "speedKmh": 4.2,
        "pushPullKg": 350,
        "breakoutKg": 500,
        "weightKg": 755,
        "ratedLoadKg": 238,
        "maxLoadKg": 375,
        "bucketM3": 0.08,
        "widthMm": 940,
        "engine": "Loncin benzine",
        "steering": "Schrank",
        "branches": ["Hoveniers", "Agrarisch", "Manege"],
        "specs": ["Loncin benzine", "Compact", "ROPS/TOPS", "CE-gecertificeerd"],
        "desc": "Compact instapmodel met Loncin benzinemotor. Wendbaar en eenvoudig in gebruik. De VTH 140 is een uitstekende keuze voor kleinschalig gebruik waar eenvoud en lage aanschafkosten prioriteit hebben.",
    },
    {
        "id": "vth200",
        "name": "VTH 200",
        "subtitle": "Loader (Kubota diesel)",
        "price": None,
        "priceDisplay": "Prijs op aanvraag",
        "poa": True,
        "img": "product-white.jpg",
        "badge": "Kubota",
        "badgeClass": "badge-diesel",
        "fuel": "diesel",
        "fuelLabel": "Diesel",
        "powerKw": 18.2,
        "powerHp": 24.4,
        "speedKmh": 8,
        "pushPullKg": 670,
        "breakoutKg": 750,
        "weightKg": 1386,
        "ratedLoadKg": 300,
        "maxLoadKg": 670,
        "bucketM3": 0.16,
        "widthMm": 1000,
        "engine": "Kubota D1105",
        "steering": "Schrank",
        "branches": ["Bouw", "Agrarisch", "Sloop", "Wegenbouw"],
        "specs": ["Kubota D1105", "Zwaar", "ROPS/TOPS", "CE-gecertificeerd"],
        "desc": "Meer vermogen voor zwaardere taken. Ideaal voor bouw en agrarisch. Met 18.2 kW vermogen en 670 kg maximaal laadvermogen is de VTH 200 de krachtigste machine in ons assortiment.",
    },
]

BRANCH_ICONS = {
    "Hoveniers": """<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22V12M12 12C12 7 7 2 2 2c0 5 5 10 10 10zM12 12C12 7 17 2 22 2c0 5-5 10-10 10z"/></svg>""",
    "Bouw": """<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>""",
    "Agrarisch": """<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10M2 12h20"/></svg>""",
    "Sloop": """<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>""",
    "Wegenbouw": """<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 17l3-9 3 4 3-7 3 4 3-7 2 2"/><path d="M3 21h18"/></svg>""",
    "Manege": """<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"/></svg>""",
}

ATT_NAMES = [
    "Slimme graafarm", "Graafarm", "Grondboor", "Ripper", "Leveler",
    "Bulldozer", "Grasmaaier", "Breekhamer", "Veegborstel", "Pallet forklift",
]


def make_price_html(m):
    if m["poa"]:
        return f'<div class="product-price-poa">Prijs op aanvraag</div>'
    return f'<div class="product-price">{m["priceDisplay"]} <small>ex BTW</small></div>'


def make_badges(m):
    badges = []
    for s in m["specs"]:
        cls = "product-badge-gold" if s in ["Elektrisch", "ROPS/TOPS"] else "product-badge"
        badges.append(f'<span class="{cls} product-badge">{s}</span>')
    return "\n".join(badges)


def make_branches(m):
    items = []
    for b in m["branches"]:
        icon = BRANCH_ICONS.get(b, "")
        items.append(f'<span class="branch-badge">{icon}{b}</span>')
    return "\n".join(items)


def make_related(machines, current_id):
    others = [m for m in machines if m["id"] != current_id]
    # pick 3: prefer popular ones, else first 3
    selected = others[:3]
    cards = []
    for m in selected:
        price_html = (
            f'<span class="related-card-price">{m["priceDisplay"]} <small>ex BTW</small></span>'
            if not m["poa"]
            else f'<span class="related-card-price" style="color:var(--gray-600);font-size:.95rem">Prijs op aanvraag</span>'
        )
        badge_cls = m["badgeClass"] if m["badgeClass"] else ""
        cards.append(f"""<a href="{m['id']}.html" class="related-card">
  <div class="related-card-img">
    <img src="../assets/{m['img']}" alt="{m['name']}" loading="lazy">
    <span class="related-card-badge {badge_cls}">{m['badge']}</span>
  </div>
  <div class="related-card-body">
    <h3>{m['name']}</h3>
    <p>{m['subtitle']}</p>
    {price_html}
    <span class="related-card-link">Bekijk details →</span>
  </div>
</a>""")
    return "\n".join(cards)


def build_page(m, all_machines):
    fuel_class = f"fuel-{m['fuel']}"
    price_html = make_price_html(m)
    badges_html = make_badges(m)
    branches_html = make_branches(m)
    related_html = make_related(all_machines, m["id"])

    cta_title = f"Meer weten over de {m['name']}?"

    # Thumb images — main + 3 placeholder showroom thumbs
    img_src = f"../assets/{m['img']}"
    thumbs_html = f"""<div class="product-thumbs">
  <div class="product-thumb active" onclick="setMainImg(this, '{img_src}')">
    <img src="{img_src}" alt="{m['name']}">
  </div>
  <div class="product-thumb" onclick="setMainImg(this, '../assets/showroom-1.jpg')">
    <img src="../assets/showroom-1.jpg" alt="Showroom" loading="lazy">
  </div>
  <div class="product-thumb" onclick="setMainImg(this, '../assets/showroom-2.jpg')">
    <img src="../assets/showroom-2.jpg" alt="Showroom" loading="lazy">
  </div>
  <div class="product-thumb" onclick="setMainImg(this, '../assets/showroom-3.jpg')">
    <img src="../assets/showroom-3.jpg" alt="Showroom" loading="lazy">
  </div>
</div>"""

    # Fuel badge styling for spec table row
    diesel_or_not = m['fuel'] != 'elektrisch'

    html = f"""<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{m['name']} — {m['subtitle']} | The IronCub Company</title>
  <meta name="description" content="Bekijk alle specs en details van de {m['name']} {m['subtitle']}. {m['desc'][:100]}...">
  <base href="../">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/jpeg" href="assets/logo-icon.jpg">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<div id="announce-bar"></div>
<div id="site-header"></div>

<!-- 1. PRODUCT HERO -->
<section class="product-hero">
  <div class="product-hero-bg">
    <img src="assets/{m['img']}" alt="{m['name']}">
  </div>
  <div class="container product-hero-content">
    <nav class="breadcrumb" style="margin-bottom:16px">
      <a href="index.html">Home</a>
      <span class="breadcrumb-sep">›</span>
      <a href="verkoop.html">Verkoop</a>
      <span class="breadcrumb-sep">›</span>
      <span>{m['name']}</span>
    </nav>
    <span class="product-hero-badge {fuel_class}">{m['fuelLabel']}</span>
    <h1>{m['name']}</h1>
    <p class="product-hero-subtitle">{m['subtitle']}</p>
  </div>
</section>

<!-- 2. PRODUCT SECTION — two columns -->
<section class="product-section">
  <div class="container">
    <div class="product-layout">

      <!-- LEFT: Gallery -->
      <div class="product-gallery">
        <div class="product-gallery-main">
          <img src="assets/{m['img']}" alt="{m['name']}" id="mainProductImg">
        </div>
        {thumbs_html}
      </div>

      <!-- RIGHT: Info -->
      <div class="product-info">
        <h2 class="product-info-name">{m['name']}</h2>
        <p class="product-info-type">{m['subtitle']}</p>

        <div class="product-price-block">
          {price_html}
        </div>

        <p class="product-desc">{m['desc']}</p>

        <div class="product-engine">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M12 12v.01"/></svg>
          <strong>{m['engine']}</strong>&nbsp;—&nbsp;{m['powerKw']} kW / {m['powerHp']} hp
        </div>

        <div class="product-quick-specs">
          <div class="quick-spec"><span class="quick-spec-label">Vermogen</span><span class="quick-spec-val">{m['powerKw']} kW / {m['powerHp']} hp</span></div>
          <div class="quick-spec"><span class="quick-spec-label">Max. snelheid</span><span class="quick-spec-val">{m['speedKmh']} km/h</span></div>
          <div class="quick-spec"><span class="quick-spec-label">Gewicht</span><span class="quick-spec-val">{m['weightKg']} kg</span></div>
          <div class="quick-spec"><span class="quick-spec-label">Max. laadvermogen</span><span class="quick-spec-val">{m['maxLoadKg']} kg</span></div>
          <div class="quick-spec"><span class="quick-spec-label">Breedte</span><span class="quick-spec-val">{m['widthMm']} mm</span></div>
          <div class="quick-spec"><span class="quick-spec-label">Bakinhoud</span><span class="quick-spec-val">{m['bucketM3']} m³</span></div>
        </div>

        <div class="product-badge-row">
          {badges_html}
        </div>

        <!-- 3. CTA BLOCK -->
        <div class="product-cta-block">
          <p class="product-cta-label">Interesse?</p>
          <h3 class="product-cta-title">{cta_title}</h3>
          <div class="product-cta-btns">
            <a href="contact.html" class="btn btn-cta">Offerte aanvragen</a>
            <a href="demodagen.html" class="btn btn-outline-light">Demo aanvragen</a>
          </div>
          <div class="product-cta-links">
            <a href="lease.html" class="product-cta-finance">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Financieringsmogelijkheden bekijken
            </a>
            <span class="product-cta-phone">Bel ons: <strong>+31 (0)187 — xxx xxx</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 4. VOLLEDIGE SPECIFICATIETABEL -->
<section class="product-specs-section">
  <div class="container">
    <div class="section-head" style="text-align:left;margin-bottom:0">
      <h2 style="font-family:var(--font-head);font-size:2rem;font-weight:900;letter-spacing:.02em;color:var(--dark);margin-bottom:8px">Technische specificaties</h2>
      <p style="color:var(--gray-600)">Alle specificaties van de {m['name']}</p>
    </div>
    <table class="product-specs-table">
      <thead>
        <tr><th>Specificatie</th><th>Waarde</th></tr>
      </thead>
      <tbody>
        <tr><td>Motor</td><td>{m['engine']}</td></tr>
        <tr class="spec-highlight"><td>Motorvermogen</td><td>{m['powerKw']} kW / {m['powerHp']} hp</td></tr>
        <tr><td>Brandstoftype</td><td>{m['fuelLabel']}</td></tr>
        <tr><td>Gewicht (machine)</td><td>{m['weightKg']} kg</td></tr>
        <tr class="spec-highlight"><td>Max. snelheid</td><td>{m['speedKmh']} km/h</td></tr>
        <tr><td>Rated load</td><td>{m['ratedLoadKg']} kg</td></tr>
        <tr class="spec-highlight"><td>Max. laadvermogen</td><td>{m['maxLoadKg']} kg</td></tr>
        <tr><td>Bakinhoud</td><td>{m['bucketM3']} m³</td></tr>
        <tr><td>Breedte (machine)</td><td>{m['widthMm']} mm</td></tr>
        <tr><td>Duw- / trekkracht</td><td>{m['pushPullKg']} kg</td></tr>
        <tr><td>Opbreekkracht</td><td>{m['breakoutKg']} kg</td></tr>
        <tr><td>Besturing</td><td>{m['steering']}besturing (joystick)</td></tr>
        <tr><td>Veiligheid</td><td>ROPS/TOPS gecertificeerd</td></tr>
        <tr><td>Certificering</td><td>CE-gecertificeerd</td></tr>
        <tr><td>Geschikt voor</td><td>{', '.join(m['branches'])}</td></tr>
      </tbody>
    </table>
  </div>
</section>

<!-- 5. GESCHIKTE BRANCHES -->
<section class="product-branches-section">
  <div class="container">
    <h2 style="font-family:var(--font-head);font-size:2rem;font-weight:900;color:var(--dark);margin-bottom:8px">Geschikt voor</h2>
    <p style="color:var(--gray-600);margin-bottom:0">De {m['name']} is ideaal ingezet in de volgende branches</p>
    <div class="product-branches">
      {branches_html}
    </div>
  </div>
</section>

<!-- 6. AANBOUWDELEN -->
<section class="product-att-section">
  <div class="container product-att-inner">
    <div class="product-att-text">
      <h2>Compatible met 20+ aanbouwdelen</h2>
      <p>Vergroot de veelzijdigheid van uw {m['name']} met ons uitgebreide aanbouwdelen assortiment.</p>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:16px">
      <div class="product-att-icons">
        <span class="att-icon-pill">Graafarm</span>
        <span class="att-icon-pill">Grondboor</span>
        <span class="att-icon-pill">Veegborstel</span>
        <span class="att-icon-pill">Pallet vork</span>
        <span class="att-icon-pill">Breekhamer</span>
      </div>
      <a href="verkoop.html#aanbouwdelen" class="btn btn-cta">Bekijk alle aanbouwdelen</a>
    </div>
  </div>
</section>

<!-- 7. GERELATEERDE MACHINES -->
<section class="product-related-section">
  <div class="container">
    <h2 style="font-family:var(--font-head);font-size:2rem;font-weight:900;color:var(--dark);margin-bottom:8px">Vergelijk met andere machines</h2>
    <p style="color:var(--gray-600);margin-bottom:0">Bekijk ook onze andere modellen</p>
    <div class="product-related">
      {related_html}
    </div>
  </div>
</section>

<div id="site-footer"></div>

<script src="components.js"></script>
<script src="products.js"></script>
<script>
// Gallery thumbnail switcher
function setMainImg(thumb, src) {{
  document.getElementById('mainProductImg').src = src;
  document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}}
</script>
</body>
</html>"""
    return html


def main():
    out_dir = "/home/user/workspace/ironcub-website/machines"
    os.makedirs(out_dir, exist_ok=True)

    for m in MACHINES:
        html = build_page(m, MACHINES)
        filename = os.path.join(out_dir, f"{m['id']}.html")
        with open(filename, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  ✓ Created {filename}")

    print(f"\nAll {len(MACHINES)} product pages created.")


if __name__ == "__main__":
    main()
