/* IronCub V3 — Product Database with Real Rippa Specs */
const MACHINES = [
  {
    id: "vth360",
    detailUrl: "machines/vth360.html",
    name: "VTH 360",
    subtitle: "Mini Skid Steer Loader",
    price: 5824, originalPrice: 7165,
    priceDisplay: "€5.824",
    poa: false,
    img: "assets/vth-360.jpg",
    badge: "Compact",
    badgeClass: "",
    fuel: "elektrisch",
    steering: "schrank",
    powerKw: 5,
    powerHp: 6.8,
    speedKmh: 4.2,
    pushPullKg: 350,
    breakoutKg: 500,
    weightKg: 620,
    ratedLoadKg: 200,
    maxLoadKg: 375,
    bucketM3: 0.08,
    widthMm: 940,
    engine: "Elektromotor 48V",
    branches: ["hoveniers", "manege", "agrarisch"],
    specs: ["Elektrisch", "Joystick", "ROPS/TOPS"],
    desc: "Meest compacte loader. Zero-emission, ideaal voor binnenshuis, stallen en krappe ruimtes."
  },
  {
    id: "vth480w",
    detailUrl: "machines/vth480w.html",
    name: "VTH 480W",
    subtitle: "Skid Steer Loader (wielen)",
    price: 7063, originalPrice: 8615,
    priceDisplay: "€7.063",
    poa: false,
    img: "assets/vth-480w.jpg",
    badge: "Populair",
    badgeClass: "badge-pop",
    fuel: "elektrisch",
    steering: "schrank",
    powerKw: 5,
    powerHp: 6.8,
    speedKmh: 4.5,
    pushPullKg: 400,
    breakoutKg: 550,
    weightKg: 680,
    ratedLoadKg: 200,
    maxLoadKg: 480,
    bucketM3: 0.15,
    widthMm: 1050,
    engine: "Elektromotor 48V",
    branches: ["hoveniers", "bouw", "agrarisch"],
    specs: ["Elektrisch", "Wielen", "ROPS/TOPS"],
    desc: "Onze allrounder op wielen. Krachtig, veelzijdig en geschikt voor uiteenlopende werkzaamheden."
  },
  {
    id: "vth480wr",
    detailUrl: "machines/vth480wr.html",
    name: "VTH 480W",
    subtitle: "Skid Steer Loader (rupsbanden)",
    price: 7063, originalPrice: 8900,
    priceDisplay: "€7.063",
    poa: false,
    img: "assets/vth-480w-crawler.jpg",
    badge: "Rupsbanden",
    badgeClass: "",
    fuel: "elektrisch",
    steering: "schrank",
    powerKw: 5,
    powerHp: 6.8,
    speedKmh: 4.5,
    pushPullKg: 450,
    breakoutKg: 600,
    weightKg: 750,
    ratedLoadKg: 200,
    maxLoadKg: 480,
    bucketM3: 0.15,
    widthMm: 1050,
    engine: "Elektromotor 48V",
    branches: ["hoveniers", "bouw", "agrarisch", "manege"],
    specs: ["Elektrisch", "Rupsbanden", "ROPS/TOPS"],
    desc: "Maximale tractie op elk terrein. Perfect voor zachte of ongelijke ondergronden."
  },
  {
    id: "vth480wd",
    detailUrl: "machines/vth480wd.html",
    name: "VTH 480W KOOP",
    subtitle: "Diesel (wielen)",
    price: 8923, originalPrice: 11155,
    priceDisplay: "\u20ac8.923",
    poa: false,
    img: "assets/vth-480w.jpg",
    badge: "Diesel",
    badgeClass: "badge-diesel",
    fuel: "diesel",
    steering: "schrank",
    powerKw: 8.6,
    powerHp: 11.5,
    speedKmh: 5,
    pushPullKg: 500,
    breakoutKg: 650,
    weightKg: 780,
    ratedLoadKg: 238,
    maxLoadKg: 480,
    bucketM3: 0.15,
    widthMm: 1050,
    engine: "Diesel",
    branches: ["bouw", "agrarisch", "sloop", "wegenbouw"],
    specs: ["Diesel", "Wielen", "ROPS/TOPS"],
    desc: "Diesel variant voor langdurig en intensief gebruik zonder stroomaansluiting."
  },
  {
    id: "vth480k",
    detailUrl: "machines/vth480k.html",
    name: "VTH 480 Kubota",
    subtitle: "Diesel (rupsbanden)",
    price: 12595, originalPrice: 15745,
    priceDisplay: "\u20ac12.595",
    poa: false,
    img: "assets/vth-480w-crawler.jpg",
    badge: "Kubota",
    badgeClass: "badge-diesel",
    fuel: "diesel",
    steering: "schrank",
    powerKw: 18.2,
    powerHp: 24.4,
    speedKmh: 8,
    pushPullKg: 670,
    breakoutKg: 750,
    weightKg: 1230,
    ratedLoadKg: 300,
    maxLoadKg: 670,
    bucketM3: 0.16,
    widthMm: 1000,
    engine: "Kubota D1105",
    branches: ["bouw", "agrarisch", "sloop", "wegenbouw", "hoveniers"],
    specs: ["Kubota D1105", "Rupsbanden", "ROPS/TOPS"],
    desc: "Premium Kubota motor op rupsbanden. 18.2 kW, professionele hydrauliek."
  },
  {
    id: "vth140",
    detailUrl: "machines/vth140.html",
    name: "VTH 140",
    subtitle: "LOADER (Loncin benzine)",
    price: 16971, originalPrice: 21045,
    priceDisplay: "\u20ac16.971",
    poa: false,
    img: "assets/vth-140.jpg",
    badge: "Benzine",
    badgeClass: "badge-benzine",
    fuel: "benzine",
    steering: "knik",
    powerKw: 20,
    powerHp: 27,
    speedKmh: 20,
    pushPullKg: 500,
    breakoutKg: 700,
    weightKg: 700,
    ratedLoadKg: 350,
    maxLoadKg: 500,
    bucketM3: 0.15,
    widthMm: 1165,
    engine: "Loncin LC2V80FD 764cc",
    branches: ["hoveniers", "agrarisch", "manege", "bouw"],
    specs: ["Loncin LC2V80FD", "Knikbesturing", "ROPS/TOPS"],
    desc: "Compacte kniklader met 20 kW Loncin tweecilinder. 45° knikbesturing, 20 km/h, hefhoogte 1,4 meter."
  },
  {
    id: "vth200",
    detailUrl: "machines/vth200.html",
    name: "VTH 200",
    subtitle: "LOADER (Kubota diesel)",
    price: 28606, originalPrice: 35185,
    priceDisplay: "\u20ac28.606",
    poa: false,
    img: "assets/vth-200.jpg",
    badge: "Diesel",
    badgeClass: "badge-diesel",
    fuel: "diesel",
    steering: "knik",
    powerKw: 36.5,
    powerHp: 49,
    speedKmh: 25,
    pushPullKg: 1500,
    breakoutKg: 1800,
    weightKg: 2600,
    ratedLoadKg: 1200,
    maxLoadKg: 1500,
    bucketM3: 0.4,
    widthMm: 1198,
    engine: "Yanmar/Kubota 4-cil diesel",
    branches: ["bouw", "agrarisch", "sloop", "wegenbouw", "hoveniers"],
    specs: ["Yanmar/Kubota diesel", "Knikbesturing", "Cabine", "ROPS/TOPS"],
    desc: "Zware kniklader met Yanmar/Kubota 4-cilinder diesel, cabine, 45° knikbesturing. Hefhoogte 2,6 meter, 25 km/h. Laadvermogen 1.200 kg."
  },
  {
    id: "htv1000",
    detailUrl: "machines/htv1000.html",
    name: "HTV 1000",
    subtitle: "Skid Steer Loader (Kubota)",
    price: 14185, originalPrice: 18440,
    priceDisplay: "\u20ac14.185",
    poa: false,
    img: "assets/htv1000-product.jpg",
    badge: "NIEUW",
    badgeClass: "badge-pop",
    fuel: "diesel",
    steering: "schrank",
    powerKw: 17.1,
    powerHp: 23,
    speedKmh: 4.5,
    pushPullKg: 780,
    breakoutKg: 900,
    weightKg: 1538,
    ratedLoadKg: 400,
    maxLoadKg: 780,
    bucketM3: 0.2,
    widthMm: 980,
    engine: "Kubota D1105-E4",
    branches: ["bouw", "agrarisch", "sloop", "wegenbouw", "hoveniers"],
    specs: ["Kubota D1105-E4", "Rupsbanden", "Euro 5", "CE"],
    desc: "Onze krachtigste loader. Kubota D1105 motor, 1538 kg, verticale hefstructuur. De rode krachtpatser."
  }
];

