/* ================================================================
   IronCub Chat Widget — Multi-language contact + AI assistant
   Floating bear icon bottom-right, expands to chat panel
   ================================================================ */
(function() {
  // Detect language
  function getLang() {
    try { return localStorage.getItem('ic_lang') || 'nl'; } catch(e) { return 'nl'; }
  }

  var translations = {
    nl: {
      greeting: 'Hoi! Ik ben de IronCub Beer 🐻',
      subtitle: 'Hoe kunnen we je helpen?',
      placeholder: 'Stel je vraag...',
      send: 'Verstuur',
      whatsapp: 'WhatsApp ons',
      email: 'Stuur een e-mail',
      call: 'Bel ons',
      aiLabel: 'AI Assistent',
      contactLabel: 'Contact',
      typing: 'Beer denkt na...',
      welcome: 'Welkom bij The IronCub Company! Ik kan je helpen met vragen over onze machines, prijzen, levering en meer. Wat wil je weten?',
      offline: 'We zijn nu offline. Stuur een bericht via WhatsApp of mail, dan reageren we zo snel mogelijk!',
      online: 'Online',
      closedNote: 'Ma-Vr 08:00-17:00'
    },
    en: {
      greeting: 'Hi! I\'m the IronCub Bear 🐻',
      subtitle: 'How can we help you?',
      placeholder: 'Ask your question...',
      send: 'Send',
      whatsapp: 'WhatsApp us',
      email: 'Send an email',
      call: 'Call us',
      aiLabel: 'AI Assistant',
      contactLabel: 'Contact',
      typing: 'Bear is thinking...',
      welcome: 'Welcome to The IronCub Company! I can help you with questions about our machines, prices, delivery and more. What would you like to know?',
      offline: 'We\'re currently offline. Send us a message via WhatsApp or email and we\'ll get back to you ASAP!',
      online: 'Online',
      closedNote: 'Mon-Fri 08:00-17:00'
    },
    de: {
      greeting: 'Hallo! Ich bin der IronCub Bär 🐻',
      subtitle: 'Wie können wir Ihnen helfen?',
      placeholder: 'Stellen Sie Ihre Frage...',
      send: 'Senden',
      whatsapp: 'WhatsApp',
      email: 'E-Mail senden',
      call: 'Anrufen',
      aiLabel: 'KI-Assistent',
      contactLabel: 'Kontakt',
      typing: 'Bär denkt nach...',
      welcome: 'Willkommen bei The IronCub Company! Ich kann Ihnen bei Fragen zu unseren Maschinen, Preisen, Lieferung und mehr helfen. Was möchten Sie wissen?',
      offline: 'Wir sind derzeit offline. Senden Sie uns eine Nachricht über WhatsApp oder E-Mail!',
      online: 'Online',
      closedNote: 'Mo-Fr 08:00-17:00'
    },
    fr: {
      greeting: 'Salut ! Je suis l\'ours IronCub 🐻',
      subtitle: 'Comment pouvons-nous vous aider ?',
      placeholder: 'Posez votre question...',
      send: 'Envoyer',
      whatsapp: 'WhatsApp',
      email: 'Envoyer un e-mail',
      call: 'Appelez-nous',
      aiLabel: 'Assistant IA',
      contactLabel: 'Contact',
      typing: 'L\'ours réfléchit...',
      welcome: 'Bienvenue chez The IronCub Company ! Je peux vous aider avec des questions sur nos machines, prix, livraison et plus. Que voulez-vous savoir ?',
      offline: 'Nous sommes actuellement hors ligne. Envoyez-nous un message via WhatsApp ou e-mail !',
      online: 'En ligne',
      closedNote: 'Lun-Ven 08:00-17:00'
    },
    pt: {
      greeting: 'Olá! Eu sou o Urso IronCub 🐻',
      subtitle: 'Como podemos ajudar?',
      placeholder: 'Faça sua pergunta...',
      send: 'Enviar',
      whatsapp: 'WhatsApp',
      email: 'Enviar e-mail',
      call: 'Ligar',
      aiLabel: 'Assistente IA',
      contactLabel: 'Contacto',
      typing: 'O urso está pensando...',
      welcome: 'Bem-vindo à The IronCub Company! Posso ajudá-lo com perguntas sobre nossas máquinas, preços, entrega e mais. O que gostaria de saber?',
      offline: 'Estamos offline. Envie uma mensagem via WhatsApp ou e-mail!',
      online: 'Online',
      closedNote: 'Seg-Sex 08:00-17:00'
    }
  };

  function t(key) {
    var lang = getLang();
    return (translations[lang] && translations[lang][key]) || translations.nl[key] || key;
  }

  // Simple AI responses based on keywords
  var knowledgeBase = {
    nl: [
      { keywords: ['prijs','kost','euro','betaal','goedkoop','duur'], answer: 'Onze prijzen staan op de productpagina\'s. Alle prijzen zijn ex BTW. Je kunt schakelen tussen ex/incl BTW bovenaan de site. Voor een persoonlijke offerte, neem contact op via verkoop@ironcub.company.' },
      { keywords: ['lever','bezorg','verzend','ophalen','transport'], answer: 'We bieden 3 opties:\n\n🏭 Gratis afhalen in onze showroom (Middelharnis)\n🚛 Regular Delivery (standaard transport)\n⭐ Premium Delivery (bezorging + installatie + instructie)\n\nNeem contact op voor de exacte kosten.' },
      { keywords: ['lease','huur','huren','financier'], answer: 'We bieden zowel lease als verhuur aan! Bekijk onze lease-pagina op myironcub.com/lease.html of verhuur op myironcub.com/verhuur.html voor meer info.' },
      { keywords: ['demo','proef','test','uitprober'], answer: 'Elke vrijdag is DEMO Dag bij ons in Middelharnis! Kom langs en probeer de machines zelf uit. Meer info op myironcub.com/demodagen.html' },
      { keywords: ['rippa','minigraver','graver','graafmachine','excavator'], answer: 'Wij zijn officieel Rippa Dealer Europe! We hebben 7 modellen van 1,0 tot 3,4 ton. Bekijk het complete assortiment op myironcub.com/verkoop.html#rippa' },
      { keywords: ['loader','shovel','skid','vth','htv'], answer: 'We hebben diverse Mini Skid Steer Loaders, van de compacte VTH 140 tot de krachtige HTV 1000. Bekijk ze op myironcub.com/verkoop.html#loaders' },
      { keywords: ['maaier','grasmaaier','mow','gras','maaien'], answer: 'Onze off-road tank grasmaaiers zijn geschikt voor hellingen tot 55 graden! Van 196cc tot 1102cc. Bekijk ze op myironcub.com/verkoop.html#grasmaaiers' },
      { keywords: ['service','onderhou','reparati','kapot','storing'], answer: 'Onze serviceafdeling helpt je met onderhoud, reparaties en onderdelen. Neem contact op via service@ironcub.company of bekijk myironcub.com/service.html' },
      { keywords: ['openingstijd','open','dicht','langs','bezoek','showroom','adres'], answer: 'Onze showroom in Middelharnis (De Hofjes 44, 3241 ML):\n\nMa-Vr: 08:00 - 17:00\nDinsdag: open, geen afspraak nodig\nZa: op afspraak\n\nPlan je bezoek via myironcub.com/afspraak.html' },
      { keywords: ['garantie','retour','terug','ruil'], answer: 'We bieden garantie op al onze machines. Retourneren kan binnen 14 dagen mits ongebruikt en in originele verpakking. Lees meer in onze Algemene Voorwaarden.' },
      { keywords: ['contact','bereik','bel','mail','whatsapp'], answer: 'Je kunt ons bereiken via:\n\n📧 verkoop@ironcub.company\n📧 info@ironcub.company\n🏢 Showroom: De Hofjes 44, Middelharnis\n\nOf maak een afspraak via myironcub.com/afspraak.html' }
    ]
  };

  function getAIResponse(message) {
    var msg = message.toLowerCase();
    var entries = knowledgeBase.nl;
    for (var i = 0; i < entries.length; i++) {
      for (var j = 0; j < entries[i].keywords.length; j++) {
        if (msg.indexOf(entries[i].keywords[j]) !== -1) {
          return entries[i].answer;
        }
      }
    }
    return 'Bedankt voor je vraag! Voor een persoonlijk antwoord kun je het beste contact opnemen via:\n\n📧 verkoop@ironcub.company\n📱 WhatsApp (link onderaan)\n\nOf plan een bezoek aan onze showroom via myironcub.com/afspraak.html';
  }

  // Check if business hours
  function isOnline() {
    var now = new Date();
    var day = now.getDay();
    var hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 8 && hour < 17;
  }

  // Build widget HTML
  function buildWidget() {
    var container = document.createElement('div');
    container.id = 'ic-chat-widget';
    container.innerHTML =
      '<div class="ic-chat-fab" id="icChatFab">' +
        '<span class="ic-thought-dot ic-thought-dot-1"></span>' +
        '<span class="ic-thought-dot ic-thought-dot-2"></span>' +
        '<span class="ic-thought-dot ic-thought-dot-3"></span>' +
        '<img src="/assets/bear-afspraak.png" alt="Chat" class="ic-chat-fab-img">' +
        '<span class="ic-chat-fab-badge" id="icChatBadge">1</span>' +
      '</div>' +
      '<div class="ic-chat-panel" id="icChatPanel">' +
        '<div class="ic-chat-header">' +
          '<div class="ic-chat-header-left">' +
            '<img src="/assets/bear-afspraak.png" alt="IronCub" class="ic-chat-avatar">' +
            '<div>' +
              '<div class="ic-chat-title">' + t('greeting') + '</div>' +
              '<div class="ic-chat-status"><span class="ic-chat-dot ' + (isOnline() ? 'online' : '') + '"></span>' + (isOnline() ? t('online') : t('closedNote')) + '</div>' +
            '</div>' +
          '</div>' +
          '<button class="ic-chat-close" id="icChatClose" aria-label="Sluiten">&times;</button>' +
        '</div>' +
        '<div class="ic-chat-tabs">' +
          '<button class="ic-chat-tab active" data-tab="chat">' + t('aiLabel') + '</button>' +
          '<button class="ic-chat-tab" data-tab="contact">' + t('contactLabel') + '</button>' +
        '</div>' +
        '<div class="ic-chat-body" id="icChatBody">' +
          '<div class="ic-chat-messages" id="icChatMessages"></div>' +
        '</div>' +
        '<div class="ic-chat-contact" id="icChatContact" style="display:none">' +
          '<a href="https://wa.me/31611534534?text=Hallo%20IronCub!" target="_blank" rel="noopener" class="ic-contact-btn ic-contact-wa">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.06 4.47.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.28-.2-.58-.35zm-5.44 7.44h-.02a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98.99-3.65-.24-.38a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 017 2.9 9.83 9.83 0 012.9 7c-.01 5.45-4.44 9.89-9.89 9.89zM20.52 3.48A11.81 11.81 0 0012.04 0C5.46 0 .1 5.35.1 11.93a11.9 11.9 0 001.59 5.95L0 24l6.3-1.65a11.9 11.9 0 005.73 1.46h.01c6.57 0 11.93-5.35 11.94-11.93a11.86 11.86 0 00-3.46-8.4z"/></svg>' +
            '<span>' + t('whatsapp') + '</span><span style="color:#888;font-size:12px">+31 6 11 53 45 34 &middot; 24/7</span>' +
          '</a>' +
          '<a href="mailto:verkoop@ironcub.company" class="ic-contact-btn ic-contact-mail">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>' +
            '<span>' + t('email') + '</span><span style="color:#888;font-size:12px">verkoop@ironcub.company</span>' +
          '</a>' +
          '<a href="tel:+31611534534" class="ic-contact-btn ic-contact-phone">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.69 2.36a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.72-1.26a2 2 0 012.11-.45c.76.33 1.55.56 2.36.69a2 2 0 011.72 2.03z"/></svg>' +
            '<span>' + t('call') + '</span><span style="color:#888;font-size:12px">+31 6 11 53 45 34 &middot; Ma-Vr 08:00-17:00</span>' +
          '</a>' +
          '<a href="/afspraak.html" class="ic-contact-btn ic-contact-visit">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
            '<span>Showroom bezoeken</span><span style="color:#888;font-size:12px">De Hofjes 44, Middelharnis</span>' +
          '</a>' +
        '</div>' +
        '<div class="ic-chat-input" id="icChatInput">' +
          '<input type="text" id="icChatMsg" placeholder="' + t('placeholder') + '" autocomplete="off">' +
          '<button id="icChatSend" aria-label="' + t('send') + '">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(container);
  }

  function addMessage(text, from) {
    var msgs = document.getElementById('icChatMessages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'ic-msg ic-msg-' + from;
    // Convert newlines to <br>
    div.innerHTML = '<div class="ic-msg-bubble">' + text.replace(/\n/g, '<br>') + '</div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    var msgs = document.getElementById('icChatMessages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'ic-msg ic-msg-bot ic-typing';
    div.id = 'icTyping';
    div.innerHTML = '<div class="ic-msg-bubble"><span class="ic-dot-anim"><span></span><span></span><span></span></span></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    var el = document.getElementById('icTyping');
    if (el) el.remove();
  }

  function handleSend() {
    var input = document.getElementById('icChatMsg');
    if (!input) return;
    var msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addMessage(msg, 'user');
    showTyping();
    setTimeout(function() {
      removeTyping();
      addMessage(getAIResponse(msg), 'bot');
    }, 800 + Math.random() * 600);
  }

  function initEvents() {
    var fab = document.getElementById('icChatFab');
    var panel = document.getElementById('icChatPanel');
    var close = document.getElementById('icChatClose');
    var sendBtn = document.getElementById('icChatSend');
    var input = document.getElementById('icChatMsg');
    var badge = document.getElementById('icChatBadge');
    var tabs = document.querySelectorAll('.ic-chat-tab');
    var chatBody = document.getElementById('icChatBody');
    var contactBody = document.getElementById('icChatContact');
    var chatInput = document.getElementById('icChatInput');

    var isOpen = false;
    var hasOpened = false;

    fab.addEventListener('click', function() {
      isOpen = !isOpen;
      panel.classList.toggle('open', isOpen);
      fab.classList.toggle('active', isOpen);
      if (badge) badge.style.display = 'none';
      if (isOpen && !hasOpened) {
        hasOpened = true;
        addMessage(t('welcome'), 'bot');
      }
      if (isOpen && input) setTimeout(function() { input.focus(); }, 300);
    });

    close.addEventListener('click', function() {
      isOpen = false;
      panel.classList.remove('open');
      fab.classList.remove('active');
    });

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleSend();
    });

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        var isChat = this.getAttribute('data-tab') === 'chat';
        chatBody.style.display = isChat ? '' : 'none';
        contactBody.style.display = isChat ? 'none' : '';
        chatInput.style.display = isChat ? '' : 'none';
      });
    });
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent =
      '#ic-chat-widget{position:fixed;bottom:24px;right:24px;z-index:9999;font-family:"DM Sans",sans-serif}' +
      '.ic-chat-fab{width:80px;height:80px;border-radius:50%;background:#1a1a1a;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(0,0,0,.35);transition:transform .3s,box-shadow .3s;position:relative;border:3px solid #c8a44e}' +
      '.ic-chat-fab:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(0,0,0,.4)}' +
      '.ic-chat-fab.active{transform:scale(0.9)}' +
      '.ic-chat-fab-img{width:62px;height:62px;border-radius:50%;object-fit:cover}' +
      '.ic-chat-fab-badge{position:absolute;top:-2px;right:-2px;background:#c8a44e;color:#fff;font-size:12px;font-weight:700;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #1a1a1a}' +
      '.ic-thought-dot{position:absolute;background:#1a1a1a;border-radius:50%;border:2px solid #c8a44e;opacity:.85;transition:opacity .4s,transform .4s}' +
      '.ic-thought-dot-1{width:16px;height:16px;top:-24px;left:50%;margin-left:-8px;animation:icFloat 2.5s ease-in-out infinite}' +
      '.ic-thought-dot-2{width:12px;height:12px;top:-46px;left:50%;margin-left:-14px;animation:icFloat 2.5s ease-in-out .3s infinite}' +
      '.ic-thought-dot-3{width:8px;height:8px;top:-64px;left:50%;margin-left:-18px;animation:icFloat 2.5s ease-in-out .6s infinite}' +
      '@keyframes icFloat{0%,100%{transform:translateY(0);opacity:.85}50%{transform:translateY(-4px);opacity:1}}' +
      '.ic-chat-fab.active .ic-thought-dot{opacity:0;transform:scale(0)}' +
      '.ic-chat-panel{position:absolute;bottom:96px;right:0;width:380px;max-height:540px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.2);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(20px) scale(.95);pointer-events:none;transition:opacity .3s,transform .3s}' +
      '.ic-chat-panel.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}' +
      '.ic-chat-header{background:#1a1a1a;padding:16px 20px;display:flex;align-items:center;justify-content:space-between}' +
      '.ic-chat-header-left{display:flex;align-items:center;gap:12px}' +
      '.ic-chat-avatar{width:40px;height:40px;border-radius:50%;border:2px solid #E8831A;object-fit:cover}' +
      '.ic-chat-title{color:#fff;font-size:14px;font-weight:600}' +
      '.ic-chat-status{color:#aaa;font-size:11px;display:flex;align-items:center;gap:5px}' +
      '.ic-chat-dot{width:7px;height:7px;border-radius:50%;background:#888;display:inline-block}' +
      '.ic-chat-dot.online{background:#4ade80;box-shadow:0 0 6px #4ade80}' +
      '.ic-chat-close{background:none;border:none;color:#888;font-size:24px;cursor:pointer;padding:0 4px;line-height:1}' +
      '.ic-chat-close:hover{color:#fff}' +
      '.ic-chat-tabs{display:flex;border-bottom:1px solid #eee}' +
      '.ic-chat-tab{flex:1;padding:10px;font-size:13px;font-weight:600;text-align:center;cursor:pointer;background:none;border:none;border-bottom:2px solid transparent;color:#888;transition:all .2s;font-family:inherit}' +
      '.ic-chat-tab.active{color:#E8831A;border-bottom-color:#E8831A}' +
      '.ic-chat-body{flex:1;overflow:hidden;display:flex;flex-direction:column}' +
      '.ic-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;min-height:240px;max-height:320px}' +
      '.ic-msg{display:flex}' +
      '.ic-msg-bot{justify-content:flex-start}' +
      '.ic-msg-user{justify-content:flex-end}' +
      '.ic-msg-bubble{max-width:85%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.5;word-break:break-word}' +
      '.ic-msg-bot .ic-msg-bubble{background:#f3f4f6;color:#1a1a1a;border-bottom-left-radius:4px}' +
      '.ic-msg-user .ic-msg-bubble{background:#E8831A;color:#fff;border-bottom-right-radius:4px}' +
      '.ic-chat-input{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #eee;background:#fff}' +
      '.ic-chat-input input{flex:1;border:2px solid #e5e7eb;border-radius:10px;padding:10px 14px;font-size:13px;font-family:inherit;outline:none;transition:border-color .2s}' +
      '.ic-chat-input input:focus{border-color:#E8831A}' +
      '#icChatSend{width:40px;height:40px;border-radius:10px;background:#E8831A;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}' +
      '#icChatSend:hover{background:#d4740f}' +
      '.ic-chat-contact{padding:16px;display:flex;flex-direction:column;gap:10px;min-height:280px}' +
      '.ic-contact-btn{display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:10px;text-decoration:none;color:#1a1a1a;border:1px solid #eee;transition:all .2s;font-size:14px;font-weight:500}' +
      '.ic-contact-btn span:last-child{margin-left:auto}' +
      '.ic-contact-btn:hover{border-color:#E8831A;background:#FFF7ED}' +
      '.ic-contact-wa{color:#25d366}.ic-contact-wa svg{color:#25d366}' +
      '.ic-contact-mail svg{color:#1B6B9A}' +
      '.ic-contact-phone svg{color:#E8831A}' +
      '.ic-contact-visit svg{color:#E8831A}' +
      '.ic-dot-anim{display:flex;gap:4px;padding:4px 0}' +
      '.ic-dot-anim span{width:6px;height:6px;border-radius:50%;background:#999;animation:icBounce .6s infinite alternate}' +
      '.ic-dot-anim span:nth-child(2){animation-delay:.15s}' +
      '.ic-dot-anim span:nth-child(3){animation-delay:.3s}' +
      '@keyframes icBounce{to{transform:translateY(-4px);opacity:.5}}' +
      '@media(max-width:480px){.ic-chat-panel{width:calc(100vw - 32px);right:-8px;bottom:72px;max-height:70vh}#ic-chat-widget{bottom:16px;right:16px}}';
    document.head.appendChild(style);
  }

  // Init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectStyles();
    buildWidget();
    initEvents();
  }

  // Update language on switch
  document.addEventListener('ic:langchange', function() {
    var container = document.getElementById('ic-chat-widget');
    if (container) container.remove();
    init();
  });
})();

