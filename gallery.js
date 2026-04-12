/* Product Gallery with arrows + lightbox */
(function() {
  var mainImg = document.getElementById('mainImg');
  var thumbsEl = document.getElementById('thumbs');
  if (!mainImg || !thumbsEl) return;

  // Determine product ID from the page script
  var pid = document.querySelector('[data-gallery-id]');
  var galleryId = pid ? pid.getAttribute('data-gallery-id') : '';
  if (!galleryId && typeof GALLERY_DATA !== 'undefined') {
    // Try to detect from URL
    var path = window.location.pathname;
    var match = path.match(/\/(rippa-[^/.]+|rippa-r\d+k?)/);
    if (match) galleryId = match[1];
  }

  var images = [];
  if (typeof GALLERY_DATA !== 'undefined' && GALLERY_DATA[galleryId]) {
    images = GALLERY_DATA[galleryId];
  }

  // If no gallery, use the main product image
  if (images.length === 0) {
    var existingImg = mainImg.querySelector('img');
    if (existingImg) images = [existingImg.src];
  }

  if (images.length === 0) return;

  var currentIdx = 0;

  function renderGallery() {
    // Main image with arrows
    mainImg.innerHTML = '<div class="pdp-gallery-wrap">' +
      (images.length > 1 ? '<button class="pdp-arrow pdp-arrow-left" id="galPrev" aria-label="Vorige">&lsaquo;</button>' : '') +
      '<img src="' + images[currentIdx] + '" alt="Product foto ' + (currentIdx + 1) + '" class="pdp-gallery-main-img" id="galMainImg">' +
      (images.length > 1 ? '<button class="pdp-arrow pdp-arrow-right" id="galNext" aria-label="Volgende">&rsaquo;</button>' : '') +
      '<span class="pdp-gallery-counter">' + (currentIdx + 1) + ' / ' + images.length + '</span>' +
    '</div>';

    // Thumbnails
    if (images.length > 1) {
      thumbsEl.innerHTML = images.map(function(src, i) {
        return '<div class="pdp-thumb' + (i === currentIdx ? ' active' : '') + '" data-idx="' + i + '">' +
          '<img src="' + src + '" alt="Foto ' + (i + 1) + '">' +
        '</div>';
      }).join('');
    }

    // Event listeners
    var prev = document.getElementById('galPrev');
    var next = document.getElementById('galNext');
    var mainImgEl = document.getElementById('galMainImg');

    if (prev) prev.addEventListener('click', function(e) {
      e.stopPropagation();
      currentIdx = (currentIdx - 1 + images.length) % images.length;
      renderGallery();
    });
    if (next) next.addEventListener('click', function(e) {
      e.stopPropagation();
      currentIdx = (currentIdx + 1) % images.length;
      renderGallery();
    });
    if (mainImgEl) mainImgEl.addEventListener('click', function() { openLightbox(currentIdx); });

    thumbsEl.querySelectorAll('.pdp-thumb').forEach(function(t) {
      t.addEventListener('click', function() {
        currentIdx = parseInt(this.getAttribute('data-idx'));
        renderGallery();
      });
    });
  }

  // Lightbox
  function openLightbox(idx) {
    var overlay = document.createElement('div');
    overlay.className = 'pdp-lightbox';
    overlay.innerHTML = '<div class="pdp-lightbox-inner">' +
      '<button class="pdp-lightbox-close" aria-label="Sluiten">&times;</button>' +
      (images.length > 1 ? '<button class="pdp-lightbox-arrow pdp-lightbox-prev" aria-label="Vorige">&lsaquo;</button>' : '') +
      '<img src="' + images[idx] + '" alt="Product foto" class="pdp-lightbox-img" id="lbImg">' +
      (images.length > 1 ? '<button class="pdp-lightbox-arrow pdp-lightbox-next" aria-label="Volgende">&rsaquo;</button>' : '') +
      '<span class="pdp-lightbox-counter">' + (idx + 1) + ' / ' + images.length + '</span>' +
    '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    var lbIdx = idx;

    function updateLb() {
      var img = document.getElementById('lbImg');
      if (img) img.src = images[lbIdx];
      var counter = overlay.querySelector('.pdp-lightbox-counter');
      if (counter) counter.textContent = (lbIdx + 1) + ' / ' + images.length;
    }

    overlay.querySelector('.pdp-lightbox-close').addEventListener('click', closeLb);
    overlay.addEventListener('click', function(e) { if (e.target === overlay || e.target.classList.contains('pdp-lightbox-inner')) closeLb(); });

    var prevBtn = overlay.querySelector('.pdp-lightbox-prev');
    var nextBtn = overlay.querySelector('.pdp-lightbox-next');
    if (prevBtn) prevBtn.addEventListener('click', function(e) { e.stopPropagation(); lbIdx = (lbIdx - 1 + images.length) % images.length; updateLb(); });
    if (nextBtn) nextBtn.addEventListener('click', function(e) { e.stopPropagation(); lbIdx = (lbIdx + 1) % images.length; updateLb(); });

    // Keyboard
    function onKey(e) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + images.length) % images.length; updateLb(); }
      if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % images.length; updateLb(); }
    }
    document.addEventListener('keydown', onKey);

    function closeLb() {
      document.removeEventListener('keydown', onKey);
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
      currentIdx = lbIdx;
      renderGallery();
    }
  }

  renderGallery();
})();