const FILTERS = {
  fuel: { label: "Brandstof", options: [
    { value: "benzine", label: "Benzine" },
    { value: "diesel", label: "Diesel" },
    { value: "elektrisch", label: "Elektrisch" }
  ]},
  steering: { label: "Besturing", options: [
    { value: "knik", label: "Knik" },
    { value: "schrank", label: "Schrank" }
  ]},
  power: { label: "Motorvermogen", options: [
    { value: "3-10", label: "3 - 10 kW (4 - 14 hp)", match: m => m.powerKw >= 3 && m.powerKw < 10 },
    { value: "10-20", label: "10 - 20 kW (14 - 27 hp)", match: m => m.powerKw >= 10 && m.powerKw <= 20 },
    { value: "20+", label: "20+ kW (27+ hp)", match: m => m.powerKw > 20 }
  ]},
  speed: { label: "Max. snelheid", options: [
    { value: "0-5", label: "0 - 5 km/h", match: m => m.speedKmh >= 0 && m.speedKmh <= 5 },
    { value: "5-10", label: "5 - 10 km/h", match: m => m.speedKmh > 5 && m.speedKmh <= 10 },
    { value: "10-20", label: "10 - 20 km/h", match: m => m.speedKmh > 10 && m.speedKmh <= 20 },
    { value: "20+", label: "20+ km/h", match: m => m.speedKmh > 20 }
  ]},
  pushpull: { label: "Duw / trekkracht", options: [
    { value: "250-500", label: "250 - 500 kg", match: m => m.pushPullKg >= 250 && m.pushPullKg <= 500 },
    { value: "500-800", label: "500 - 800 kg", match: m => m.pushPullKg > 500 && m.pushPullKg <= 800 },
    { value: "800-1500", label: "800 - 1500 kg", match: m => m.pushPullKg > 800 && m.pushPullKg <= 1500 },
    { value: "1500+", label: "1500+ kg", match: m => m.pushPullKg > 1500 }
  ]},
  breakout: { label: "Opbreekkracht", options: [
    { value: "450-750", label: "450 - 750 kg", match: m => m.breakoutKg >= 450 && m.breakoutKg <= 750 },
    { value: "750-1000", label: "750 - 1000 kg", match: m => m.breakoutKg > 750 && m.breakoutKg <= 1000 },
    { value: "1000-1500", label: "1000 - 1500 kg", match: m => m.breakoutKg > 1000 && m.breakoutKg <= 1500 },
    { value: "1500+", label: "1500+ kg", match: m => m.breakoutKg > 1500 }
  ]},
  branch: { label: "Branche", options: [
    { value: "bouw", label: "Bouw" },
    { value: "hoveniers", label: "Hoveniers" },
    { value: "agrarisch", label: "Agrarisch" },
    { value: "sloop", label: "Sloop" },
    { value: "wegenbouw", label: "Wegenbouw" },
    { value: "manege", label: "Manege" },
    { value: "specials", label: "Specials" }
  ]}
};

