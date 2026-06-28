// ============================================
// UI EXTRAS - feature/04-ui-extras
// Reacciones, eliminar mensajes, timestamps
// ============================================

// --- TIMESTAMPS ---
function formatTimestamp(date) {
  const now = new Date();
  const msgDate = new Date(date);
  const diffDays = Math.floor((now - msgDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Ayer ' + msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return msgDate.toLocaleDateString();
  }
}

// --- ELIMINAR MENSAJE ---
function deleteMessage(messageId, messages) {
  return messages.map(msg =>
    msg.id === messageId ? { ...msg, text: 'Mensaje eliminado', deleted: true } : msg
  );
}

// --- REACCIONES ---
const EMOJIS = ['❤️', '😂', '😮', '😢', '👍'];

function addReaction(messageId, emoji, messages) {
  return messages.map(msg =>
    msg.id === messageId ? { ...msg, reaction: emoji } : msg
  );
}

function renderReactionPicker(messageId) {
  const picker = document.createElement('div');
  picker.className = 'reaction-picker';
  EMOJIS.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.onclick = () => {
      document.dispatchEvent(new CustomEvent('reaccion', {
        detail: { messageId, emoji }
      }));
      picker.remove();
    };
    picker.appendChild(btn);
  });
  return picker;
}

// --- MARCAR COMO LEÍDOS ---
function markMessagesAsRead(messages) {
  return messages.map(msg => ({ ...msg, read: true }));
}
// --- INDICADOR ESCRIBIENDO ---
function showTypingIndicator(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.id = 'typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}
