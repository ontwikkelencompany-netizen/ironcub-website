/**
 * winkel.js — IronCub Shop Integration
 * Integrates shopping functionality into myironcub.com
 * Vanilla JS, self-contained IIFE, no dependencies
 */
(function () {
  'use strict';

  /* =====================================================================
     CONSTANTS
     ===================================================================== */
  var API_BASE = 'https://ironcub-shop-production.up.railway.app';
  var BTW_RATE = 0.21;
  var ORANGE   = '#E8831A';
  var BLUE     = '#1B6B9A';
  var DARK     = '#1a1a1a';

  /* =====================================================================
     UTILITIES — UUID, COOKIES
     ===================================================================== */
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + d.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
  }

  /* =====================================================================
     SESSION
     ===================================================================== */
  var sessionId = getCookie('ic_session');
  if (!sessionId) {
    sessionId = generateUUID();
    setCookie('ic_session', sessionId, 365);
  }

  /* =====================================================================
     BTW STATE
     ===================================================================== */
  var btwMode = getCookie('ic_btw') || 'excl'; // 'excl' | 'incl'

  function setBtwMode(mode) {
    btwMode = mode;
    setCookie('ic_btw', mode, 365);
  }

  /* =====================================================================
     CART STATE
     ===================================================================== */
  // Items: { productId, name, price, quantity, imageUrl }
  var cart = [];
  // Wishlist: Set of productIds
  var wishlist = new Set();

  function cartTotal() {
    return cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
  }

  function cartCount() {
    return cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
  }

  function findCartItem(productId) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId) return cart[i];
    }
    return null;
  }

  function addToCart(productId, name, price, imageUrl, originalPrice) {
    var item = findCartItem(productId);
    if (item) {
      item.quantity++;
    } else {
      var entry = { productId: productId, name: name, price: price, quantity: 1, imageUrl: imageUrl || '' };
      if (originalPrice && originalPrice > price) entry.originalPrice = originalPrice;
      cart.push(entry);
    }
    persistCartEvent('cart_add', productId, name);
    updateCartBadge();
    renderCartItems();
    return !item; // true if new item
  }

  function removeFromCart(productId) {
    cart = cart.filter(function (i) { return i.productId !== productId; });
    updateCartBadge();
    renderCartItems();
  }

  function setQty(productId, qty) {
    var item = findCartItem(productId);
    if (!item) return;
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = qty;
      updateCartBadge();
      renderCartItems();
    }
  }

  /* =====================================================================
     API CALLS
     ===================================================================== */
  function persistCartEvent(eventType, productId, productName) {
    fetch(API_BASE + '/api/tracking/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        event_type: eventType,
        product_id: productId,
        product_name: productName,
        cart_state: cart
      })
    }).catch(function () { /* silent — tracking is non-critical */ });
  }

  function fetchRelatedProducts(productId, callback) {
    // Try related endpoint, fall back to fetching all products
    fetch(API_BASE + '/api/products')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var products = Array.isArray(data) ? data : (data.products || []);
        // Filter: exclude current product, prefer attachments (att- prefix)
        var related = products.filter(function (p) {
          return p.id !== productId && p.active !== false;
        });
        // Shuffle and take up to 4
        related.sort(function () { return Math.random() - 0.5; });
        callback(related.slice(0, 4));
      })
      .catch(function () { callback([]); });
  }

  /* =====================================================================
     PRICE FORMATTING
     ===================================================================== */
  function fmtPrice(cents) {
    // API returns prices in cents
    var euros = cents / 100;
    return '\u20AC' + euros.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function fmtCartPrice(euros) {
    return '\u20AC' + euros.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function displayPrice(baseExcl) {
    // baseExcl is in euros
    if (btwMode === 'incl') return fmtCartPrice(baseExcl * (1 + BTW_RATE));
    return fmtCartPrice(baseExcl);
  }

  /* =====================================================================
     INJECT STYLES
     ===================================================================== */
  function injectStyles() {
    var css = [
      /* ---- Base ---- */
      '.ic-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998;opacity:0;pointer-events:none;transition:opacity .3s ease}',
      '.ic-overlay.open{opacity:1;pointer-events:auto}',

      /* ---- Cart Panel ---- */
      '#ic-cart-panel{position:fixed;top:0;right:0;height:100%;width:min(400px,100vw);background:#fff;z-index:9999;',
      'transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);',
      'display:flex;flex-direction:column;box-shadow:-4px 0 32px rgba(0,0,0,.18);}',
      '#ic-cart-panel.open{transform:translateX(0)}',

      '#ic-cart-header{background:' + DARK + ';color:#fff;padding:18px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}',
      '#ic-cart-header h2{font-family:"Barlow Condensed",sans-serif;font-size:20px;font-weight:700;letter-spacing:.08em;margin:0}',
      '#ic-cart-close{background:none;border:none;color:#fff;cursor:pointer;padding:4px;line-height:1;font-size:22px;opacity:.8}',
      '#ic-cart-close:hover{opacity:1}',

      '#ic-btw-bar{background:#f5f5f5;padding:10px 20px;display:flex;align-items:center;gap:10px;flex-shrink:0;border-bottom:1px solid #e8e8e8}',
      '#ic-btw-bar span{font-size:12px;font-family:Inter,sans-serif;color:#555;font-weight:500}',
      '.ic-toggle{position:relative;display:inline-flex;background:#e0e0e0;border-radius:20px;padding:2px;cursor:pointer;transition:background .2s}',
      '.ic-toggle input{display:none}',
      '.ic-toggle-btn{padding:4px 12px;border-radius:16px;font-size:11px;font-family:Inter,sans-serif;font-weight:600;transition:all .2s;color:#555}',
      '.ic-toggle-btn.active{background:#C5941A;color:#fff;box-shadow:0 1px 4px rgba(197,148,26,.5)}',

      '#ic-cart-items{flex:1;overflow-y:auto;padding:0;margin:0}',
      '.ic-cart-item{display:flex;gap:12px;padding:14px 20px;border-bottom:1px solid #f0f0f0;align-items:flex-start}',
      '.ic-cart-item-img{width:60px;height:60px;object-fit:cover;border-radius:6px;background:#f5f5f5;flex-shrink:0}',
      '.ic-cart-item-img-placeholder{width:60px;height:60px;background:#f0f0f0;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#ccc}',
      '.ic-cart-item-body{flex:1;min-width:0}',
      '.ic-cart-item-name{font-size:13px;font-weight:600;font-family:Inter,sans-serif;color:' + DARK + ';margin:0 0 6px;line-height:1.3}',
      '.ic-cart-item-price{font-size:13px;color:#666;font-family:Inter,sans-serif}',
      '.ic-qty{display:flex;align-items:center;gap:6px;margin-top:6px}',
      '.ic-qty-btn{width:26px;height:26px;border-radius:50%;border:1.5px solid #ddd;background:#fff;cursor:pointer;font-size:15px;line-height:1;',
      'display:flex;align-items:center;justify-content:center;color:#333;transition:all .15s}',
      '.ic-qty-btn:hover{border-color:' + ORANGE + ';color:' + ORANGE + '}',
      '.ic-qty-val{font-size:13px;font-weight:600;font-family:Inter,sans-serif;min-width:20px;text-align:center}',
      '.ic-remove{background:none;border:none;color:#bbb;cursor:pointer;padding:0 4px;font-size:16px;line-height:1;margin-left:auto;align-self:flex-start}',
      '.ic-remove:hover{color:#e44}',
      '.ic-line-total{font-size:13px;font-weight:700;color:' + DARK + ';font-family:Inter,sans-serif;margin-top:4px}',

      '#ic-cart-footer{padding:16px 20px;border-top:1px solid #e8e8e8;flex-shrink:0;background:#fafafa}',
      '.ic-cart-totals{margin-bottom:14px}',
      '.ic-total-row{display:flex;justify-content:space-between;font-size:13px;font-family:Inter,sans-serif;color:#555;margin-bottom:4px}',
      '.ic-total-row.grand{color:' + DARK + ';font-weight:700;font-size:16px;border-top:1px solid #e0e0e0;padding-top:8px;margin-top:8px}',

      '.ic-btn-checkout{display:block;width:100%;background:' + ORANGE + ';color:#fff;font-family:"Barlow Condensed",sans-serif;',
      'font-size:16px;font-weight:700;letter-spacing:.06em;text-align:center;border:none;border-radius:6px;padding:14px;cursor:pointer;',
      'text-decoration:none;transition:background .2s}',
      '.ic-btn-checkout:hover{background:#d4731a}',
      '.ic-btn-continue{display:block;text-align:center;margin-top:10px;font-size:12px;font-family:Inter,sans-serif;color:#888;cursor:pointer;text-decoration:underline}',
      '.ic-btn-continue:hover{color:' + DARK + '}',

      '.ic-cart-empty{display:flex;flex-direction:column;align-items:center;padding:40px 20px;text-align:center;color:#999}',
      '.ic-cart-empty svg{margin-bottom:16px;opacity:.3}',
      '.ic-cart-empty p{font-family:Inter,sans-serif;font-size:14px;line-height:1.5;margin:0 0 8px}',
      '.ic-cart-empty strong{font-family:"Barlow Condensed",sans-serif;font-size:20px;color:' + DARK + ';display:block;margin-bottom:8px}',

      /* ---- Bear buttons in Header ---- */
      '.ic-bear-btn{position:relative;display:flex;align-items:flex-end;cursor:pointer;background:none;border:none;padding:0;margin:0 2px}',
      '.ic-bear-icon{height:56px;width:auto;margin-bottom:-8px;transition:transform .3s;filter:drop-shadow(0 2px 4px rgba(0,0,0,.15))}',
      '#ic-wishlist-trigger .ic-bear-icon{filter:drop-shadow(0 0 3px rgba(220,38,38,.6)) drop-shadow(0 0 8px rgba(220,38,38,.3))}',
      '.ic-bear-btn:hover .ic-bear-icon{transform:scale(1.08) translateY(-2px)}',
      '.ic-bear-cloud{position:absolute;top:-18px;left:50%;transform:translateX(-50%) translateY(6px) scale(.8);',
      'background:#fff;color:#1a1a1a;font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:800;',
      'letter-spacing:.05em;padding:5px 12px;white-space:nowrap;pointer-events:none;opacity:0;',
      'border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;box-shadow:0 2px 8px rgba(0,0,0,.12);',
      'transition:opacity .3s,transform .3s;z-index:10}',
      '.ic-bear-cloud::before{content:"";position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);',
      'width:8px;height:8px;background:#fff;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.08)}',
      '.ic-bear-cloud::after{content:"";position:absolute;bottom:-12px;left:50%;transform:translateX(-50%);',
      'width:5px;height:5px;background:#fff;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.06)}',
      '.ic-bear-btn:hover .ic-bear-cloud{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}',

      '#ic-cart-badge{position:absolute;top:2px;right:-2px;background:' + ORANGE + ';color:#fff;border-radius:50%;',
      'width:20px;height:20px;font-size:10px;font-family:Inter,sans-serif;font-weight:700;',
      'display:flex;align-items:center;justify-content:center;line-height:1;pointer-events:none;display:none;z-index:11}',
      '#ic-cart-badge.has-items{display:flex}',

      '#ic-wishlist-badge{position:absolute;top:2px;right:-2px;background:' + BLUE + ';color:#fff;border-radius:50%;',
      'width:20px;height:20px;font-size:10px;font-family:Inter,sans-serif;font-weight:700;',
      'display:none;align-items:center;justify-content:center;line-height:1;pointer-events:none;z-index:11}',
      '#ic-wishlist-badge.has-items{display:flex}',

      /* ---- BTW toggle in header with pushing bear ---- */
      '#ic-header-btw{display:flex;align-items:center;gap:0;margin-right:8px}',
      '.ic-btw-bear{height:56px;width:auto;margin-right:-6px;margin-bottom:-8px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.15));transition:transform .3s}',
      '#ic-header-btw:hover .ic-btw-bear{transform:translateX(3px)}',

      /* ---- Recommendation Panel ---- */
      '#ic-rec-panel{position:fixed;top:0;right:0;height:100%;width:min(420px,100vw);background:#fff;z-index:9999;',
      'transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);',
      'display:flex;flex-direction:column;box-shadow:-4px 0 32px rgba(0,0,0,.18);}',
      '#ic-rec-panel.open{transform:translateX(0)}',
      '#ic-rec-header{background:' + DARK + ';color:#fff;padding:16px 20px;flex-shrink:0;display:flex;align-items:flex-start;gap:12px}',
      '.ic-rec-check{width:32px;height:32px;background:#22c55e;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}',
      '.ic-rec-product-name{font-family:"Barlow Condensed",sans-serif;font-size:18px;font-weight:700;margin:0 0 2px}',
      '.ic-rec-sub{font-size:12px;opacity:.7;margin:0;font-family:Inter,sans-serif}',
      '#ic-rec-close{background:none;border:none;color:#fff;cursor:pointer;margin-left:auto;font-size:20px;opacity:.7;padding:0;line-height:1;align-self:flex-start}',
      '#ic-rec-close:hover{opacity:1}',
      '#ic-rec-body{flex:1;overflow-y:auto;padding:20px}',
      '.ic-rec-section-title{font-family:"Barlow Condensed",sans-serif;font-size:14px;font-weight:700;letter-spacing:.08em;',
      'color:#888;margin:0 0 12px;text-transform:uppercase}',
      '.ic-rec-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}',
      '.ic-rec-card{border:1.5px solid #eee;border-radius:8px;overflow:hidden;cursor:pointer;transition:border-color .15s,transform .15s}',
      '.ic-rec-card:hover{border-color:' + ORANGE + ';transform:translateY(-1px)}',
      '.ic-rec-card-img{width:100%;height:80px;object-fit:cover;background:#f5f5f5;display:block}',
      '.ic-rec-card-body{padding:8px}',
      '.ic-rec-card-name{font-size:11px;font-weight:600;font-family:Inter,sans-serif;margin:0 0 3px;color:' + DARK + ';line-height:1.2}',
      '.ic-rec-card-price{font-size:11px;color:' + ORANGE + ';font-weight:700;font-family:Inter,sans-serif}',
      '.ic-rec-card-add{background:' + ORANGE + ';color:#fff;border:none;border-radius:4px;font-size:10px;padding:4px 8px;',
      'font-family:Inter,sans-serif;font-weight:600;cursor:pointer;width:100%;margin-top:4px;transition:background .15s}',
      '.ic-rec-card-add:hover{background:#d4731a}',
      '#ic-rec-footer{padding:16px 20px;border-top:1px solid #e8e8e8;flex-shrink:0;display:flex;gap:10px;flex-direction:column}',

      /* ---- Wishlist paw on product cards ---- */
      '.ic-paw-btn{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.9);border:none;border-radius:50%;',
      'width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;',
      'z-index:2;transition:all .2s;box-shadow:0 1px 4px rgba(0,0,0,.15)}',
      '.ic-paw-btn:hover{background:#fff;transform:scale(1.1)}',
      '.ic-paw-btn svg{fill:#cc0000;stroke:#cc0000}',
      '.ic-paw-btn.on svg{fill:#cc0000;stroke:#cc0000}',
      '.ic-paw-btn::after{content:"Verlanglijst";position:absolute;top:50%;right:calc(100% + 8px);transform:translateY(-50%);',
      'background:#1a1a1a;color:#fff;font-size:11px;padding:4px 10px;border-radius:4px;white-space:nowrap;opacity:0;',
      'pointer-events:none;transition:opacity .2s;font-family:Inter,sans-serif;line-height:1}',
      '.ic-paw-btn:hover::after{opacity:1}',
      '.machine-img{position:relative}',
      '.att-img{position:relative}',
      '.mow-img{position:relative}',
      '.rippa-card-img{position:relative}',
      '.merch-img{position:relative}',

      /* ---- Toast / Confirmation ---- */
      '#ic-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);',
      'background:#22c55e;color:#fff;padding:10px 20px;border-radius:24px;',
      'font-family:Inter,sans-serif;font-size:13px;font-weight:600;',
      'z-index:10000;opacity:0;transition:all .3s;pointer-events:none;white-space:nowrap}',
      '#ic-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}',

      /* ---- Delivery Banner ---- */
      '.ic-delivery-banner{background:linear-gradient(135deg,#1a1a1a 0%,#2a2a2a 100%);color:#c8a44e;',
      'padding:14px 20px;text-align:center;font-family:Inter,sans-serif;font-size:14px;',
      'display:flex;align-items:center;justify-content:center;gap:10px;margin-top:0}',
      '.ic-delivery-banner svg{flex-shrink:0;opacity:.9}',

      /* ---- Mobile responsive ---- */
      '@media(max-width:768px){',
      '.ic-bear-icon{height:40px;margin-bottom:-6px}',
      '.ic-bear-cloud{font-size:9px;padding:3px 8px;top:-12px}',
      '}',
      '@media(max-width:480px){',
      '#ic-cart-panel,#ic-rec-panel{width:100vw}',
      '.ic-rec-grid{grid-template-columns:1fr 1fr}',
      '#ic-header-btw{display:none}',
      '.ic-bear-icon{height:32px;margin-bottom:-4px}',
      '}'
    ].join('');

    var style = document.createElement('style');
    style.id = 'ic-winkel-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* =====================================================================
     OVERLAY
     ===================================================================== */
  var overlay;
  function getOverlay() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'ic-overlay';
      overlay.id = 'ic-overlay';
      overlay.addEventListener('click', function () {
        closeCartPanel();
        closeRecPanel();
        if (typeof closeWishlistPanel === 'function') closeWishlistPanel();
      });
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function openOverlay() { getOverlay().classList.add('open'); }
  function closeOverlay() { getOverlay().classList.remove('open'); }

  /* =====================================================================
     TOAST
     ===================================================================== */
  var toastEl;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'ic-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(function () { toastEl.classList.remove('show'); }, 2000);
  }

  /* =====================================================================
     CART PANEL
     ===================================================================== */
  var cartPanel;

  function createCartPanel() {
    cartPanel = document.createElement('div');
    cartPanel.id = 'ic-cart-panel';
    cartPanel.setAttribute('role', 'dialog');
    cartPanel.setAttribute('aria-label', 'Winkelwagen');

    cartPanel.innerHTML = [
      '<div id="ic-cart-header">',
        '<h2>MIJN WINKELWAGEN</h2>',
        '<button id="ic-cart-close" aria-label="Sluit winkelwagen">&times;</button>',
      '</div>',
      '<div id="ic-btw-bar">',
        '<div class="ic-toggle" id="ic-panel-btw-toggle">',
          '<span class="ic-toggle-btn ' + (btwMode === 'excl' ? 'active' : '') + '" data-val="excl">Excl. BTW</span>',
          '<span class="ic-toggle-btn ' + (btwMode === 'incl' ? 'active' : '') + '" data-val="incl">Incl. BTW</span>',
        '</div>',
      '</div>',
      '<div id="ic-cart-items"></div>',
      '<div id="ic-cart-footer">',
        '<div class="ic-cart-totals" id="ic-cart-totals"></div>',
        '<a href="checkout.html" class="ic-btn-checkout">AFREKENEN</a>',
        '<span class="ic-btn-continue" id="ic-cart-continue">Verder winkelen</span>',
      '</div>'
    ].join('');

    document.body.appendChild(cartPanel);

    document.getElementById('ic-cart-close').addEventListener('click', closeCartPanel);
    document.getElementById('ic-cart-continue').addEventListener('click', closeCartPanel);

    // BTW toggle in panel
    cartPanel.querySelectorAll('#ic-panel-btw-toggle .ic-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-val');
        setBtwMode(val);
        syncBtwToggles();
        applyBtwToPage();
        renderCartItems();
      });
    });

    renderCartItems();
  }

  function renderCartItems() {
    var container = document.getElementById('ic-cart-items');
    var totals    = document.getElementById('ic-cart-totals');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = [
        '<div class="ic-cart-empty">',
          '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">',
            '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>',
            '<path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/>',
          '</svg>',
          '<strong>Je winkelwagen is leeg</strong>',
          '<p>Voeg machines of aanbouwdelen toe om hier te beginnen.</p>',
        '</div>'
      ].join('');
      if (totals) totals.innerHTML = '';
      return;
    }

    var html = '';
    cart.forEach(function (item) {
      var unitPrice  = btwMode === 'incl' ? item.price * (1 + BTW_RATE) : item.price;
      var lineTotal  = unitPrice * item.quantity;
      var imgHtml    = item.imageUrl
        ? '<img class="ic-cart-item-img" src="' + item.imageUrl + '" alt="' + item.name + '" loading="lazy">'
        : '<div class="ic-cart-item-img-placeholder"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>';

      html += [
        '<div class="ic-cart-item" data-id="' + item.productId + '">',
          imgHtml,
          '<div class="ic-cart-item-body">',
            '<p class="ic-cart-item-name">' + item.name + '</p>',
            '<p class="ic-cart-item-price">' + fmtCartPrice(unitPrice) + ' / stuk</p>',
            '<div class="ic-qty">',
              '<button class="ic-qty-btn ic-qty-minus" data-id="' + item.productId + '" aria-label="Minder">&#8722;</button>',
              '<span class="ic-qty-val">' + item.quantity + '</span>',
              '<button class="ic-qty-btn ic-qty-plus" data-id="' + item.productId + '" aria-label="Meer">&#43;</button>',
            '</div>',
            '<p class="ic-line-total">' + fmtCartPrice(lineTotal) + '</p>',
          '</div>',
          '<button class="ic-remove" data-id="' + item.productId + '" aria-label="Verwijder">&times;</button>',
        '</div>'
      ].join('');
    });
    container.innerHTML = html;

    // Quantity buttons
    container.querySelectorAll('.ic-qty-minus').forEach(function (btn) {
      btn.addEventListener('click', function () { setQty(this.dataset.id, (findCartItem(this.dataset.id) || {quantity:1}).quantity - 1); });
    });
    container.querySelectorAll('.ic-qty-plus').forEach(function (btn) {
      btn.addEventListener('click', function () { setQty(this.dataset.id, (findCartItem(this.dataset.id) || {quantity:0}).quantity + 1); });
    });
    container.querySelectorAll('.ic-remove').forEach(function (btn) {
      btn.addEventListener('click', function () { removeFromCart(this.dataset.id); });
    });

    // Totals
    if (totals) {
      var subtotalExcl = cartTotal();
      var btw          = subtotalExcl * BTW_RATE;
      var totalIncl    = subtotalExcl + btw;

      if (btwMode === 'excl') {
        totals.innerHTML = [
          '<div class="ic-total-row"><span>Subtotaal (excl. BTW)</span><span>' + fmtCartPrice(subtotalExcl) + '</span></div>',
          '<div class="ic-total-row"><span>BTW (21%)</span><span>' + fmtCartPrice(btw) + '</span></div>',
          '<div class="ic-total-row grand"><span>Totaal (incl. BTW)</span><span>' + fmtCartPrice(totalIncl) + '</span></div>'
        ].join('');
      } else {
        totals.innerHTML = [
          '<div class="ic-total-row"><span>Totaal (incl. BTW)</span><span>' + fmtCartPrice(totalIncl) + '</span></div>',
          '<div class="ic-total-row"><span>w.v. BTW (21%)</span><span>' + fmtCartPrice(btw) + '</span></div>',
        ].join('');
      }
    }
  }

  function openCartPanel() {
    if (!cartPanel) createCartPanel();
    renderCartItems();
    cartPanel.classList.add('open');
    openOverlay();
    document.body.style.overflow = 'hidden';
  }

  function closeCartPanel() {
    if (cartPanel) cartPanel.classList.remove('open');
    // Only close overlay if rec panel is also closed
    if (!recPanel || !recPanel.classList.contains('open')) {
      closeOverlay();
      document.body.style.overflow = '';
    }
  }

  /* =====================================================================
     WISHLIST PANEL
     ===================================================================== */
  var wishlistPanel;

  function createWishlistPanel() {
    wishlistPanel = document.createElement('div');
    wishlistPanel.id = 'ic-wishlist-panel';
    wishlistPanel.setAttribute('role', 'dialog');
    wishlistPanel.setAttribute('aria-label', 'Verlanglijst');
    wishlistPanel.style.cssText = 'position:fixed;top:0;right:0;height:100%;width:min(400px,100vw);background:#fff;z-index:9999;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);box-shadow:-4px 0 24px rgba(0,0,0,.12);display:flex;flex-direction:column;overflow-y:auto';
    document.body.appendChild(wishlistPanel);
  }

  function renderWishlistItems() {
    if (!wishlistPanel) return;
    var items = [];
    wishlist.forEach(function(id) { items.push(id); });

    if (items.length === 0) {
      wishlistPanel.innerHTML = '<div style="padding:20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #eee"><h3 style="font-family:Barlow Condensed,sans-serif;font-size:1.2rem;font-weight:700;margin:0">Verlanglijst</h3><button id="ic-wl-close" style="background:none;border:none;font-size:24px;cursor:pointer;padding:4px 8px">&times;</button></div><div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center"><p style="color:#888;font-size:14px">Je verlanglijst is leeg.</p><p style="color:#aaa;font-size:13px;margin-top:8px">Klik op het hartje bij een product om het toe te voegen.</p></div>';
    } else {
      var html = '<div style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #eee">' +
        '<h3 style="font-family:Barlow Condensed,sans-serif;font-size:1.2rem;font-weight:700;margin:0">Verlanglijst (' + items.length + ')</h3>' +
        '<div style="display:flex;align-items:center;gap:8px">' +
        '<button id="ic-wl-clear-all" style="background:none;border:1px solid #e44;border-radius:4px;color:#e44;font-size:11px;cursor:pointer;padding:4px 8px;font-family:Inter,sans-serif;line-height:1">Alles verwijderen</button>' +
        '<button id="ic-wl-close" style="background:none;border:none;font-size:24px;cursor:pointer;padding:4px 8px;color:#333">&times;</button>' +
        '</div></div><div style="flex:1;overflow-y:auto;padding:16px">';
      items.forEach(function(id) {
        html += '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #f0f0f0" data-wl-id="' + id + '">' +
          '<div style="flex:1"><p style="font-weight:600;font-size:14px;margin:0">' + id + '</p></div>' +
          '<button class="ic-wl-remove" data-id="' + id + '" style="background:none;border:none;color:#c00;cursor:pointer;font-size:18px;padding:4px" title="Verwijderen">&times;</button></div>';
      });
      html += '</div>';
      wishlistPanel.innerHTML = html;
    }

    wishlistPanel.querySelector('#ic-wl-close').addEventListener('click', closeWishlistPanel);
    wishlistPanel.querySelectorAll('.ic-wl-remove').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = this.getAttribute('data-id');
        wishlist.delete(id);
        saveLocalCart(); // FIX 2: persist immediately after every delete
        updateWishlistBadge();
        renderWishlistItems();
        showToast('Verwijderd uit verlanglijst');
      });
    });
    // FIX 2: "Alles verwijderen" clear all button
    var clearAllBtn = wishlistPanel.querySelector('#ic-wl-clear-all');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', function() {
        wishlist.clear();
        saveLocalCart();
        updateWishlistBadge();
        renderWishlistItems();
        showToast('Verlanglijst leeggemaakt');
      });
    }
  }

  function openWishlistPanel() {
    if (!wishlistPanel) createWishlistPanel();
    renderWishlistItems();
    wishlistPanel.style.transform = 'translateX(0)';
    openOverlay();
    document.body.style.overflow = 'hidden';
  }

  function closeWishlistPanel() {
    if (wishlistPanel) wishlistPanel.style.transform = 'translateX(100%)';
    closeOverlay();
    document.body.style.overflow = '';
  }

  /* =====================================================================
     CART BADGE UPDATE
     ===================================================================== */
  function updateCartBadge() {
    var badge = document.getElementById('ic-cart-badge');
    if (!badge) return;
    var count = cartCount();
    badge.textContent = count > 99 ? '99+' : String(count);
    if (count > 0) {
      badge.classList.add('has-items');
    } else {
      badge.classList.remove('has-items');
    }
  }

  function updateWishlistBadge() {
    var badge = document.getElementById('ic-wishlist-badge');
    if (!badge) return;
    var count = wishlist.size;
    badge.textContent = String(count);
    if (count > 0) {
      badge.classList.add('has-items');
    } else {
      badge.classList.remove('has-items');
    }
    // Update all paw icons
    document.querySelectorAll('.ic-paw-btn').forEach(function (btn) {
      var id = btn.getAttribute('data-product-id');
      if (id && wishlist.has(id)) {
        btn.classList.add('on');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('on');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /* =====================================================================
     CART ICON IN HEADER
     ===================================================================== */
  function injectCartIcon() {
    var headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    // Hide Rippa badge in header (already shown elsewhere)
    var rippaBadge = headerRight.querySelector('.rippa-badge');
    if (rippaBadge) rippaBadge.style.display = 'none';

    // BTW toggle with pushing bear
    var btwEl = document.createElement('div');
    btwEl.id = 'ic-header-btw';
    btwEl.innerHTML = [
      '<img src="/assets/bear-btw-push.png" alt="" class="ic-btw-bear">',
      '<div class="ic-toggle" id="ic-header-btw-toggle">',
        '<span class="ic-toggle-btn ' + (btwMode === 'excl' ? 'active' : '') + '" data-val="excl">Excl. BTW</span>',
        '<span class="ic-toggle-btn ' + (btwMode === 'incl' ? 'active' : '') + '" data-val="incl">Incl. BTW</span>',
      '</div>'
    ].join('');

    // Replace AFSPRAAK button with bear + cloud tooltip
    var afspraakBtn = headerRight.querySelector('.header-cta');
    if (afspraakBtn) {
      var afspraakWrap = document.createElement('a');
      afspraakWrap.href = 'afspraak.html';
      afspraakWrap.className = 'ic-bear-btn';
      afspraakWrap.innerHTML = '<img src="/assets/bear-afspraak.png" alt="Afspraak" class="ic-bear-icon"><span class="ic-bear-cloud">Afspraak</span>';
      afspraakBtn.parentNode.replaceChild(afspraakWrap, afspraakBtn);
    }

    // Wishlist trigger — bear holding heart with cloud tooltip
    var wishlistTrigger = document.createElement('button');
    wishlistTrigger.id = 'ic-wishlist-trigger';
    wishlistTrigger.className = 'ic-bear-btn';
    wishlistTrigger.setAttribute('aria-label', 'Verlanglijst');
    wishlistTrigger.innerHTML = [
      '<img src="/assets/bear-heart-wishlist.png" alt="Verlanglijst" class="ic-bear-icon">',
      '<span class="ic-bear-cloud">Verlanglijstje</span>',
      '<span id="ic-wishlist-badge"></span>'
    ].join('');

    // Cart trigger — bear with shopping cart and cloud tooltip
    var cartTrigger = document.createElement('button');
    cartTrigger.id = 'ic-cart-trigger';
    cartTrigger.className = 'ic-bear-btn';
    cartTrigger.setAttribute('aria-label', 'Winkelwagen openen');
    cartTrigger.innerHTML = [
      '<img src="/assets/bear-cart-shop.png" alt="Winkelwagen" class="ic-bear-icon">',
      '<span class="ic-bear-cloud">Winkelwagen</span>',
      '<span id="ic-cart-badge"></span>'
    ].join('');

    // Account trigger — bear with ID card and cloud tooltip
    var accountTrigger = document.createElement('a');
    accountTrigger.href = 'account.html';
    accountTrigger.className = 'ic-bear-btn';
    accountTrigger.id = 'ic-account-trigger';
    accountTrigger.innerHTML = [
      '<img src="/assets/bear-account.png" alt="Mijn Account" class="ic-bear-icon">',
      '<span class="ic-bear-cloud">Mijn Account</span>'
    ].join('');

    // Insert elements: BTW | Wishlist | Cart | Account | Afspraak
    var afspraakBear = headerRight.querySelector('.ic-bear-btn');
    if (afspraakBear) {
      headerRight.insertBefore(accountTrigger, afspraakBear);
      headerRight.insertBefore(cartTrigger, accountTrigger);
      headerRight.insertBefore(wishlistTrigger, cartTrigger);
      headerRight.insertBefore(btwEl, wishlistTrigger);
    } else {
      headerRight.appendChild(btwEl);
      headerRight.appendChild(wishlistTrigger);
      headerRight.appendChild(cartTrigger);
      headerRight.appendChild(accountTrigger);
    }

    cartTrigger.addEventListener('click', openCartPanel);
    wishlistTrigger.addEventListener('click', function () {
      openWishlistPanel();
    });

    // BTW toggle in header
    btwEl.querySelectorAll('.ic-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-val');
        setBtwMode(val);
        syncBtwToggles();
        applyBtwToPage();
        renderCartItems();
      });
    });
  }

  function syncBtwToggles() {
    document.querySelectorAll('.ic-toggle-btn').forEach(function (btn) {
      var val = btn.getAttribute('data-val');
      if (val) {
        if (val === btwMode) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    });
  }

  /* =====================================================================
     SVG HELPERS
     ===================================================================== */
  function cartSVG(size) {
    return [
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
        '<!-- cart body --><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>',
        '<!-- shelf --><line x1="3" y1="6" x2="21" y2="6"/>',
        '<!-- bear ear bumps on top --><path d="M8 6V4a1 1 0 011-1h1a1 1 0 011 1v2"/>',
        '<path d="M13 6V4a1 1 0 011-1h1a1 1 0 011 1v2"/>',
      '</svg>'
    ].join('');
  }

  function pawSVG(size, filled) {
    var fill = filled ? 'currentColor' : 'none';
    return [
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + fill + '" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
        '<!-- main paw pad --><ellipse cx="12" cy="14" rx="5" ry="4"/>',
        '<!-- toe beans --><circle cx="7" cy="9" r="1.5" fill="currentColor" stroke="none"/>',
        '<circle cx="11" cy="7.5" r="1.5" fill="currentColor" stroke="none"/>',
        '<circle cx="15" cy="7.5" r="1.5" fill="currentColor" stroke="none"/>',
        '<circle cx="19" cy="9" r="1.5" fill="currentColor" stroke="none"/>',
      '</svg>'
    ].join('');
  }

  function checkSVG() {
    return [
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">',
        '<polyline points="20 6 9 17 4 12"/>',
      '</svg>'
    ].join('');
  }

  function truckSVG() {
    return [
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
        '<rect x="1" y="3" width="15" height="13" rx="2"/>',
        '<path d="M16 8h5l3 3v5h-8V8z"/>',
        '<circle cx="5.5" cy="18.5" r="2.5"/>',
        '<circle cx="18.5" cy="18.5" r="2.5"/>',
      '</svg>'
    ].join('');
  }

  /* =====================================================================
     RECOMMENDATION PANEL
     ===================================================================== */
  var recPanel;

  function createRecPanel() {
    recPanel = document.createElement('div');
    recPanel.id = 'ic-rec-panel';
    recPanel.setAttribute('role', 'dialog');
    recPanel.setAttribute('aria-label', 'Toegevoegd aan winkelwagen');
    document.body.appendChild(recPanel);
  }

  function openRecPanel(productName, relatedProducts) {
    if (!recPanel) createRecPanel();

    var relatedHtml = '';
    if (relatedProducts && relatedProducts.length > 0) {
      relatedHtml = '<p class="ic-rec-section-title">Aanbevolen aanbouwdelen</p><div class="ic-rec-grid">';
      relatedProducts.forEach(function (p) {
        var img = p.imageUrl
          ? '<img class="ic-rec-card-img" src="' + p.imageUrl + '" alt="' + (p.name || '') + '" loading="lazy">'
          : '<div class="ic-rec-card-img" style="background:#f0f0f0;display:flex;align-items:center;justify-content:center;color:#ccc"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>';
        relatedHtml += [
          '<div class="ic-rec-card" data-id="' + p.id + '" data-name="' + (p.name || '') + '"',
          ' data-price="' + Math.round((p.priceExBtw || 0) / 100) + '"',
          ' data-img="' + (p.imageUrl || '') + '">',
            img,
            '<div class="ic-rec-card-body">',
              '<p class="ic-rec-card-name">' + (p.name || 'Product') + '</p>',
              '<p class="ic-rec-card-price">' + (p.originalPrice ? '<span style="text-decoration:line-through;color:#999;font-weight:400;margin-right:4px">' + fmtPrice(p.originalPrice) + '</span>' : '') + fmtPrice(p.priceExBtw || 0) + ' ex BTW</p>',
              '<button class="ic-rec-card-add">+ In winkelwagen</button>',
            '</div>',
          '</div>'
        ].join('');
      });
      relatedHtml += '</div>';
    }

    recPanel.innerHTML = [
      '<div id="ic-rec-header">',
        '<div class="ic-rec-check">' + checkSVG() + '</div>',
        '<div>',
          '<p class="ic-rec-product-name">' + productName + '</p>',
          '<p class="ic-rec-sub">toegevoegd aan je winkelwagen</p>',
        '</div>',
        '<button id="ic-rec-close" aria-label="Sluit panel">&times;</button>',
      '</div>',
      '<div id="ic-rec-body">',
        relatedHtml,
      '</div>',
      '<div id="ic-rec-footer">',
        '<a href="checkout.html" class="ic-btn-checkout">AFREKENEN</a>',
        '<span class="ic-btn-continue" id="ic-rec-continue">Verder winkelen</span>',
      '</div>'
    ].join('');

    document.getElementById('ic-rec-close').addEventListener('click', closeRecPanel);
    document.getElementById('ic-rec-continue').addEventListener('click', closeRecPanel);

    // Related card add buttons
    recPanel.querySelectorAll('.ic-rec-card').forEach(function (card) {
      card.querySelector('.ic-rec-card-add').addEventListener('click', function (e) {
        e.stopPropagation();
        var id    = card.dataset.id;
        var name  = card.dataset.name;
        var price = parseFloat(card.dataset.price) || 0;
        var img   = card.dataset.img;
        addToCart(id, name, price, img);
        showToast('\u2713 ' + name + ' toegevoegd');
        updateCartBadge();
      });
    });

    recPanel.classList.add('open');
    openOverlay();
    document.body.style.overflow = 'hidden';
  }

  function closeRecPanel() {
    if (recPanel) recPanel.classList.remove('open');
    if (!cartPanel || !cartPanel.classList.contains('open')) {
      closeOverlay();
      document.body.style.overflow = '';
    }
  }

  /* =====================================================================
     "TOEVOEGEN" BUTTONS — Replace myironcub.store links
     ===================================================================== */
  function upgradeShopButtons() {
    // Find all .btn-cta links pointing to myironcub.store
    var links = document.querySelectorAll('a.btn-cta[href*="myironcub.store"], a.att-link[href*="myironcub.store"]');
    links.forEach(function (link) {
      replaceWithAddToCart(link);
    });

    // Also handle dynamically rendered cards (machine cards use products.js data)
    // Observe DOM mutations for late-rendered content
    if (window.MutationObserver) {
      var obs = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          m.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            var newLinks = node.querySelectorAll
              ? node.querySelectorAll('a.btn-cta[href*="myironcub.store"], a.att-link[href*="myironcub.store"]')
              : [];
            newLinks.forEach(replaceWithAddToCart);
            // Check the node itself
            if (node.matches && (node.matches('a.btn-cta[href*="myironcub.store"]') || node.matches('a.att-link[href*="myironcub.store"]'))) {
              replaceWithAddToCart(node);
            }
          });
        });
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  function replaceWithAddToCart(link) {
    if (link.dataset.icUpgraded) return;
    link.dataset.icUpgraded = '1';

    // Extract product info from nearest card
    var card       = link.closest('.att-card') || link.closest('.machine-card') || link.closest('.featured-card');
    var name       = '';
    var price      = 0;
    var imageUrl   = '';
    var productId  = '';

    if (card) {
      // Product ID from card id attribute or data
      productId = card.id || '';

      // Name
      var nameEl = card.querySelector('h4') || card.querySelector('h3');
      if (nameEl) name = nameEl.textContent.trim();

      // Price — look for .att-price or .m-price or .featured-price
      var priceEl = card.querySelector('.att-price') || card.querySelector('.m-price') || card.querySelector('.featured-price');
      if (priceEl) {
        var raw = priceEl.textContent.replace(/[^\d,.]/g, '').replace(',', '.');
        price   = parseFloat(raw) || 0;
      }

      // Image
      var imgEl = card.querySelector('img');
      if (imgEl) imageUrl = imgEl.src || '';
    }

    // If no card context, try to infer from href param
    if (!productId) {
      var href = link.href || '';
      var m = href.match(/add=([^&]+)/);
      if (m) productId = m[1];
    }

    // Fallback productId
    if (!productId) productId = 'product-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    if (!name) name = link.textContent.trim() || 'Product';

    // Replace link text
    link.textContent = 'In winkelwagen';
    link.removeAttribute('href');
    link.removeAttribute('target');
    link.style.cursor = 'pointer';

    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      addToCart(productId, name, price, imageUrl);
      showToast('\u2713 ' + name + ' toegevoegd');
      updateCartBadge();

      // Fetch related products and open recommendation panel
      fetchRelatedProducts(productId, function (related) {
        closeCartPanel();
        openRecPanel(name, related);
      });
    });
  }

  /* =====================================================================
     WISHLIST PAW ICONS
     ===================================================================== */
  function injectPawIcons() {
    // Add paw icons to all product cards
    var cards = document.querySelectorAll('.machine-card, .att-card, .mow-card, .rippa-card, .merch-card');
    cards.forEach(function (card) {
      addPawToCard(card);
    });

    // Also watch for dynamically added cards
    if (window.MutationObserver) {
      var obs = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          m.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            if (node.matches && (node.matches('.machine-card') || node.matches('.att-card') || node.matches('.mow-card') || node.matches('.rippa-card') || node.matches('.merch-card'))) {
              addPawToCard(node);
            }
            var inner = node.querySelectorAll ? node.querySelectorAll('.machine-card, .att-card, .mow-card, .rippa-card, .merch-card') : [];
            inner.forEach(addPawToCard);
          });
        });
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  function addPawToCard(card) {
    if (card.dataset.icPaw) return;
    card.dataset.icPaw = '1';

    var productId = card.id || 'product-' + Math.random().toString(36).slice(2, 8);
    var imgContainer = card.querySelector('.machine-img') || card.querySelector('.att-img') || card.querySelector('.mow-img') || card.querySelector('.rippa-card-img') || card.querySelector('.merch-img');
    if (!imgContainer) return;

    var paw = document.createElement('button');
    paw.className = 'ic-paw-btn' + (wishlist.has(productId) ? ' on' : '');
    paw.setAttribute('aria-label', 'Verlanglijst');
    paw.setAttribute('aria-pressed', wishlist.has(productId) ? 'true' : 'false');
    paw.setAttribute('data-product-id', productId);
    paw.innerHTML = pawSVG(24, false);
    paw.title = 'Verlanglijst';

    paw.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(productId, paw);
    });

    imgContainer.appendChild(paw);
  }

  function toggleWishlist(productId, pawBtn) {
    if (wishlist.has(productId)) {
      wishlist.delete(productId);
      if (pawBtn) { pawBtn.classList.remove('on'); pawBtn.setAttribute('aria-pressed', 'false'); }
      showToast('Verwijderd uit verlanglijst');
    } else {
      wishlist.add(productId);
      if (pawBtn) { pawBtn.classList.add('on'); pawBtn.setAttribute('aria-pressed', 'true'); }
      showToast('\u2665 Toegevoegd aan verlanglijst');
      // Optionally call API if logged in
      persistCartEvent('wishlist_add', productId, '');
    }
    updateWishlistBadge();
    saveLocalCart();
  }

  /* =====================================================================
     BTW TOGGLE — page price recalculation
     ===================================================================== */
  function parseDutchPrice(text) {
    // Parse "€5.824" or "€12.595" — dot is thousands separator in Dutch
    var raw = text.replace(/[^\d.,]/g, '');
    var cleaned = raw.replace(/\.(?=\d{3}(?!\d))/g, '').replace(',', '.');
    return parseFloat(cleaned);
  }

  function formatDutchPrice(val) {
    return '\u20AC' + Math.round(val).toLocaleString('nl-NL');
  }

  function applyBtwToPage() {
    var selectors = '.m-price:not(.m-poa), .att-price, .featured-price, .mow-price, .rippa-card-price';
    var priceEls  = document.querySelectorAll(selectors);

    priceEls.forEach(function (el) {
      // On first run, store the original excl BTW values
      if (!el.dataset.priceExcl) {
        // Find the OLD (strikethrough) price if present
        var oldEl = el.querySelector('.m-price-old, .att-price-old, .gm-price-old, [style*="line-through"]');
        var oldVal = 0;
        if (oldEl) {
          oldVal = parseDutchPrice(oldEl.textContent);
          el.dataset.oldPriceExcl = oldVal.toString();
          el.dataset.oldPriceHtml = oldEl.outerHTML;
        }

        // Get the actual price — exclude the old price text
        var clone = el.cloneNode(true);
        var oldInClone = clone.querySelector('.m-price-old, .att-price-old, .gm-price-old, [style*="line-through"]');
        if (oldInClone) oldInClone.remove();
        var smallInClone = clone.querySelector('small');
        if (smallInClone) smallInClone.remove();
        var actualVal = parseDutchPrice(clone.textContent);
        if (!isNaN(actualVal) && actualVal > 0) {
          el.dataset.priceExcl = actualVal.toString();
        }

        // Remember if there was a small tag
        var smallEl = el.querySelector('small');
        el.dataset.hasSmall = smallEl ? '1' : '0';
      }

      var exclVal = parseFloat(el.dataset.priceExcl);
      if (isNaN(exclVal)) return;

      var oldPriceHtml = el.dataset.oldPriceHtml || '';
      var oldPriceExcl = parseFloat(el.dataset.oldPriceExcl || '0');
      var hasSmall = el.dataset.hasSmall === '1';

      if (btwMode === 'incl') {
        var inclVal = exclVal * (1 + BTW_RATE);
        var oldHtml = '';
        if (oldPriceExcl > 0) {
          var oldIncl = oldPriceExcl * (1 + BTW_RATE);
          // Recreate the old price span with incl BTW value
          oldHtml = oldPriceHtml.replace(/[\u20AC€][^<]*/g, formatDutchPrice(oldIncl)) + ' ';
        }
        el.innerHTML = oldHtml + formatDutchPrice(inclVal) + (hasSmall ? ' <small>incl. BTW</small>' : '');
      } else {
        // Restore original excl BTW display
        var oldHtml2 = oldPriceHtml ? oldPriceHtml + ' ' : '';
        el.innerHTML = oldHtml2 + formatDutchPrice(exclVal) + (hasSmall ? ' <small>ex BTW</small>' : '');
      }
    });

    /* --- Product Detail Page (PDP) prices --- */
    var pdpCurrent = document.querySelector('.pdp-price-current');
    var pdpOld     = document.querySelector('.pdp-price-old');
    if (pdpCurrent) {
      if (!pdpCurrent.dataset.priceExcl) {
        // First run — store original excl BTW value
        var clone = pdpCurrent.cloneNode(true);
        var btwLabel = clone.querySelector('.pdp-price-btw');
        if (btwLabel) btwLabel.remove();
        pdpCurrent.dataset.priceExcl = parseDutchPrice(clone.textContent).toString();
      }
      if (pdpOld && !pdpOld.dataset.priceExcl) {
        pdpOld.dataset.priceExcl = parseDutchPrice(pdpOld.textContent).toString();
      }

      var pdpExcl = parseFloat(pdpCurrent.dataset.priceExcl);
      if (!isNaN(pdpExcl)) {
        var _t = typeof t === 'function' ? t : function(k) { return k; };
        if (btwMode === 'incl') {
          pdpCurrent.innerHTML = formatDutchPrice(pdpExcl * (1 + BTW_RATE)) + '<span class="pdp-price-btw">' + _t('common.inclBtw') + '</span>';
          if (pdpOld) {
            var oldExcl = parseFloat(pdpOld.dataset.priceExcl);
            if (!isNaN(oldExcl)) pdpOld.textContent = formatDutchPrice(oldExcl * (1 + BTW_RATE));
          }
        } else {
          pdpCurrent.innerHTML = formatDutchPrice(pdpExcl) + '<span class="pdp-price-btw">' + _t('common.exBtw') + '</span>';
          if (pdpOld) {
            var oldExcl2 = parseFloat(pdpOld.dataset.priceExcl);
            if (!isNaN(oldExcl2)) pdpOld.textContent = formatDutchPrice(oldExcl2);
          }
        }
      }
    }

    /* --- Update BTW mode labels ("alle prijzen excl/incl. BTW") --- */
    document.querySelectorAll('.btw-mode-label').forEach(function(el) {
      var text = el.textContent;
      if (btwMode === 'incl') {
        el.textContent = text.replace(/excl\. BTW/i, 'incl. BTW');
      } else {
        el.textContent = text.replace(/incl\. BTW/i, 'excl. BTW');
      }
    });
  }

  /* =====================================================================
     DELIVERY BANNER on verkoop.html
     ===================================================================== */
  function injectDeliveryBanner() {
    var path = window.location.pathname;
    if (path.indexOf('verkoop') === -1) return;

    var shopSection = document.querySelector('.shop-section');
    if (!shopSection) return;

    var banner = document.createElement('div');
    banner.className = 'ic-delivery-banner';
    banner.innerHTML = [
      truckSVG(),
      '<span><strong>Levering in Nederland, Belgi&euml;, Duitsland, Frankrijk &amp; Portugal</strong> &mdash; Gratis afhalen in Middelharnis</span>'
    ].join('');

    // Insert before shop section
    shopSection.parentNode.insertBefore(banner, shopSection);
  }

  /* =====================================================================
     LOAD CART STATE FROM STORAGE
     ===================================================================== */
  function loadLocalCart() {
    try {
      var stored = localStorage.getItem('ic_cart');
      if (stored) {
        var parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
        // Fix old cart items that had price * 100 bug
        parsed.forEach(function(item) {
          if (item.price > 50000) { item.price = Math.round(item.price / 100); }
          // Fix merch items stored in cents instead of euros (e.g. 1995 instead of 19.95)
          if (item.productId && item.productId.indexOf('merch') === 0 && item.price > 100) {
            item.price = item.price / 100;
          }
        });
        cart = parsed;
        try { localStorage.setItem('ic_cart', JSON.stringify(cart)); } catch(e) {}
      }
      }
    } catch (e) { /* ignore */ }

    try {
      var wl = localStorage.getItem('ic_wishlist');
      if (wl) {
        var wlArr = JSON.parse(wl);
        if (Array.isArray(wlArr)) wishlist = new Set(wlArr);
      }
    } catch (e) { /* ignore */ }
  }

  function saveLocalCart() {
    try {
      localStorage.setItem('ic_cart', JSON.stringify(cart));
      localStorage.setItem('ic_wishlist', JSON.stringify(Array.from(wishlist)));
    } catch (e) { /* ignore */ }
  }

  // Persist on cart/wishlist changes
  var _origAddToCart  = addToCart;
  var _origRemove     = removeFromCart;
  var _origSetQty     = setQty;
  var _origToggle     = toggleWishlist;

  addToCart = function (pid, name, price, img) {
    var result = _origAddToCart(pid, name, price, img);
    saveLocalCart();
    return result;
  };

  removeFromCart = function (pid) {
    _origRemove(pid);
    saveLocalCart();
  };

  setQty = function (pid, qty) {
    _origSetQty(pid, qty);
    saveLocalCart();
  };

  toggleWishlist = function (pid, btn) {
    _origToggle(pid, btn);
    saveLocalCart();
  };

  /* =====================================================================
     ESCAPE KEY
     ===================================================================== */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCartPanel();
      closeRecPanel();
    }
  });

  /* =====================================================================
     HEADER RE-ATTACH (after ic:langchange re-renders header)
     ===================================================================== */
  document.addEventListener('ic:winkelReattach', function() {
    var headerRight = document.querySelector('.header-right');
    if (headerRight && !document.getElementById('ic-cart-trigger')) {
      injectCartIcon();
      updateCartBadge();
      updateWishlistBadge();
    }
  });

  /* =====================================================================
     INIT
     ===================================================================== */
  function init() {
    loadLocalCart();
    injectStyles();

    // Wait for components.js to render the header
    var attempts = 0;
    function tryInject() {
      var headerRight = document.querySelector('.header-right');
      if (headerRight) {
        injectCartIcon();
        updateCartBadge();
        updateWishlistBadge();
      } else if (attempts < 40) {
        attempts++;
        setTimeout(tryInject, 75);
      }
    }
    tryInject();

    // Apply BTW to page prices after DOM settles
    setTimeout(function () {
      if (btwMode === 'incl') applyBtwToPage();
    }, 300);
    // PDP pages render later via JS — retry for product detail pages
    setTimeout(function () {
      if (btwMode === 'incl' && document.querySelector('.pdp-price-current')) applyBtwToPage();
    }, 800);

    // Inject delivery banner
    injectDeliveryBanner();

    // Upgrade shop buttons (initial + dynamic via MutationObserver inside)
    upgradeShopButtons();

    // Inject paw icons
    injectPawIcons();
  }

  // Expose key functions globally for use in verkoop.html merch handlers
  window.addToCart = addToCart;
  window.showToast = showToast;
  window.updateCartBadge = updateCartBadge;
  window.removeFromCart = removeFromCart;
  window.toggleWishlist = toggleWishlist;
  window.applyBtwToPage = applyBtwToPage;
  window.upgradeShopButtons = upgradeShopButtons;
  window.openCartPanel = openCartPanel;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/* ======================================================================
   FIX 3: Global re-attach function for header re-render after language change
   Called by components.js ic:langchange handler
   ====================================================================== */