/* ================================================================
   COOKIE CONSENT BANNER
   ================================================================ */
(function() {
  var COOKIE_KEY = 'ic_cookie_consent';

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  function setCookie(name, val, days) {
    var d = new Date(); d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=' + val + ';path=/;expires=' + d.toUTCString() + ';SameSite=Lax';
  }

  if (getCookie(COOKIE_KEY)) return; // Already consented

  var translations = {
    nl: {
      text: 'We gebruiken cookies op onze site om uw gebruikerservaring te verbeteren, gepersonaliseerde inhoud aan te bieden en ons verkeer te analyseren.',
      privacy: 'Privacybeleid',
      prefs: 'Voorkeuren',
      accept: 'Alles accepteren'
    },
    en: {
      text: 'We use cookies on our site to improve your experience, offer personalized content and analyze our traffic.',
      privacy: 'Privacy Policy',
      prefs: 'Preferences',
      accept: 'Accept all'
    },
    de: {
      text: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, personalisierte Inhalte anzubieten und unseren Traffic zu analysieren.',
      privacy: 'Datenschutz',
      prefs: 'Einstellungen',
      accept: 'Alle akzeptieren'
    },
    fr: {
      text: 'Nous utilisons des cookies pour ameliorer votre experience, proposer du contenu personnalise et analyser notre trafic.',
      privacy: 'Politique de confidentialite',
      prefs: 'Preferences',
      accept: 'Tout accepter'
    },
    pt: {
      text: 'Usamos cookies para melhorar sua experiencia, oferecer conteudo personalizado e analisar nosso trafego.',
      privacy: 'Politica de Privacidade',
      prefs: 'Preferencias',
      accept: 'Aceitar tudo'
    }
  };

  function getLang() {
    try { return localStorage.getItem('ic_lang') || 'nl'; } catch(e) { return 'nl'; }
  }
  function t(key) {
    var lang = getLang();
    return (translations[lang] && translations[lang][key]) || translations.nl[key] || key;
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'ic-cookie-banner';
    banner.innerHTML =
      '<div class="ic-cookie-inner">' +
        '<div class="ic-cookie-text">' +
          '<span>' + t('text') + ' </span>' +
          '<a href="/privacyverklaring.html">' + t('privacy') + '</a>' +
        '</div>' +
        '<div class="ic-cookie-actions">' +
          '<button class="ic-cookie-btn ic-cookie-prefs" id="icCookiePrefs">' + t('prefs') + '</button>' +
          '<button class="ic-cookie-btn ic-cookie-accept" id="icCookieAccept">' + t('accept') + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('icCookieAccept').addEventListener('click', function() {
      setCookie(COOKIE_KEY, 'all', 365);
      banner.classList.add('ic-cookie-hide');
      setTimeout(function() { banner.remove(); }, 400);
    });

    document.getElementById('icCookiePrefs').addEventListener('click', function() {
      setCookie(COOKIE_KEY, 'functional', 365);
      banner.classList.add('ic-cookie-hide');
      setTimeout(function() { banner.remove(); }, 400);
    });

    // Animate in
    setTimeout(function() { banner.classList.add('ic-cookie-show'); }, 100);
  }

  function injectCookieStyles() {
    var style = document.createElement('style');
    style.textContent =
      '#ic-cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:10000;transform:translateY(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);font-family:"DM Sans",sans-serif}' +
      '#ic-cookie-banner.ic-cookie-show{transform:translateY(0)}' +
      '#ic-cookie-banner.ic-cookie-hide{transform:translateY(100%)}' +
      '.ic-cookie-inner{background:#1a1a1a;border-top:3px solid #E8831A;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}' +
      '.ic-cookie-text{color:#ccc;font-size:13px;line-height:1.5;flex:1;min-width:280px}' +
      '.ic-cookie-text a{color:#E8831A;text-decoration:underline;font-weight:500}' +
      '.ic-cookie-text a:hover{color:#fff}' +
      '.ic-cookie-actions{display:flex;gap:10px;flex-shrink:0}' +
      '.ic-cookie-btn{padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;font-family:"Barlow Condensed",sans-serif;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;transition:all .2s;border:none}' +
      '.ic-cookie-prefs{background:transparent;color:#ccc;border:1px solid #555}' +
      '.ic-cookie-prefs:hover{border-color:#E8831A;color:#fff}' +
      '.ic-cookie-accept{background:#E8831A;color:#fff}' +
      '.ic-cookie-accept:hover{background:#d4740f}' +
      '@media(max-width:600px){.ic-cookie-inner{flex-direction:column;text-align:center;padding:16px}.ic-cookie-actions{width:100%;justify-content:center}}';
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { injectCookieStyles(); showBanner(); });
  } else {
    injectCookieStyles();
    showBanner();
  }
})();
