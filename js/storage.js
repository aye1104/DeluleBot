// storage.js — Estado global y sincronización entre pestañas
const Storage = {
    get(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
    },

    set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispara evento personalizado para que el resto de la app reaccione
    window.dispatchEvent(new CustomEvent("storageChange", {
    detail: { key, value }
    }));
    },

    remove(key) {
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent("storageChange", {
    detail: { key, value: null }
    }));
    }
};

// Escucha cambios desde otras pestañas
window.addEventListener("storage", (e) => {
    window.dispatchEvent(new CustomEvent("storageChange", {
    detail: { key: e.key, value: JSON.parse(e.newValue) }
    }));
});

export default Storage;