window._icWinkelReattach = (function() {
  'use strict';
  return function() {
    // Re-inject BTW toggle and bear buttons into the re-rendered header
    var headerRight = document.querySelector('.header-right');
    if (!headerRight) return;
    // Remove any previously injected bear buttons / BTW toggle to avoid duplicates
    var oldBtw = document.getElementById('ic-header-btw');
    if (oldBtw) oldBtw.parentNode.removeChild(oldBtw);
    var oldWish = document.getElementById('ic-wishlist-trigger');
    if (oldWish) oldWish.parentNode.removeChild(oldWish);
    var oldCart = document.getElementById('ic-cart-trigger');
    if (oldCart) oldCart.parentNode.removeChild(oldCart);
    var oldAcc = document.getElementById('ic-account-trigger');
    if (oldAcc) oldAcc.parentNode.removeChild(oldAcc);
    // Re-run injection — references to inner IIFE functions not accessible here,
    // but init() re-schedules tryInject which handles it
    // Simpler: dispatch a custom event that the IIFE listens to
    document.dispatchEvent(new CustomEvent('ic:winkelReattach'));
  };
})();

/* ======================================================================
   i18n integration — update winkel.js dynamic UI strings on language change
   ====================================================================== */
document.addEventListener('ic:langchange', function(e) {
  var lang = e.detail.lang;
  // Reload BTW toggle labels
  var btwLabels = document.querySelectorAll('.btw-toggle-label, .btw-btn');
  btwLabels.forEach(function(el) {
    // These use fixed labels so only update if they contain Dutch
    if (el.dataset.btwMode === 'excl') {
      if (typeof t === 'function') el.textContent = t('common.exBtw', lang);
    } else if (el.dataset.btwMode === 'incl') {
      if (typeof t === 'function') el.textContent = t('common.inclBtw', lang);
    }
  });
  // Update paw title
  document.querySelectorAll('.ic-paw-btn').forEach(function(el) {
    if (typeof t === 'function') el.title = t('common.verlanglijst', lang);
  });
  // Update cart aria-label
  var cartPanel = document.getElementById('ic-cart-panel');
  if (cartPanel && typeof t === 'function') {
    cartPanel.setAttribute('aria-label', t('common.winkelwagen', lang));
  }
});
