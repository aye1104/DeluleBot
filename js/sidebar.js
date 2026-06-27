import Storage from './storage.js';

// Renderiza la lista de contactos en el sidebar
function renderSidebar(contactos) {
    const lista = document.getElementById('lista-chats');
    lista.innerHTML = '';

    contactos.forEach(contacto => {
        const noLeidos = Storage.get(`noLeidos_${contacto.id}`) || 0;
        const ultimoMensaje = Storage.get(`ultimoMensaje_${contacto.id}`) || 'Iniciá la conversación';
        const ultimaHora = Storage.get(`ultimaHora_${contacto.id}`) || '';

        const card = document.createElement('div');
        card.classList.add('chat-card');
        card.dataset.id = contacto.id;

        card.innerHTML = `
            <img src="${contacto.avatar}" alt="${contacto.nombre}" class="avatar">
            <div class="info">
                <span class="nombre">${contacto.nombre}</span>
                <span class="ultimo-mensaje">${ultimoMensaje}</span>
            </div>
            <div class="meta">
                <span class="hora">${ultimaHora}</span>
                ${noLeidos > 0 ? `<span class="badge">${noLeidos}</span>` : ''}
            </div>
        `;

        // Marcar contacto activo al hacer click
        card.addEventListener('click', () => {
            document.querySelectorAll('.chat-card').forEach(c => c.classList.remove('activo'));
            card.classList.add('activo');

            // Limpiar badge de no leídos
            Storage.set(`noLeidos_${contacto.id}`, 0);
            card.querySelector('.badge')?.remove();

            // Avisar al resto de la app qué contacto se abrió
            window.dispatchEvent(new CustomEvent('contactoAbierto', {
                detail: { contacto }
            }));
        });

        lista.appendChild(card);
    });
}

// Ordenar por mensaje más reciente arriba
function ordenarPorReciente(contactos) {
    return contactos.sort((a, b) => {
    const horaA = Storage.get(`ultimaHora_${a.id}`) || '';
    const horaB = Storage.get(`ultimaHora_${b.id}`) || '';
    return horaB.localeCompare(horaA);
    });
}

// Búsqueda por nombre en tiempo real
function iniciarBusqueda(contactos) {
    const input = document.getElementById('buscador');
    input.addEventListener('input', () => {
        const filtro = input.value.toLowerCase();
        const filtrados = contactos.filter(c =>
            c.nombre.toLowerCase().includes(filtro)
        );
        renderSidebar(filtrados);
    });
}

// Actualizar sidebar cuando llega un mensaje nuevo
window.addEventListener('storageChange', () => {
    import('./data/contacts.js').then(({ personajes }) => {
    renderSidebar(ordenarPorReciente(personajes));
    });
});

// Inicializar
export function iniciarSidebar(contactos) {
    renderSidebar(ordenarPorReciente(contactos));
    iniciarBusqueda(contactos);
}