function renderMachineCard(m) {
  const fmtPrice = function(v) { return new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:0}).format(v); };
  const priceHtml = m.poa
    ? '<p class="m-price m-poa">Prijs op aanvraag</p>'
    : (m.originalPrice
      ? `<p class="m-price"><span class="m-price-old">${fmtPrice(m.originalPrice)}</span> ${m.priceDisplay} <small>ex BTW</small></p>`
      : `<p class="m-price">${m.priceDisplay} <small>ex BTW</small></p>`);
  return `<div class="machine-card" id="${m.id}" data-fuel="${m.fuel}" data-steering="${m.steering}" data-power="${m.powerKw}" data-speed="${m.speedKmh}" data-pushpull="${m.pushPullKg}" data-breakout="${m.breakoutKg}" data-branches="${m.branches.join(',')}">
    <div class="machine-img"><img src="${m.img}" alt="${m.name}" loading="lazy"><span class="m-badge ${m.badgeClass}">${m.badge}</span></div>
    <div class="machine-body">
      <h3>${m.name} ${m.subtitle}</h3>
      <span class="m-type">${m.engine}</span>
      ${priceHtml}
      <p>${m.desc}</p>
      <div class="m-specs-detail">
        <div class="spec-row"><span class="spec-label">Vermogen</span><span class="spec-val">${m.powerKw} kW (${m.powerHp} hp)</span></div>
        <div class="spec-row"><span class="spec-label">Max. snelheid</span><span class="spec-val">${m.speedKmh} km/h</span></div>
        <div class="spec-row"><span class="spec-label">Gewicht</span><span class="spec-val">${m.weightKg} kg</span></div>
        <div class="spec-row"><span class="spec-label">Max. laadvermogen</span><span class="spec-val">${m.maxLoadKg} kg</span></div>
        <div class="spec-row"><span class="spec-label">Breedte</span><span class="spec-val">${m.widthMm} mm</span></div>
      </div>
      <div class="m-specs">${m.specs.map(s => `<span>${s}</span>`).join('')}</div>
      <div class="m-actions"><a href="checkout.html?product=${m.id}" class="btn btn-cta btn-sm">Kopen</a><a href="lease.html" class="btn btn-outline-dark btn-sm">Leasen</a><a href="afspraak.html" class="btn btn-outline-dark btn-sm">Huren</a><a href="demodagen.html" class="btn btn-outline-dark btn-sm">Demo</a></div>
      ${m.detailUrl ? `<a href="${m.detailUrl}" class="btn-bekijk">Bekijk deze machine <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>` : ''}
    </div>
  </div>`;
}

