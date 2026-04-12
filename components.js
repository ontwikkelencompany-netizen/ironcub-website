/* ======================================================================
   IronCub — components.js
   Renders: announce bar, header (with language switcher), footer
   ====================================================================== */

function getPageId(){var p=window.location.pathname;var f=p.split('/').pop().replace('.html','')||'index';return f===''?'index':f}

function renderAnnounceBar(){
  return '<div class="announce-bar"><div class="container announce-inner"><span>Elke vrijdag is <span class="sparkle-text" id="demoSparkle">DEMO Dag</span> \u2014 <span data-i18n="announce.text">een inspirerende ervaring</span></span><a href="demodagen.html" class="announce-link" data-i18n="announce.link">Meer info \u2192</a></div></div>';
}

function renderLangSwitcher(){
  var cur = 'nl';
  try { cur = localStorage.getItem('ic_lang') || 'nl'; } catch(e){}
  var langs = ['NL','EN','DE','FR','PT'];
  var html = '<div class="lang-switcher" role="navigation" aria-label="Language">';
  langs.forEach(function(l){
    var code = l.toLowerCase();
    html += '<button class="lang-btn'+(code===cur?' lang-active':'')+'" data-lang="'+code+'" onclick="switchLanguage(\''+code+'\')" title="'+l+'">'+l+'</button>';
  });
  html += '</div>';
  return html;
}

