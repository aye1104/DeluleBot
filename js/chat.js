/* ============================================
   CHAT.JS — Panel de Chat & Mensajería (Rol 03)
   ChatApp · Grupo 06
   ============================================
   Depende de: storage.js, contacts.js, bot.js, auth.js
   Expone: ChatModule
   ============================================ */

const ChatModule = (() => {

  // ─── Estado interno ───────────────────────────────────────────
  let activeContactId = null;
  let contextMenuTarget = null;

  // ─── Referencias DOM ──────────────────────────────────────────
  const chatEmpty    = document.getElementById('chatEmpty');
  const chatActive   = document.getElementById('chatActive');
  const chatMessages = document.getElementById('chatMessages');
  const msgInput     = document.getElementById('msgInput');
  const btnSend      = document.getElementById('btnSend');
  const btnBack      = document.getElementById('btnBack');
  const contextMenu  = document.getElementById('contextMenu');
  const typingIndicator = document.getElementById('typingIndicator');

  // Header
  const headerAvatar      = document.getElementById('headerAvatar');
  const headerAvatarPH    = document.getElementById('headerAvatarPlaceholder');
  const headerStatusDot   = document.getElementById('headerStatusDot');
  const headerName        = document.getElementById('headerName');
  const headerStatus      = document.getElementById('headerStatus');
  const headerTyping      = document.getElementById('headerTyping');
  const typingAvatar      = document.getElementById('typingAvatar');

  // ─── Emojis disponibles para reaccionar ───────────────────────
  const REACTION_EMOJIS = ['❤️', '😂', '😮', '😢', '👍'];

  // ─── Abrir un chat ────────────────────────────────────────────
  function openChat(contactId) {
    activeContactId = contactId;
    const contact = ContactsData.find(c => c.id === contactId);
    if (!contact) return;

    // Actualizar header
    _renderHeader(contact);

    // Mostrar panel
    chatEmpty.style.display  = 'none';
    chatActive.style.display = 'flex';

    // Marcar mensajes como leídos
    StorageModule.markAsRead(contactId);

    // Renderizar mensajes
    _renderMessages(contactId);

    // Scroll al final
    _scrollToBottom();

    // Notificar al sidebar para que actualice badges
    if (window.SidebarModule) SidebarModule.refresh();

    // En mobile: ocultar sidebar
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.add('sidebar--hidden');
    }
  }

  // ─── Cerrar chat (volver al sidebar en mobile) ────────────────
  function closeChat() {
    activeContactId = null;
    chatEmpty.style.display  = 'flex';
    chatActive.style.display = 'none';
    document.getElementById('sidebar').classList.remove('sidebar--hidden');
  }

  // ─── Renderizar header con datos del contacto ─────────────────
  function _renderHeader(contact) {
    headerName.textContent = contact.nombre;

    // Avatar
    headerAvatar.src = contact.foto || '';
    headerAvatar.alt = contact.nombre;
    headerAvatar.onerror = () => {
      headerAvatar.style.display = 'none';
      headerAvatarPH.style.display = 'flex';
      headerAvatarPH.textContent = contact.nombre.charAt(0).toUpperCase();
    };
    if (contact.foto) {
      headerAvatar.style.display = 'block';
      headerAvatarPH.style.display = 'none';
    } else {
      headerAvatar.style.display = 'none';
      headerAvatarPH.style.display = 'flex';
      headerAvatarPH.textContent = contact.nombre.charAt(0).toUpperCase();
    }

    // Estado
    const statusMap = { online: 'En línea', ocupado: 'Ocupado', 'no-molestar': 'No molestar' };
    headerStatus.textContent = statusMap[contact.estado] || contact.estado || '';
    headerStatusDot.className = `chat-header__status-dot ${contact.estado || ''}`;

    // Typing avatar
    typingAvatar.src = contact.foto || '';
    typingAvatar.alt = contact.nombre;
  }

  // ─── Renderizar todos los mensajes de un contacto ─────────────
  function _renderMessages(contactId) {
    chatMessages.innerHTML = '';
    const messages = StorageModule.getMessages(contactId);

    let lastDateStr = null;

    messages.forEach(msg => {
      const dateStr = _getDateLabel(msg.timestamp);

      // Separador de fecha
      if (dateStr !== lastDateStr) {
        chatMessages.appendChild(_createDateSeparator(dateStr));
        lastDateStr = dateStr;
      }

      chatMessages.appendChild(_createMessageEl(msg));
    });
  }

  // ─── Crear elemento de separador de fecha ─────────────────────
  function _createDateSeparator(label) {
    const div = document.createElement('div');
    div.className = 'date-separator';
    div.innerHTML = `<span class="date-separator__label">${label}</span>`;
    return div;
  }

  // ─── Crear elemento de burbuja de mensaje ─────────────────────
  function _createMessageEl(msg) {
    const user = AuthModule.getUser();
    const isOwn = msg.senderId === user.id;

    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${isOwn ? 'own' : 'other'}`;
    wrapper.dataset.msgId = msg.id;

    // Burbuja
    const bubble = document.createElement('div');
    bubble.className = `message-bubble${msg.deleted ? ' deleted' : ''}`;

    // Texto
    const text = document.createElement('p');
    text.className = 'message-bubble__text';
    text.textContent = msg.deleted ? 'Mensaje eliminado' : msg.text;
    bubble.appendChild(text);

    // Meta: hora + estado
    const meta = document.createElement('div');
    meta.className = 'message-bubble__meta';

    const time = document.createElement('span');
    time.className = 'message-bubble__time';
    time.textContent = _formatTime(msg.timestamp);
    meta.appendChild(time);

    // Estado del mensaje (solo para los propios)
    if (isOwn && !msg.deleted) {
      const statusEl = document.createElement('span');
      statusEl.className = `msg-status msg-status--${msg.status || 'sent'}`;
      statusEl.textContent = _statusIcon(msg.status);
      statusEl.dataset.statusEl = 'true';
      meta.appendChild(statusEl);
    }

    bubble.appendChild(meta);

    // Picker de reacciones (hover/long-press)
    if (!msg.deleted) {
      const picker = _createReactionPicker(msg.id);
      bubble.appendChild(picker);

      // Mostrar picker al hover (desktop)
      bubble.addEventListener('mouseenter', () => picker.classList.add('visible'));
      bubble.addEventListener('mouseleave', () => picker.classList.remove('visible'));

      // Long-press para mobile
      let pressTimer;
      bubble.addEventListener('touchstart', () => {
        pressTimer = setTimeout(() => picker.classList.add('visible'), 500);
      });
      bubble.addEventListener('touchend', () => clearTimeout(pressTimer));
    }

    // Click derecho → menú contextual
    bubble.addEventListener('contextmenu', e => {
      e.preventDefault();
      if (msg.deleted) return;
      _showContextMenu(e.clientX, e.clientY, msg, isOwn);
    });

    wrapper.appendChild(bubble);

    // Reacciones existentes
    if (msg.reactions && msg.reactions.length > 0) {
      const reactionsEl = _createReactionsEl(msg);
      wrapper.appendChild(reactionsEl);
    }

    return wrapper;
  }

  // ─── Picker de reacciones ─────────────────────────────────────
  function _createReactionPicker(msgId) {
    const picker = document.createElement('div');
    picker.className = 'reaction-picker';

    REACTION_EMOJIS.forEach(emoji => {
      const btn = document.createElement('span');
      btn.className = 'reaction-picker__emoji';
      btn.textContent = emoji;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        _addReaction(msgId, emoji);
        picker.classList.remove('visible');
      });
      picker.appendChild(btn);
    });

    return picker;
  }

  // ─── Elemento de reacciones debajo de la burbuja ──────────────
  function _createReactionsEl(msg) {
    const div = document.createElement('div');
    div.className = 'message-reactions';

    const counts = {};
    (msg.reactions || []).forEach(r => {
      counts[r.emoji] = (counts[r.emoji] || 0) + 1;
    });

    Object.entries(counts).forEach(([emoji, count]) => {
      const chip = document.createElement('span');
      chip.className = 'reaction-chip';
      chip.textContent = count > 1 ? `${emoji} ${count}` : emoji;
      div.appendChild(chip);
    });

    return div;
  }

  // ─── Agregar reacción a un mensaje ────────────────────────────
  function _addReaction(msgId, emoji) {
    StorageModule.addReaction(activeContactId, msgId, emoji);
    _renderMessages(activeContactId);
    _scrollToBottom(false);
  }

  // ─── Menú contextual ──────────────────────────────────────────
  function _showContextMenu(x, y, msg, isOwn) {
    contextMenuTarget = msg;
    document.getElementById('ctxDelete').style.display = isOwn ? 'flex' : 'none';

    contextMenu.style.display = 'block';
    contextMenu.style.left = `${Math.min(x, window.innerWidth - 160)}px`;
    contextMenu.style.top  = `${Math.min(y, window.innerHeight - 100)}px`;
  }

  function _hideContextMenu() {
    contextMenu.style.display = 'none';
    contextMenuTarget = null;
  }

  // ─── Enviar mensaje ───────────────────────────────────────────
  function sendMessage() {
    const text = msgInput.value.trim();
    if (!text || !activeContactId) return;

    const user = AuthModule.getUser();
    const msg = {
      id: Date.now().toString(),
      senderId: user.id,
      text,
      timestamp: Date.now(),
      status: 'sent',
      reactions: [],
      deleted: false
    };

    StorageModule.addMessage(activeContactId, msg);

    // Limpiar input
    msgInput.value = '';
    btnSend.disabled = true;
    msgInput.style.height = 'auto';

    // Renderizar el mensaje inmediatamente
    const dateStr = _getDateLabel(msg.timestamp);
    const messages = StorageModule.getMessages(activeContactId);

    // ¿Necesita separador de fecha?
    if (messages.length === 1 || _getDateLabel(messages[messages.length - 2]?.timestamp) !== dateStr) {
      chatMessages.appendChild(_createDateSeparator(dateStr));
    }

    const msgEl = _createMessageEl(msg);
    chatMessages.appendChild(msgEl);
    _scrollToBottom();

    // Simular progresión de estado: enviado → entregado → leído
    _simulateStatus(msg.id, activeContactId);

    // Notificar al sidebar
    if (window.SidebarModule) SidebarModule.refresh();

    // Respuesta automática del bot
    _triggerBotResponse(activeContactId, text);
  }

  // ─── Simular estados del mensaje (enviado→entregado→leído) ─────
  function _simulateStatus(msgId, contactId) {
    setTimeout(() => {
      StorageModule.updateMessageStatus(contactId, msgId, 'delivered');
      _updateStatusIcon(msgId, 'delivered');
    }, 1200);

    setTimeout(() => {
      StorageModule.updateMessageStatus(contactId, msgId, 'read');
      _updateStatusIcon(msgId, 'read');
    }, 3000);
  }

  function _updateStatusIcon(msgId, status) {
    const wrapper = chatMessages.querySelector(`[data-msg-id="${msgId}"]`);
    if (!wrapper) return;
    const statusEl = wrapper.querySelector('[data-status-el]');
    if (!statusEl) return;
    statusEl.className = `msg-status msg-status--${status}`;
    statusEl.textContent = _statusIcon(status);
  }

  function _statusIcon(status) {
    const icons = { sent: '✓', delivered: '✓✓', read: '✓✓' };
    return icons[status] || '✓';
  }

  // ─── Respuesta del bot con indicador "escribiendo..." ─────────
  function _triggerBotResponse(contactId, userText) {
    if (!window.BotModule) return;
    const contact = ContactsData.find(c => c.id === contactId);
    if (!contact) return;

    const delay = 1200 + Math.random() * 1000;

    // Mostrar "escribiendo..."
    _showTyping(true);

    setTimeout(() => {
      _showTyping(false);

      if (activeContactId !== contactId) return;

      const replyText = BotModule.getAutoReply(contact, userText);
      const reply = {
        id: Date.now().toString(),
        senderId: contactId,
        text: replyText,
        timestamp: Date.now(),
        status: 'read',
        reactions: [],
        deleted: false
      };

      StorageModule.addMessage(contactId, reply);

      const msgEl = _createMessageEl(reply);
      chatMessages.appendChild(msgEl);
      _scrollToBottom();

      // Actualizar badge en sidebar
      if (window.SidebarModule) SidebarModule.refresh();

    }, delay);
  }

  // ─── Mostrar/ocultar indicador escribiendo ────────────────────
  function _showTyping(visible) {
    typingIndicator.classList.toggle('visible', visible);
    headerTyping.classList.toggle('visible', visible);
    if (visible) headerStatus.style.display = 'none';
    else         headerStatus.style.display = '';
    if (visible) _scrollToBottom();
  }

  // ─── Scroll al último mensaje ─────────────────────────────────
  function _scrollToBottom(smooth = true) {
    setTimeout(() => {
      chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }, 50);
  }

  // ─── Formatear hora de mensaje ────────────────────────────────
  function _formatTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  }

  // ─── Etiqueta de fecha para separador ────────────────────────
  function _getDateLabel(ts) {
    if (!ts) return '';
    const d   = new Date(ts);
    const now = new Date();

    const isSameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth()    === b.getMonth()    &&
      a.getDate()     === b.getDate();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(d, now))       return 'Hoy';
    if (isSameDay(d, yesterday)) return 'Ayer';

    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  // ─── Event listeners ──────────────────────────────────────────
  function _initListeners() {
    // Enviar con botón
    btnSend.addEventListener('click', sendMessage);

    // Enviar con Enter (Shift+Enter = salto de línea)
    msgInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Habilitar/deshabilitar botón de enviar
    msgInput.addEventListener('input', () => {
      const hasText = msgInput.value.trim().length > 0;
      btnSend.disabled = !hasText;

      // Auto-resize del textarea
      msgInput.style.height = 'auto';
      msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + 'px';
    });

    // Volver al sidebar (mobile)
    btnBack.addEventListener('click', closeChat);

    // Cerrar menú contextual al hacer click afuera
    document.addEventListener('click', e => {
      if (!contextMenu.contains(e.target)) _hideContextMenu();
    });

    // Acción: reaccionar (desde menú contextual)
    document.getElementById('ctxReact').addEventListener('click', () => {
      if (!contextMenuTarget) return;
      _addReaction(contextMenuTarget.id, '❤️');
      _hideContextMenu();
    });

    // Acción: eliminar mensaje
    document.getElementById('ctxDelete').addEventListener('click', () => {
      if (!contextMenuTarget) return;
      StorageModule.deleteMessage(activeContactId, contextMenuTarget.id);
      _renderMessages(activeContactId);
      _hideContextMenu();
    });

    // Sincronización entre pestañas
    window.addEventListener('storage', e => {
      if (!activeContactId) return;
      if (e.key && e.key.includes(activeContactId)) {
        _renderMessages(activeContactId);
        _scrollToBottom(false);
      }
    });
  }

  // ─── Init ─────────────────────────────────────────────────────
  function init() {
    _initListeners();
  }

  // ─── API pública ──────────────────────────────────────────────
  return { init, openChat, closeChat };

})();

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => ChatModule.init());