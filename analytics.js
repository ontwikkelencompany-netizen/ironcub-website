/* Google Analytics 4 — IronCub
   Replace GA_MEASUREMENT_ID with your actual GA4 ID (format: G-XXXXXXXXXX)
   Get it from: https://analytics.google.com → Admin → Data Streams → Web */
(function() {
  var GA_ID = 'G-14EX5RF75G';
  
  if (GA_ID === 'G-XXXXXXXXXX') {
    console.log('[GA4] Analytics not configured — replace GA_ID in analytics.js');
    return;
  }
  
  // Check cookie consent
  var consent = document.cookie.match(/ic_cookie_consent=([^;]+)/);
  if (consent && consent[1] === 'functional') {
    console.log('[GA4] User declined marketing cookies — analytics disabled');
    return;
  }

  // Load gtag.js
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  // Track page views for SPA-like navigation
  window.gtag = gtag;

  // E-commerce events
  window.icTrackPurchase = function(orderNumber, total, items) {
    gtag('event', 'purchase', {
      transaction_id: orderNumber,
      value: total,
      currency: 'EUR',
      items: items
    });
  };

  window.icTrackAddToCart = function(productId, name, price) {
    gtag('event', 'add_to_cart', {
      currency: 'EUR',
      value: price,
      items: [{ item_id: productId, item_name: name, price: price }]
    });
  };
})();
