// ─── Configuración de usuario hardcodeado ─────────────────────────────────────
const HARDCODED_USER = {
    username: "admin",
    password: "1234",
};

// ─── Claves de localStorage ────────────────────────────────────────────────────
const STORAGE_KEYS = {
    SESSION: "chat_session",
    PROFILE: "chat_profile",
};

// ─── Perfil por defecto ────────────────────────────────────────────────────────
const DEFAULT_PROFILE = {
    name: "Administrador",
    description: "Usuario del chat de personajes",
    photo: null,           // Base64 string o null
    status: "disponible",  // "disponible" | "ocupado" | "no_molestar"
};

// ─── Funciones de sesión ──────────────────────────────────────────────────────

/**
 * Intenta iniciar sesión con las credenciales dadas.
 * @param {string} username
 * @param {string} password
 * @returns {{ success: boolean, error?: string }}
 */
export function login(username, password) {
    if (!username || !password) {
        return { success: false, error: "Completá usuario y contraseña." };
    }

    if (
        username.trim() !== HARDCODED_USER.username ||
        password !== HARDCODED_USER.password
    ) {
        return { success: false, error: "Usuario o contraseña incorrectos." };
    }

    const session = {
        username: username.trim(),
        loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    return { success: true };
}


export function logout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
}

/**
 * Obtiene la sesión actual del usuario.
 * @returns {{ username: string, loggedInAt: string } | null }
 */
export function getSession() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/**
 * Indica si hay un usuario con sesión iniciada.
 * @returns {boolean}
 */
export function isLoggedIn() {
    return getSession() !== null;
}

/**
 * Obtiene el perfil del usuario actual.
 * @returns {{ name: string, description: string, photo: string | null, status: string }}
 */
export function getProfile() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
        if (!raw) return { ...DEFAULT_PROFILE };
        return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
    } catch {
        return { ...DEFAULT_PROFILE };
    }
}

/**
 * Actualiza el perfil del usuario.
 * @param {{ name?: string, description?: string, photo?: string | null, status?: string }} changes
 * @returns {{ success: boolean, error?: string, profile?: object }}
 */
export function saveProfile(changes) {
    const VALID_STATUSES = ["disponible", "ocupado", "no_molestar"];

    if (changes.status && !VALID_STATUSES.includes(changes.status)) {
        return {
            success: false,
            error: `Estado inválido. Opciones: ${VALID_STATUSES.join(", ")}`,
        };
    }

    if (changes.name !== undefined && changes.name.trim() === "") {
        return { success: false, error: "El nombre no puede estar vacío." };
    }

    const current = getProfile();
    const updated = {
        ...current,
        ...changes,
        ...(changes.name ? { name: changes.name.trim() } : {}),
    };

    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    return { success: true, profile: updated };
}


export function saveProfilePhoto(file) {
    return new Promise((resolve) => {
        if (!file) {
            resolve({ success: false, error: "No se recibió ningún archivo." });
            return;
        }

        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!ALLOWED_TYPES.includes(file.type)) {
            resolve({ success: false, error: "Formato no permitido. Usá JPG, PNG, WebP o GIF." });
            return;
        }

        const MAX_SIZE_MB = 2;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            resolve({ success: false, error: `La imagen no puede superar ${MAX_SIZE_MB}MB.` });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = saveProfile({ photo: e.target.result });
            resolve(result);
        };
        reader.onerror = () => {
            resolve({ success: false, error: "No se pudo leer el archivo." });
        };
        reader.readAsDataURL(file);
    });
}


function removeProfilePhoto() {
    return saveProfile({ photo: null });
}