function renderFilters() {
  let html = '<div class="filter-panel" id="filterPanel"><div class="filter-header"><h3 data-i18n="common.filters">Filters</h3><button class="filter-reset" id="filterReset" data-i18n="common.resetFilters">Reset filters</button></div>';
  for (const [key, filter] of Object.entries(FILTERS)) {
    html += `<div class="filter-group"><h4>${filter.label}</h4><div class="filter-options">`;
    filter.options.forEach(opt => {
      html += `<label class="filter-option"><input type="checkbox" name="${key}" value="${opt.value}"><span>${opt.label}</span></label>`;
    });
    html += '</div></div>';
  }
  html += '</div>';
  return html;
}

function initFilters() {
  const panel = document.getElementById('filterPanel');
  const grid = document.getElementById('machinesGrid');
  const countEl = document.getElementById('machineCount');
  if (!panel || !grid) return;

  function applyFilters() {
    const activeFilters = {};
    panel.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      if (!activeFilters[cb.name]) activeFilters[cb.name] = [];
      activeFilters[cb.name].push(cb.value);
    });

    let visible = 0;
    MACHINES.forEach(m => {
      const card = document.getElementById(m.id);
      if (!card) return;
      let show = true;

      if (activeFilters.fuel && !activeFilters.fuel.includes(m.fuel)) show = false;
      if (activeFilters.steering && !activeFilters.steering.includes(m.steering)) show = false;
      if (activeFilters.branch) {
        const hasMatch = activeFilters.branch.some(b => m.branches.includes(b));
        if (!hasMatch) show = false;
      }
      if (activeFilters.power) {
        const opts = FILTERS.power.options.filter(o => activeFilters.power.includes(o.value));
        if (!opts.some(o => o.match(m))) show = false;
      }
      if (activeFilters.speed) {
        const opts = FILTERS.speed.options.filter(o => activeFilters.speed.includes(o.value));
        if (!opts.some(o => o.match(m))) show = false;
      }
      if (activeFilters.pushpull) {
        const opts = FILTERS.pushpull.options.filter(o => activeFilters.pushpull.includes(o.value));
        if (!opts.some(o => o.match(m))) show = false;
      }
      if (activeFilters.breakout) {
        const opts = FILTERS.breakout.options.filter(o => activeFilters.breakout.includes(o.value));
        if (!opts.some(o => o.match(m))) show = false;
      }

      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) countEl.textContent = `${visible} machine${visible !== 1 ? 's' : ''}`;
  }

  panel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  document.getElementById('filterReset').addEventListener('click', () => {
    panel.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    applyFilters();
  });
}

