const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close]');
const overlays = document.querySelectorAll('[data-modal]');

const openModal = (modal) => {
    if (modal == null) return;
    modal.classList.add('show');
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('show');
    }, 100);
};

const closeModal = (modal) => {
    if (modal == null) return;
    modal.querySelector('.modal-content').classList.remove('show');
    setTimeout(() => {
        modal.classList.remove('show');
    }, 300);
};

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(`[data-modal="${button.dataset.modalTarget}"]`);
        openModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('[data-modal]');
        closeModal(modal);
    });
});

overlays.forEach(overlay => {
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeModal(overlay);
        }
    });
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        overlays.forEach(modal => {
            closeModal(modal);
        });
    }
});