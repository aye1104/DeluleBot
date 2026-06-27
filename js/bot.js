// bot.js - lógica de respuestas automáticas del chat bot

import contacts from "./data/contacts.js";
import { getAutoReply } from "./getAutoReply.js";

const STORAGE_KEY = "chat_history";
const MIN_DELAY = 1000;
const MAX_DELAY = 2500;


function typingDelay(text) {
    const base = Math.min(text.length * 30, MAX_DELAY);
    return Math.max(base, MIN_DELAY);
}


export function loadHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}


function saveHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
        console.warn("No se pudo guardar el historial:", e);
    }
}


export function getChat(contactId) {
    const history = loadHistory();
    return history[String(contactId)] ?? [];
}


export function addMessage(contactId, from, text) {
    const history = loadHistory();
    const key = String(contactId);

    if (!history[key]) history[key] = [];

    const message = {
        id: `${key}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        from,
        text,
        timestamp: new Date().toISOString(),
    };

    history[key].push(message);
    saveHistory(history);
    return message;
}

export function simulateTyping(responseText, onStart, onDone) {
    const delay = typingDelay(responseText);
    if (typeof onStart === "function") onStart();
    return new Promise((resolve) => {
        setTimeout(() => {
            if (typeof onDone === "function") onDone(responseText);
            resolve();
        }, delay);
    });
}

export async function botReply(contactId, userMessage, callbacks) {
    const cbs = callbacks || {};
    const { onUserMessage, onTypingStart, onBotMessage, onError } = cbs;
    const safeOnUserMessage = typeof onUserMessage === "function" ? onUserMessage : () => {};
    const safeOnTypingStart = typeof onTypingStart === "function" ? onTypingStart : () => {};
    const safeOnBotMessage = typeof onBotMessage === "function" ? onBotMessage : () => {};
    const safeOnError = typeof onError === "function" ? onError : () => {};

    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
        safeOnError(`Contacto ${contactId} no encontrado`);
        return;
    }

    const trimmed = userMessage.trim();
    if (!trimmed) return;

    try {
        const userMsg = addMessage(contactId, "user", trimmed);
        safeOnUserMessage(userMsg);

        const responseText = getAutoReply(contactId, trimmed);

        await simulateTyping(responseText, safeOnTypingStart, (text) => {
            const botMsg = addMessage(contactId, "bot", text);
            safeOnBotMessage(botMsg);
        });
    } catch (err) {
        safeOnError(`Error en botReply: ${err.message}`);
    }
}

export function clearChat(contactId) {
    const history = loadHistory();
    delete history[String(contactId)];
    saveHistory(history);
}

export function clearAllChats() {
    localStorage.removeItem(STORAGE_KEY);
}

export function getLastMessage(contactId) {
    const chat = getChat(contactId);
    if (!chat.length) return null;
    const last = chat[chat.length - 1];
    return { text: last.text, timestamp: last.timestamp };
}