// Mobile filter toggle
function initMobileFilter() {
  const toggle = document.getElementById('filterToggle');
  const panel = document.getElementById('filterPanel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      panel.classList.toggle('filter-open');
      toggle.textContent = panel.classList.contains('filter-open') ? 'Sluit filters' : 'Filters';
    });
  }
}

/* =====================================================================
   GRASMAAIERS — Remote Control Grasmaaiers
   ===================================================================== */
const GRASMAAIERS = [
  {
    id: "mow-196-55l",
    name: "IronCub 196-55L",
    subtitle: "Remote Control Grasmaaier",
    price: 2050, originalPrice: 2520,
    img: "assets/mow-196-55l.jpg",
    engine_cc: 196,
    hp: 7.5,
    mowing_width_cm: 55,
    drive: "rupsbanden",
    climb_angle: 40,
    start: "handstart/elektrisch",
    desc: "Instapmodel afstandsbediende grasmaaier. Loncin 196cc benzine."
  },
  {
    id: "mow-224-55l",
    name: "IronCub 224-55L",
    subtitle: "Remote Control Grasmaaier",
    price: 2400, originalPrice: 3070,
    img: "assets/mow-224-55l.jpg",
    engine_cc: 224,
    hp: 9,
    mowing_width_cm: 55,
    drive: "rupsbanden",
    climb_angle: 40,
    start: "handstart/elektrisch",
    desc: "Compact model. Loncin 224cc 9HP, 55cm maaibreedte, rupsbanden."
  },
  {
    id: "mow-4wd-196",
    name: "IronCub 4WD 196",
    subtitle: "Vierwiel Grasmaaier",
    price: 2050, originalPrice: 2500,
    img: "assets/mow-4wd-196.jpg",
    engine_cc: 196,
    hp: 7.5,
    mowing_width_cm: 55,
    drive: "4WD wielen",
    climb_angle: 30,
    start: "handstart/elektrisch",
    desc: "Vierwiel met afstandsbediening. Loncin 196cc, 55cm maaibreedte."
  },
  {
    id: "mow-344-60a",
    name: "IronCub 344-60A",
    subtitle: "Remote Control Grasmaaier",
    price: 5225, originalPrice: 6375,
    img: "assets/mow-344-60a.jpg",
    engine_cc: 344,
    hp: 12,
    mowing_width_cm: 60,
    drive: "rupsbanden",
    climb_angle: 45,
    start: "elektrisch",
    desc: "Middenklasse. 344cc benzine, 60cm maaibreedte, 45 graden klimbereik."
  },
  {
    id: "mow-452-80a",
    name: "IronCub 452-80A",
    subtitle: "Off-Road Tank Grasmaaier",
    price: 6125, originalPrice: 7535,
    img: "assets/mow-452-80a.jpg",
    engine_cc: 452,
    hp: 16,
    mowing_width_cm: 80,
    drive: "rupsbanden",
    climb_angle: 45,
    start: "elektrisch",
    desc: "Krachtig off-road model. 452cc 16HP, 80cm maaibreedte, 45 graden."
  },
  {
    id: "mow-608-90a",
    name: "IronCub 608-90A",
    subtitle: "Off-Road Tank Grasmaaier",
    price: 8750, originalPrice: 10940,
    img: "assets/mow-608-90a.jpg",
    engine_cc: 608,
    hp: 22,
    mowing_width_cm: 90,
    drive: "rupsbanden",
    climb_angle: 55,
    start: "remote start",
    desc: "Professioneel. 608cc 22HP, 90cm maaibreedte, 55 graden klimbereik."
  },
  {
    id: "mow-764-90a",
    name: "IronCub 764-90A",
    subtitle: "Off-Road Tank Grasmaaier",
    price: 10250, originalPrice: 12810,
    img: "assets/mow-764-90a.jpg",
    engine_cc: 764,
    hp: 25,
    mowing_width_cm: 90,
    drive: "rupsbanden",
    climb_angle: 55,
    start: "remote start",
    desc: "Topmodel tweecilinder. 764cc 25HP, 90cm, industriele afstandsbediening."
  },
  {
    id: "mow-1102-70",
    name: "IronCub 1102-70 Multi",
    subtitle: "Multifunctioneel",
    price: 8000, originalPrice: 10400,
    img: "assets/mow-1102-70.jpg",
    engine_cc: 1102,
    hp: 22,
    mowing_width_cm: 70,
    drive: "rupsbanden",
    climb_angle: 45,
    start: "elektrisch",
    desc: "3-in-1: maaien, frezen en sleuven graven. 22HP tweecilinder."
  }
];