function renderHeader(){
  var pg=getPageId();var a=function(p){return pg===p?'nav-active':'';};
  return '<header class="site-header" id="header">'
    +'<div class="header-inner">'
    +'<a href="index.html" class="logo-link"><img src="assets/bear-logo-peek.png" alt="The IronCub Company" class="logo-peek"><span class="thought-bubble"><svg class="cloud-bg" viewBox="0 0 90 48" xmlns="http://www.w3.org/2000/svg"><ellipse cx="45" cy="26" rx="40" ry="18" fill="white"/><circle cx="18" cy="22" r="14" fill="white"/><circle cx="72" cy="22" r="14" fill="white"/><circle cx="32" cy="14" r="12" fill="white"/><circle cx="56" cy="13" r="13" fill="white"/><circle cx="45" cy="10" r="10" fill="white"/></svg><span class="cloud-text">Home</span><span class="cloud-dot dot-1"></span><span class="cloud-dot dot-2"></span></span></a>'
    +'<nav class="main-nav" id="mainNav">'
    +'<div class="nav-item has-mega">'
    +'<a href="verkoop.html" class="nav-link '+a('verkoop')+'" data-i18n="nav.verkoop">VERKOOP <svg class="dd-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>'
    +'<div class="mega-menu">'
    +'<div class="mega-col"><h4 data-i18n="megamenu.loaders">Loaders</h4><a href="verkoop.html#vth360">VTH 360</a><a href="verkoop.html#vth480w">VTH 480W</a><a href="verkoop.html#vth480k">VTH 480 Kubota</a><a href="verkoop.html#vth140">VTH 140</a><a href="verkoop.html#vth200">VTH 200</a><a href="verkoop.html#htv1000">HTV 1000</a></div>'
    +'<div class="mega-col"><h4 data-i18n="megamenu.grasmaaiers">Grasmaaiers</h4><a href="verkoop.html#mow-196-55l">196-55L</a><a href="verkoop.html#mow-224-55l">224-55L</a><a href="verkoop.html#mow-4wd-196">4WD 196</a><a href="verkoop.html#mow-344-60a">344-60A</a><a href="verkoop.html#mow-452-80a">452-80A</a><a href="verkoop.html#mow-608-90a">608 / 764-90A</a><a href="verkoop.html#mow-1102-70">1102-70 Multi</a></div>'
    +'<div class="mega-col"><h4 data-i18n="megamenu.rippa">Rippa Minigravers</h4><a href="verkoop.html#rippa-r06">R06 ECO (0,75t)</a><a href="verkoop.html#rippa-r10">R10 ECO (1,0t)</a><a href="verkoop.html#rippa-r13">R13 PRO (1,3t)</a><a href="verkoop.html#rippa-r15">R15 ECO (1,5t)</a><a href="verkoop.html#rippa-r18">R18 PRO (1,8t)</a><a href="verkoop.html#rippa-r22">R22 PRO (2,4t)</a><a href="verkoop.html#rippa-r32">R32 PRO (3,4t)</a></div>'
    +'<div class="mega-col"><h4 data-i18n="megamenu.aanbouwdelen">Aanbouwdelen</h4><a href="verkoop.html#aanbouwdelen">Grondwerk</a><a href="verkoop.html#aanbouwdelen">Groenonderhoud</a><a href="verkoop.html#aanbouwdelen">Sloop &amp; Transport</a></div>'
    +'<div class="mega-col"><h4 data-i18n="megamenu.merch">Merch</h4><a href="verkoop.html#merch">IronCub Swing Collectie</a><a href="verkoop.html#merch">T-shirts, Hoodies &amp; Caps</a></div>'
    +'<div class="mega-col mega-levering"><h4 data-i18n="megamenu.levering">Levering</h4><div class="mega-tier"><span class="tier-label tier-premium-label">Premium</span><span data-i18n="megamenu.premiumDesc">Bezorging op locatie + installatie + instructie</span></div><div class="mega-tier"><span class="tier-label tier-regular-label">Regular</span><span data-i18n="megamenu.regularDesc">Afhalen in showroom of standaard transport</span></div></div>'
    +'</div></div>'
    +'<a href="verhuur.html" class="nav-link '+a('verhuur')+'" data-i18n="nav.verhuur">VERHUUR</a>'
    +'<a href="lease.html" class="nav-link '+a('lease')+'" data-i18n="nav.lease">LEASE</a>'
    +'<a href="demodagen.html" class="nav-link '+a('demodagen')+'" data-i18n="nav.demodagen">DEMODAGEN</a>'
    +'<a href="service.html" class="nav-link '+a('service')+'" data-i18n="nav.service">SERVICE</a>'
    +'</nav>'
    +'<div class="header-right">'
    + renderLangSwitcher()
    +'<a href="afspraak.html" class="btn btn-cta btn-sm header-cta '+a('afspraak')+'" data-i18n="nav.afspraak">AFSPRAAK</a>'
    +'<div class="header-icons">'
    +'<button class="icon-btn" id="wishlistBtn" aria-label="Verlanglijst"><img src="assets/icon-bear-cart.svg" alt="" class="bear-icon-img"><span class="cart-badge" id="wishlistBadge" style="display:none">0</span></button>'
    +'<button class="icon-btn" id="cartBtn" aria-label="Winkelwagen"><img src="assets/icon-bear-cart.svg" alt="" class="bear-icon-img"><span class="cart-badge" id="cartBadge" style="display:none">0</span></button>'
    +'<a href="account.html" class="icon-btn" aria-label="Account"><img src="assets/icon-bear-account.svg" alt="" class="bear-icon-img"></a>'
    +'</div>'
    +'<button class="mobile-toggle" id="mobileToggle" aria-label="Menu openen"><span></span><span></span><span></span></button>'
    +'</div>'
    +'</div>'
    +'<nav class="mobile-nav" id="mobileNav">'
    +'<a href="verkoop.html" data-i18n="nav.verkoop">VERKOOP</a>'
    +'<a href="verhuur.html" data-i18n="nav.verhuur">VERHUUR</a>'
    +'<a href="lease.html" data-i18n="nav.lease">LEASE</a>'
    +'<a href="demodagen.html" data-i18n="nav.demodagen">DEMODAGEN</a>'
    +'<a href="service.html" data-i18n="nav.service">SERVICE</a>'
    +'<a href="afspraak.html" data-i18n="nav.afspraak">AFSPRAAK</a>'
    +'<div class="mobile-lang-row">'
    +'<button class="lang-btn" data-lang="nl" onclick="switchLanguage(\'nl\')">NL</button>'
    +'<button class="lang-btn" data-lang="en" onclick="switchLanguage(\'en\')">EN</button>'
    +'<button class="lang-btn" data-lang="de" onclick="switchLanguage(\'de\')">DE</button>'
    +'<button class="lang-btn" data-lang="fr" onclick="switchLanguage(\'fr\')">FR</button>'
    +'<button class="lang-btn" data-lang="pt" onclick="switchLanguage(\'pt\')">PT</button>'
    +'</div>'
    +'</nav>'
    +'</header>';
}

