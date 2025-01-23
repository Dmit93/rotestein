import { openModal } from './modal.js';

class TabManager {
    constructor(containerSelector) {
        this.containers = document.querySelectorAll(containerSelector);
        this.init();
    }

    init() {
        this.containers.forEach(container => {
            const tabs = container.querySelectorAll('.tab');
            const tabContents = container.querySelectorAll('.tab-content');
            const activeEvent = container.hasAttribute('data-event');

            if (tabs.length === 0 || tabContents.length === 0) return;

            // Устанавливаем первую вкладку активной
            this.activateTab(tabs[0], tabContents, container, activeEvent);

            tabs.forEach(tab => {
                tab.addEventListener('click', (event) => this.onTabClick(event, tabs, tabContents, container, activeEvent));
            });
        });
    }

    activateTab(tabElement, tabContents, container, activeEvent) {
        const targetTab = tabElement.getAttribute('data-tab');
        const allTabs = tabElement.parentElement.querySelectorAll('.tab');
        const allContents = tabContents;

        allTabs.forEach(t => t.classList.remove('active'));
        allContents.forEach(content => {
            content.classList.remove('active');
            content.style.opacity = 0;
        });


        tabElement.classList.add('active');
        const targetContent = container.querySelector(`.tab-content[data-tab="${targetTab}"]`);

        if (targetContent) {
            targetContent.classList.add('active');

            setTimeout(() => {
                targetContent.style.opacity = 1;
            }, 10);

            // Генерируем событие 
            if (activeEvent) {
                const event = new CustomEvent('tabActivated', {
                    detail: {
                        tab: tabElement,
                        content: targetContent
                    }
                });
                container.dispatchEvent(event);
            }
        }
    }

    onTabClick(event, tabs, tabContents, container, activeEvent) {
        this.activateTab(event.currentTarget, tabContents, container, activeEvent);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    new TabManager('.tabs-block');

    if (document.querySelector('.section-info-tabs .tabs-block')) {
        document.querySelector('.section-info-tabs .tabs-block').addEventListener('tabActivated', (e) => {
            if (window.matchMedia('(max-width:992px)').matches) {
                const htmlModal = `
                <div class="modal-content__title">
                    ${e.detail.tab.querySelector('span').innerHTML}
                </div>
                <div class="modal-content__text">
                    ${e.detail.content.innerHTML}
                </div>
            `;
                const modal = document.querySelector(`[data-modal="#tab-dinamic"]`);
                modal.querySelector('.modal-content__body').innerHTML = htmlModal;
                openModal(modal);
            }

        });
    }

});