const GRASMAAIERS_FILTERS = {
  motor: { label: "Motor", options: [
    { value: "196-300", label: "196 - 300 cc", match: m => m.engine_cc >= 196 && m.engine_cc < 300 },
    { value: "300-500", label: "300 - 500 cc", match: m => m.engine_cc >= 300 && m.engine_cc < 500 },
    { value: "500-800", label: "500 - 800 cc", match: m => m.engine_cc >= 500 && m.engine_cc < 800 },
    { value: "800+",    label: "800+ cc",      match: m => m.engine_cc >= 800 }
  ]},
  maaibreedte: { label: "Maaibreedte", options: [
    { value: "55", label: "55 cm", match: m => m.mowing_width_cm === 55 },
    { value: "60", label: "60 cm", match: m => m.mowing_width_cm === 60 },
    { value: "80", label: "80 cm", match: m => m.mowing_width_cm === 80 },
    { value: "90", label: "90 cm", match: m => m.mowing_width_cm === 90 }
  ]},
  aandrijving: { label: "Aandrijving", options: [
    { value: "rupsbanden", label: "Rupsbanden" },
    { value: "4wd",        label: "4WD wielen" }
  ]},
  klimbereik: { label: "Klimbereik", options: [
    { value: "30-40", label: "30 - 40 graden", match: m => m.climb_angle >= 30 && m.climb_angle <= 40 },
    { value: "45",    label: "45 graden",      match: m => m.climb_angle === 45 },
    { value: "55",    label: "55 graden",      match: m => m.climb_angle === 55 }
  ]}
};

/* =====================================================================
   MERCH — IronCub Swing Collection (prijzen INCL BTW)
   ===================================================================== */
const MERCH = [
  {
    id: "merch-tshirt",
    name: "IronCub T-shirt",
    subtitle: "IronCub Swing Design",
    price_incl: 4995,
    img: "assets/merch-tshirt.jpg",
    type: "kleding",
    sizes: "XS-3XL",
    desc: "100% ringgesponnen katoen, 220 gsm heavyweight. DTG full-color print."
  },
  {
    id: "merch-hoodie",
    name: "IronCub Hoodie",
    subtitle: "IronCub Swing Design",
    price_incl: 8995,
    img: "assets/merch-hoodie.jpg",
    type: "kleding",
    sizes: "XS-3XL",
    desc: "80% katoen, 20% polyester, 350 gsm heavyweight fleece. DTG print."
  },
  {
    id: "merch-trui",
    name: "IronCub Crewneck Trui",
    subtitle: "IronCub Swing Design",
    price_incl: 7995,
    img: "assets/merch-trui.jpg",
    type: "kleding",
    sizes: "XS-3XL",
    desc: "80% katoen, 20% polyester, 320 gsm fleece. Geribbelde crew-hals."
  },
  {
    id: "merch-cap",
    name: "IronCub Snapback Cap",
    subtitle: "IronCub Face Patch",
    price_incl: 3495,
    img: "assets/merch-cap.jpg",
    type: "accessoire",
    sizes: "One Size",
    desc: "Geborduurd IronCub face patch, flat brim, plastic snapback sluiting."
  },
  {
    id: "merch-mok",
    name: "IronCub Mok",
    subtitle: "Keramiek 330ml",
    price_incl: 1995,
    img: "assets/merch-mok.jpg",
    type: "accessoire",
    sizes: "One Size",
    desc: "Mat zwart keramiek, 330 ml. Full-color sublimatie print."
  },
  {
    id: "merch-bundle-cub",
    name: "The Cub Pack",
    subtitle: "T-shirt + Cap",
    price_incl: 7495,
    originalPrice: 8490,
    img: "assets/merch-cap.jpg",
    type: "bundle",
    sizes: null,
    desc: "Bundel: T-shirt + Snapback Cap. Bespaar!"
  },
  {
    id: "merch-bundle-full",
    name: "The Full Cub",
    subtitle: "Hoodie + T-shirt + Cap",
    price_incl: 14995,
    originalPrice: 17485,
    img: "assets/merch-hoodie.jpg",
    type: "bundle",
    sizes: null,
    desc: "Bundel: Hoodie + T-shirt + Snapback Cap."
  },
  {
    id: "merch-bundle-iron",
    name: "The Iron Set",
    subtitle: "Complete collectie",
    price_incl: 24995,
    originalPrice: 27475,
    img: "assets/merch-hoodie.jpg",
    type: "bundle",
    sizes: null,
    desc: "Bundel: Hoodie + Trui + T-shirt + Cap + Mok. De complete collectie."
  }
];