function renderFooter(){
  return '<footer class="site-footer">'
    +'<div class="container footer-grid">'
    +'<div class="footer-brand">'
    +'<img src="assets/logo-full.jpg" alt="The IronCub Company" class="footer-logo" style="filter:brightness(1.3) contrast(1.1)">'
    +'<div class="footer-dealer" style="display:flex;align-items:center;gap:10px;margin-top:10px">'
    +'<span style="display:inline-flex;align-items:center;background:rgba(255,255,255,.92);border-radius:6px;padding:4px 10px"><img src="assets/rippa-logo.png" alt="Rippa" style="height:22px;width:auto"></span>'
    +'<span style="color:#ccc;font-size:13px;font-weight:500" data-i18n="footer.officialDealer">Official Rippa Dealer Europe</span>'
    +'</div>'
    +'<div class="footer-social">'
    +'<a href="https://www.tiktok.com/@theironcubcompany" target="_blank" rel="noopener" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.44V13.2a8.16 8.16 0 005.58 2.2V12a4.83 4.83 0 01-3.77-1.54V6.69h3.77z"/></svg></a>'
    +'<a href="https://www.youtube.com/@TheIronCubCompany" target="_blank" rel="noopener" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>'
    +'<a href="https://www.instagram.com/theironcubcompany/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.3.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32A6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg></a>'
    +'<a href="https://www.facebook.com/profile.php?id=61580721787793" target="_blank" rel="noopener" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg></a>'
    +'</div></div>'
    +'<div class="footer-col"><h4 data-i18n="footer.diensten">Diensten</h4>'
    +'<a href="verkoop.html" data-i18n="nav.verkoop">VERKOOP</a>'
    +'<a href="verhuur.html" data-i18n="nav.verhuur">VERHUUR</a>'
    +'<a href="lease.html" data-i18n="nav.lease">LEASE</a>'
    +'<a href="demodagen.html" data-i18n="nav.demodagen">DEMODAGEN</a>'
    +'<a href="service.html" data-i18n="nav.service">SERVICE</a>'
    +'</div>'
    +'<div class="footer-col"><h4 data-i18n="footer.producten">Producten</h4>'
    +'<a href="verkoop.html#loaders">Loaders</a>'
    +'<a href="verkoop.html#grasmaaiers" data-i18n="megamenu.grasmaaiers">Grasmaaiers</a>'
    +'<a href="verkoop.html#rippa" data-i18n="megamenu.rippa">Rippa Minigravers</a>'
    +'<a href="verkoop.html#aanbouwdelen" data-i18n="megamenu.aanbouwdelen">Aanbouwdelen</a>'
    +'<a href="verkoop.html#merch" data-i18n="megamenu.merch">Merch</a>'
    +'</div>'
    +'<div class="footer-col"><h4 data-i18n="footer.info">Info</h4>'
    +'<a href="over-ons.html" data-i18n="footer.overOns">Over ons</a>'
    +'<a href="contact.html" data-i18n="footer.contact">Contact</a>'
    +'<a href="account.html" data-i18n="footer.mijnAccount">Mijn Account</a>'
    +'<a href="contact.html" data-i18n="footer.dealerWorden">Dealer worden</a>'
    +'</div>'
    +'</div>'
    +'<div class="footer-bottom"><p data-i18n="footer.copyright">\u00a9 2025 The IronCub Company. Alle rechten voorbehouden.</p></div>'
    +'</footer>';
}

document.addEventListener('DOMContentLoaded',function(){
  var ae=document.getElementById('announce-bar');
  var he=document.getElementById('site-header');
  var fe=document.getElementById('site-footer');

  if(ae) ae.innerHTML=renderAnnounceBar();
  if(he) he.innerHTML=renderHeader();
  if(fe) fe.innerHTML=renderFooter();

  // Apply current language to freshly-rendered components
  if(typeof applyLanguage === 'function'){
    applyLanguage(typeof getCurrentLang === 'function' ? getCurrentLang() : (localStorage.getItem('ic_lang')||'nl'));
  }

  setTimeout(function(){
    var t=document.getElementById('mobileToggle');
    var n=document.getElementById('mobileNav');
    if(t&&n){
      t.addEventListener('click',function(){
        n.classList.toggle('open');
        t.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      });
      n.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click',function(){
          n.classList.remove('open');
          t.classList.remove('active');
          document.body.classList.remove('nav-open');
        });
      });
    }
    var h=document.getElementById('header');
    if(h){
      var ls=0;
      window.addEventListener('scroll',function(){
        var s=window.scrollY;
        h.classList.toggle('scrolled',s>60);
        if(s>300) h.classList.toggle('header-hide',s>ls);
        else h.classList.remove('header-hide');
        ls=s;
      });
    }
  },50);

  if(window.location.hash){
    setTimeout(function(){
      var el=document.querySelector(window.location.hash);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    },200);
  }

  function triggerSparkle(){
    var s=document.getElementById('demoSparkle');
    if(s){s.classList.remove('sparkle-active');void s.offsetWidth;s.classList.add('sparkle-active');}
  }
  setTimeout(triggerSparkle,500);
  setInterval(triggerSparkle,60000);
  var lastScroll=window.scrollY;
  window.addEventListener('scroll',function(){
    if(window.scrollY<50&&lastScroll>100) triggerSparkle();
    lastScroll=window.scrollY;
  });
});
