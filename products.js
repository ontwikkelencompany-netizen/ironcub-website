/* IronCub V3 — Product Database with Real Rippa Specs */
const MACHINES = [
  {
    id: "vth360",
    detailUrl: "machines/vth360.html",
    name: "VTH 360",
    subtitle: "Mini Skid Steer Loader",
    price: 5824,
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
    price: 7063,
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
    price: 7063,
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
    price: null,
    priceDisplay: "Prijs op aanvraag",
    poa: true,
    img: "assets/product-white.jpg",
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
    engine: "Diesel (China)",
    branches: ["bouw", "agrarisch", "sloop", "wegenbouw"],
    specs: ["Diesel", "Wielen", "ROPS/TOPS"],
    desc: "Diesel variant voor langdurig en intensief gebruik zonder stroomaansluiting."
  },
  {
    id: "vth480k",
    detailUrl: "machines/vth480k.html",
    name: "VTH 480 Kubota",
    subtitle: "Diesel (rupsbanden)",
    price: null,
    priceDisplay: "Prijs op aanvraag",
    poa: true,
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
    price: null,
    priceDisplay: "Prijs op aanvraag",
    poa: true,
    img: "assets/product-white.jpg",
    badge: "Benzine",
    badgeClass: "badge-benzine",
    fuel: "benzine",
    steering: "schrank",
    powerKw: 9.9,
    powerHp: 13.5,
    speedKmh: 4.2,
    pushPullKg: 350,
    breakoutKg: 500,
    weightKg: 755,
    ratedLoadKg: 238,
    maxLoadKg: 375,
    bucketM3: 0.08,
    widthMm: 940,
    engine: "Loncin benzine",
    branches: ["hoveniers", "agrarisch", "manege"],
    specs: ["Loncin benzine", "Compact", "ROPS/TOPS"],
    desc: "Compact instapmodel met Loncin benzinemotor. Wendbaar en eenvoudig."
  },
  {
    id: "vth200",
    detailUrl: "machines/vth200.html",
    name: "VTH 200",
    subtitle: "LOADER (Kubota diesel)",
    price: null,
    priceDisplay: "Prijs op aanvraag",
    poa: true,
    img: "assets/product-white.jpg",
    badge: "Kubota",
    badgeClass: "badge-diesel",
    fuel: "diesel",
    steering: "schrank",
    powerKw: 18.2,
    powerHp: 24.4,
    speedKmh: 8,
    pushPullKg: 670,
    breakoutKg: 750,
    weightKg: 1386,
    ratedLoadKg: 300,
    maxLoadKg: 670,
    bucketM3: 0.16,
    widthMm: 1000,
    engine: "Kubota D1105",
    branches: ["bouw", "agrarisch", "sloop", "wegenbouw"],
    specs: ["Kubota D1105", "Zwaar", "ROPS/TOPS"],
    desc: "Meer vermogen voor zwaardere taken. Ideaal voor bouw en agrarisch."
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
    { value: "10-15", label: "10 - 15 kW (14 - 20 hp)", match: m => m.powerKw >= 10 && m.powerKw < 15 },
    { value: "15+", label: "15+ kW (20+ hp)", match: m => m.powerKw >= 15 }
  ]},
  speed: { label: "Max. snelheid", options: [
    { value: "0-5", label: "0 - 5 km/h", match: m => m.speedKmh >= 0 && m.speedKmh <= 5 },
    { value: "5-10", label: "5 - 10 km/h", match: m => m.speedKmh > 5 && m.speedKmh <= 10 },
    { value: "10-15", label: "10 - 15 km/h", match: m => m.speedKmh > 10 && m.speedKmh <= 15 },
    { value: "15+", label: "15+ km/h", match: m => m.speedKmh > 15 }
  ]},
  pushpull: { label: "Duw / trekkracht", options: [
    { value: "250-500", label: "250 - 500 kg", match: m => m.pushPullKg >= 250 && m.pushPullKg < 500 },
    { value: "500-750", label: "500 - 750 kg", match: m => m.pushPullKg >= 500 && m.pushPullKg < 750 },
    { value: "750-1000", label: "750 - 1000 kg", match: m => m.pushPullKg >= 750 && m.pushPullKg < 1000 },
    { value: "1000+", label: "1000+ kg", match: m => m.pushPullKg >= 1000 }
  ]},
  breakout: { label: "Opbreekkracht", options: [
    { value: "450-750", label: "450 - 750 kg", match: m => m.breakoutKg >= 450 && m.breakoutKg < 750 },
    { value: "750-1000", label: "750 - 1000 kg", match: m => m.breakoutKg >= 750 && m.breakoutKg < 1000 },
    { value: "1500-1750", label: "1500 - 1750 kg", match: m => m.breakoutKg >= 1500 && m.breakoutKg < 1750 }
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
  const priceHtml = m.poa
    ? '<p class="m-price m-poa">Prijs op aanvraag</p>'
    : `<p class="m-price">${m.priceDisplay} <small>ex BTW</small></p>`;
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
      <div class="m-actions"><a href="contact.html" class="btn btn-cta btn-sm">Kopen</a><a href="afspraak.html" class="btn btn-outline-dark btn-sm">Huren</a><a href="lease.html" class="btn btn-outline-dark btn-sm">Leasen</a><a href="demodagen.html" class="btn btn-outline-dark btn-sm">Demo</a></div>
      ${m.detailUrl ? `<a href="${m.detailUrl}" class="btn-bekijk">Bekijk deze machine <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>` : ''}
    </div>
  </div>`;
}

function renderFilters() {
  let html = '<div class="filter-panel" id="filterPanel"><div class="filter-header"><h3>Filters</h3><button class="filter-reset" id="filterReset">Reset filters</button></div>';
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