const MERCH_FILTERS = {
  type: { label: "Type", options: [
    { value: "kleding",    label: "Kleding" },
    { value: "accessoire", label: "Accessoire" },
    { value: "bundle",     label: "Bundle" }
  ]}
};

/* =====================================================================
   RIPPA — Mini Graafmachines (Official Rippa Dealer Europe)
   Alle Kubota motoren, CE-gecertificeerd, Stage V
   ===================================================================== */
const RIPPA = [
  {
    id: "rippa-r06", model: "R06 ECO", subtitle: "Micro Graafmachine 0,75t",
    weight_kg: 747, weight_ton: "0,75t", engine: "Kubota Z482", engine_key: "z482", power_kw: 8.2, power_hp: 11,
    dig_depth_mm: 1001, max_reach_mm: 2565, bucket_m3: 0.014, width_mm: 747,
    img: "assets/rippa-r06.jpg", poa: false, price: 3890, originalPrice: 4950,
    specs: ["Kubota Z482", "2-cilinder", "CE/Stage V"],
    desc: "Ultra-compact. Ideaal voor krappe toegang, tuinaanleg en leidingwerk. Slechts 747 mm breed."
  },
  {
    id: "rippa-r10", model: "R10 ECO", subtitle: "Mini Graafmachine 1,0t",
    weight_kg: 1115, weight_ton: "1,0t", engine: "Kubota Z482", engine_key: "z482", power_kw: 8.2, power_hp: 11,
    dig_depth_mm: 1833, max_reach_mm: 3233, bucket_m3: 0.014, width_mm: 912,
    img: "assets/rippa-r10.jpg", poa: false, price: 5938, originalPrice: 7495,
    specs: ["Kubota Z482", "Verstelbaar onderstel", "CE/Stage V"],
    desc: "Compacte 1-tonner met verstelbaar onderstel (900-1200 mm). Graafdiepte 1,8 meter."
  },
  {
    id: "rippa-r13", model: "R13 PRO", subtitle: "Mini Graafmachine 1,3t",
    weight_kg: 1320, weight_ton: "1,3t", engine: "Kubota D722", engine_key: "d722", power_kw: 10.2, power_hp: 13.7,
    dig_depth_mm: 2044, max_reach_mm: 3456, bucket_m3: 0.014, width_mm: 990,
    img: "assets/rippa-r13.jpg", poa: false, price: 10490, originalPrice: 13195,
    specs: ["Kubota D722", "3-cilinder", "CE/Stage V"],
    desc: "Veelzijdige 1,3-tonner. Kubota D722 driecilinder, 2 meter graafdiepte. PRO uitvoering."
  },
  {
    id: "rippa-r15", model: "R15 ECO", subtitle: "Mini Graafmachine 1,5t",
    weight_kg: 1445, weight_ton: "1,5t", engine: "Kubota D722", engine_key: "d722", power_kw: 10.2, power_hp: 13.7,
    dig_depth_mm: 1807, max_reach_mm: 3274, bucket_m3: 0.018, width_mm: 990,
    img: "assets/rippa-r15.jpg", poa: false, price: 9999, originalPrice: 12495,
    specs: ["Kubota D722", "3-cilinder", "CE/Stage V"],
    desc: "Populaire 1,5-tonner voor hoveniers en aannemers. Kubota D722, grotere bak."
  },
  {
    id: "rippa-r18", model: "R18 PRO", subtitle: "Mini Graafmachine 1,8t",
    weight_kg: 1848, weight_ton: "1,8t", engine: "Kubota D902", engine_key: "d902", power_kw: 11.8, power_hp: 15.8,
    dig_depth_mm: 2420, max_reach_mm: 3975, bucket_m3: 0.045, width_mm: 1100,
    img: "assets/rippa-r18.jpg", poa: false, price: 15400, originalPrice: 19495,
    specs: ["Kubota D902", "3-cilinder", "CE/Stage V"],
    desc: "Krachtige 1,8-tonner. Kubota D902, 2,4 meter graafdiepte, grote bak 0,045 m\u00b3."
  },
  {
    id: "rippa-r22", model: "R22 PRO", subtitle: "Mini Graafmachine 2,4t",
    weight_kg: 2439, weight_ton: "2,4t", engine: "Kubota D1105", engine_key: "d1105", power_kw: 17.1, power_hp: 23,
    dig_depth_mm: 2293, max_reach_mm: 4255, bucket_m3: 0.054, width_mm: 1300,
    img: "assets/rippa-r22.jpg", poa: false, price: 19490, originalPrice: 24495,
    specs: ["Kubota D1105", "3-cilinder", "CE/Stage V"],
    desc: "Zware 2,4-tonner voor professioneel grondverzet. Kubota D1105, 17,1 kW."
  },
  {
    id: "rippa-r32", model: "R32 PRO", subtitle: "Mini Graafmachine 3,4t",
    weight_kg: 3371, weight_ton: "3,4t", engine: "Kubota V1505", engine_key: "v1505", power_kw: 17.1, power_hp: 22.9,
    dig_depth_mm: 2827, max_reach_mm: 4831, bucket_m3: 0.08, width_mm: 1550,
    img: "assets/rippa-r32.jpg", poa: false, price: 24770, originalPrice: 31495,
    specs: ["Kubota V1505", "4-cilinder", "CE/Stage V"],
    desc: "Grootste in het assortiment. Kubota V1505 viercilinder, 2,8 meter graafdiepte, 0,08 m\u00b3 bak."
  }
];

const RIPPA_FILTERS = {
  weight: { label: "Gewichtsklasse", options: [
    { value: "mini", label: "< 1,5 ton", match: function(r) { return r.weight_kg < 1500; } },
    { value: "midi", label: "1,5 - 2,5 ton", match: function(r) { return r.weight_kg >= 1500 && r.weight_kg < 2500; } },
    { value: "heavy", label: "2,5+ ton", match: function(r) { return r.weight_kg >= 2500; } }
  ]},
  engine: { label: "Motor", options: [
    { value: "z482", label: "Kubota Z482 (2-cil)" },
    { value: "d722", label: "Kubota D722 (3-cil)" },
    { value: "d902", label: "Kubota D902 (3-cil)" },
    { value: "d1105", label: "Kubota D1105 (3-cil)" },
    { value: "v1505", label: "Kubota V1505 (4-cil)" }
  ]}
};

/* =====================================================================
   PRODUCT_GROUPS — unified product group registry
   ===================================================================== */
const PRODUCT_GROUPS = [
  {
    id: "loaders",
    name: "LOADERS",
    subtitle: "Skid Steer & Knikladers",
    filters: ["fuel", "steering", "power", "speed", "pushpull", "breakout", "branch"]
  },
  {
    id: "grasmaaiers",
    name: "GRASMAAIERS",
    subtitle: "Remote Control Grasmaaiers",
    filters: ["motor", "maaibreedte", "aandrijving", "klimbereik"]
  },
  {
    id: "merch",
    name: "MERCH",
    subtitle: "IronCub Swing Collection",
    filters: ["type"]
  },
  {
    id: "aanbouwdelen",
    name: "AANBOUWDELEN",
    subtitle: "Aanbouwdelen voor loaders",
    filters: []
  },
  {
    id: "rippa",
    name: "RIPPA",
    subtitle: "Minigravers 0,75 - 3,4 ton",
    filters: ["weight", "engine"]
  }
];
